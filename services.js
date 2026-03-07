// src/firebase/services.js
import {
  doc, getDoc, setDoc, updateDoc, collection,
  getDocs, addDoc, deleteDoc, query, where,
  orderBy, Timestamp, serverTimestamp, arrayUnion, arrayRemove
} from 'firebase/firestore';
import { db } from './config';

const ADMIN_EMAIL = 'william.lautrec92enc.off@gmail.com';

// ── USER ──────────────────────────────────────────────────
export const getUser = async (uid) => {
  const snap = await getDoc(doc(db, 'users', uid));
  return snap.exists() ? snap.data() : null;
};

export const createUser = async (uid, email, pseudo) => {
  const isAdmin = email === ADMIN_EMAIL;
  await setDoc(doc(db, 'users', uid), {
    uid, email, pseudo,
    role: isAdmin ? 'admin' : 'user',
    createdAt: serverTimestamp()
  });
  if (isAdmin) {
    await setDoc(doc(db, 'admins', email), { email, uid, addedAt: serverTimestamp() });
  }
};

export const updateUserPseudo = async (uid, pseudo) => {
  await updateDoc(doc(db, 'users', uid), { pseudo });
};

export const isPseudoTaken = async (pseudo) => {
  const q = query(collection(db, 'users'), where('pseudo', '==', pseudo));
  const snap = await getDocs(q);
  return !snap.empty;
};

// ── CHARACTERS ────────────────────────────────────────────
export const getCharacters = async (uid) => {
  const snap = await getDocs(collection(db, 'users', uid, 'characters'));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

export const createCharacter = async (uid, firstNameRP, lastNameRP) => {
  const ref = await addDoc(collection(db, 'users', uid, 'characters'), {
    firstNameRP, lastNameRP,
    loyaltyCard: { active: false, points: 0, level: 'bronze', activatedAt: null, activatedBy: null },
    contracts: [],
    createdAt: serverTimestamp()
  });
  return ref.id;
};

export const deleteCharacter = async (uid, characterId) => {
  await deleteDoc(doc(db, 'users', uid, 'characters', characterId));
};

// ── LOYALTY ───────────────────────────────────────────────
export const getLoyaltyLevel = (points) => {
  if (points >= 10000) return 'platinum';
  if (points >= 5000) return 'gold';
  if (points >= 1000) return 'silver';
  return 'bronze';
};

export const activateLoyaltyCard = async (uid, characterId, employeeUid) => {
  const ref = doc(db, 'users', uid, 'characters', characterId);
  await updateDoc(ref, {
    'loyaltyCard.active': true,
    'loyaltyCard.activatedAt': serverTimestamp(),
    'loyaltyCard.activatedBy': employeeUid
  });
};

export const addLoyaltyPoints = async (uid, characterId, points) => {
  const ref = doc(db, 'users', uid, 'characters', characterId);
  const snap = await getDoc(ref);
  if (!snap.exists()) throw new Error('Character not found');
  const current = snap.data().loyaltyCard.points || 0;
  const newPoints = Math.max(0, current + points);
  await updateDoc(ref, {
    'loyaltyCard.points': newPoints,
    'loyaltyCard.level': getLoyaltyLevel(newPoints)
  });
};

// ── CONTRACTS ─────────────────────────────────────────────
export const getContracts = async () => {
  const snap = await getDocs(query(collection(db, 'contracts'), where('active', '==', true)));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

export const activateContract = async (uid, characterId, contractId, contractName, durationMonths, employeeUid) => {
  const ref = doc(db, 'users', uid, 'characters', characterId);
  const now = Timestamp.now();
  const expiresAt = Timestamp.fromMillis(now.toMillis() + durationMonths * 30 * 24 * 60 * 60 * 1000);
  const contractInstance = {
    id: `contract_${Date.now()}`,
    contractId, contractName,
    status: 'active',
    activatedAt: now,
    expiresAt,
    durationMonths,
    activatedBy: employeeUid
  };
  await updateDoc(ref, { contracts: arrayUnion(contractInstance) });
  // Log order
  await addDoc(collection(db, 'orders'), {
    userUid: uid, characterId,
    type: 'contract', itemId: contractId, itemName: contractName,
    date: serverTimestamp(), status: 'completed'
  });
};

export const checkExpiredContracts = async (uid, characterId) => {
  const ref = doc(db, 'users', uid, 'characters', characterId);
  const snap = await getDoc(ref);
  if (!snap.exists()) return;
  const data = snap.data();
  const now = Timestamp.now();
  const updated = (data.contracts || []).map(c => {
    if (c.status === 'active' && c.expiresAt && c.expiresAt.toMillis() < now.toMillis()) {
      return { ...c, status: 'expired' };
    }
    return c;
  });
  await updateDoc(ref, { contracts: updated });
};

// ── SHOPS ─────────────────────────────────────────────────
export const getShops = async () => {
  const snap = await getDocs(collection(db, 'shops'));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

export const addShop = async (name, description, location) => {
  await addDoc(collection(db, 'shops'), { name, description, location, active: true, createdAt: serverTimestamp() });
};

export const updateShop = async (id, data) => {
  await updateDoc(doc(db, 'shops', id), data);
};

export const deleteShop = async (id) => {
  await deleteDoc(doc(db, 'shops', id));
};

// ── PRODUCTS ──────────────────────────────────────────────
export const getProducts = async () => {
  const snap = await getDocs(collection(db, 'products'));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

// ── ORDERS ────────────────────────────────────────────────
export const getUserOrders = async (uid) => {
  const q = query(collection(db, 'orders'), where('userUid', '==', uid), orderBy('date', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

// ── EMPLOYEES ─────────────────────────────────────────────
export const getEmployees = async () => {
  const snap = await getDocs(collection(db, 'employees'));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

export const addEmployee = async (uid, email, pseudo, adminUid) => {
  await setDoc(doc(db, 'employees', uid), { uid, email, pseudo, addedAt: serverTimestamp(), addedBy: adminUid });
  await updateDoc(doc(db, 'users', uid), { role: 'employee' });
};

export const removeEmployee = async (uid) => {
  await deleteDoc(doc(db, 'employees', uid));
  await updateDoc(doc(db, 'users', uid), { role: 'user' });
};

// ── ADMIN ─────────────────────────────────────────────────
export const getAllUsers = async () => {
  const snap = await getDocs(collection(db, 'users'));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

export const searchCharacterByName = async (firstName, lastName) => {
  const usersSnap = await getDocs(collection(db, 'users'));
  const results = [];
  for (const userDoc of usersSnap.docs) {
    const charsSnap = await getDocs(collection(db, 'users', userDoc.id, 'characters'));
    for (const charDoc of charsSnap.docs) {
      const c = charDoc.data();
      if (
        c.firstNameRP?.toLowerCase().includes(firstName.toLowerCase()) ||
        c.lastNameRP?.toLowerCase().includes(lastName.toLowerCase())
      ) {
        results.push({ ...c, id: charDoc.id, userUid: userDoc.id, userPseudo: userDoc.data().pseudo });
      }
    }
  }
  return results;
};

export { ADMIN_EMAIL };
