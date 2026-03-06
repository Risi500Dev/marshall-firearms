// ═══════════════════════════════════════════════════
//  MARSHALL GROUP — Shared Data & Session Library
//  Base de données : Firebase Firestore
// ═══════════════════════════════════════════════════

const MG_GOOGLE_CLIENT_ID = '516324648555-abujqrn3783dl0fb52nctu8e6ss168ao.apps.googleusercontent.com';
const MG_ADMIN_EMAIL      = 'william.lautrec92enc.off@gmail.com';

function MG_isAdmin(email) { return email === MG_ADMIN_EMAIL; }

// ═══════════════════════════════════════════════════
//  CONFIG FIREBASE
//  1. console.firebase.google.com → Créer un projet
//  2. Firestore Database → Créer en mode Production
//  3. Paramètres projet (⚙) → Ajouter une app Web
//  4. Copier firebaseConfig ci-dessous
//  5. Règles Firestore → coller les règles du README
// ═══════════════════════════════════════════════════
const MG_FIREBASE_CONFIG = {
  apiKey:            'AIzaSyC_0LKu4uXJW8LJNzoADFmSKKZkX5RzOxE',
  authDomain:        'marshallgroup-8cca5.firebaseapp.com',
  projectId:         'marshallgroup-8cca5',
  storageBucket:     'marshallgroup-8cca5.firebasestorage.app',
  messagingSenderId: '640185279700',
  appId:             '1:640185279700:web:0a3920e6ddd801ca498741',
};

// ── TIERS
const MG_TIERS = [
  { name:'Bronze',    min:0,     max:1000,   dot:'#cd7f32', color:'#cd7f32',
    perks:['1 boîte de munitions offerte à chaque achat'] },
  { name:'Argent',    min:1000,  max:3500,   dot:'#a8a9ad', color:'#a8a9ad',
    perks:['3 boîtes de munitions offertes à chaque achat','Avantages Bronze inclus'] },
  { name:'Or',        min:3500,  max:10000,  dot:'#c8a84b', color:'#c8a84b',
    perks:['Achat gilet léger = second offert','Avantages Bronze & Argent inclus'] },
  { name:'Platinium', min:10000, max:999999, dot:'#a0b2c8', color:'#a0b2c8',
    perks:['1 arme de poing offerte par mois','Tous les avantages précédents inclus'] },
];

// ── CONTRATS
const MG_CONTRACTS = {
  particulier: {
    label:'Contrat Particulier', price:5000, period:'par mois', discount:0,
    perks:['Marge divisée par 2','Munitions offertes à chaque commande','Commandes prioritaires','Accès batteuses : Minimi, RPK-12 & MG36']
  },
  entreprise: {
    label:'Contrat Entreprise', price:15000, period:'par mois', discount:10,
    perks:['Marge divisée par 2','Munitions offertes à chaque commande','Commandes prioritaires','Gestionnaire de compte dédié','Approvisionnement hebdomadaire garanti']
  }
};

// ── CATALOGUE
const MG_CATALOGUE = [
  // Pistolets
  { name:'MK23',           cat:'pistolet',  mode:'Semi',     cal:'11.43mm',    mag:12,  price:4950,  marge:0, spec:false },
  { name:'M9',             cat:'pistolet',  mode:'Semi',     cal:'9mm',        mag:15,  price:4950,  marge:0, spec:false },
  { name:'P320',           cat:'pistolet',  mode:'Semi',     cal:'9mm',        mag:17,  price:4950,  marge:0, spec:false },
  { name:'FNP-45',         cat:'pistolet',  mode:'Semi',     cal:'11.43mm',    mag:15,  price:4950,  marge:0, spec:false },
  { name:'Glock 19',       cat:'pistolet',  mode:'Semi',     cal:'9mm',        mag:15,  price:4950,  marge:0, spec:false },
  { name:'Five-seveN MK2', cat:'pistolet',  mode:'Semi',     cal:'5.7×28mm',   mag:20,  price:4950,  marge:0, spec:false },
  { name:'Glock 17',       cat:'pistolet',  mode:'Semi',     cal:'9mm',        mag:17,  price:4950,  marge:0, spec:false },
  { name:'CZ 75',          cat:'pistolet',  mode:'Semi',     cal:'9mm',        mag:16,  price:4950,  marge:0, spec:false },
  { name:'Colt M45',       cat:'pistolet',  mode:'Semi',     cal:'11.43mm',    mag:8,   price:4950,  marge:0, spec:false },
  { name:'P99',            cat:'pistolet',  mode:'Semi',     cal:'9mm',        mag:16,  price:3850,  marge:0, spec:false },
  { name:'USP',            cat:'pistolet',  mode:'Semi',     cal:'9mm',        mag:15,  price:4950,  marge:0, spec:true  },
  { name:'SW659',          cat:'pistolet',  mode:'Semi',     cal:'9mm',        mag:14,  price:4950,  marge:0, spec:true  },
  { name:'KNW',            cat:'pistolet',  mode:'Auto',     cal:'9mm',        mag:20,  price:4950,  marge:0, spec:true  },
  // Revolvers
  { name:'MR 96',          cat:'revolver',  mode:'Revolver', cal:'.357 Mag',   mag:6,   price:4950,  marge:0, spec:false },
  { name:'MR 73',          cat:'revolver',  mode:'Revolver', cal:'.357 Mag',   mag:6,   price:3850,  marge:0, spec:false },
  { name:'Desert Eagle',   cat:'revolver',  mode:'Semi',     cal:'.50 AE',     mag:7,   price:4950,  marge:0, spec:true  },
  { name:'Thanez Cobra',   cat:'revolver',  mode:'Semi',     cal:'.357 Magnum',mag:'6',  price:4500,  marge:0, spec:true  },
  // SMG
  { name:'MP5',            cat:'smg',       mode:'Auto',     cal:'9mm',        mag:30,  price:13200, marge:0, spec:false },
  { name:'UMP-45',         cat:'smg',       mode:'Auto',     cal:'11.43mm',    mag:25,  price:13200, marge:0, spec:false },
  { name:'MP7',            cat:'smg',       mode:'Auto',     cal:'4.6×30mm',   mag:40,  price:12000,  marge:0, spec:false },
  { name:'Kriss Vector',   cat:'smg',       mode:'Auto',     cal:'11.43mm',    mag:25,  price:13200, marge:0, spec:true  },
  { name:'MP9',            cat:'smg',       mode:'Auto',     cal:'9mm',        mag:32,  price:9900,  marge:0, spec:true  },
  { name:'Uzi',            cat:'smg',       mode:'Auto',     cal:'9mm',        mag:32,  price:8800,  marge:0, spec:true  },
  // Assaut
  { name:'RFB',            cat:'assaut',    mode:'Semi',     cal:'7.62×51mm',  mag:20,  price:49500, marge:0, spec:false },
  { name:'Scar-H',         cat:'assaut',    mode:'Auto',     cal:'7.62×51mm',  mag:20,  price:24200, marge:0, spec:false },
  { name:'Scar-L',         cat:'assaut',    mode:'Auto',     cal:'5.56×45mm',  mag:30,  price:16500, marge:0, spec:false },
  { name:'MK 18',          cat:'assaut',    mode:'Auto',     cal:'5.56×45mm',  mag:30,  price:16500, marge:0, spec:false },
  { name:'MK 18 Mod',      cat:'assaut',    mode:'Auto',     cal:'5.56×45mm',  mag:30,  price:16500, marge:0, spec:false },
  { name:'M4A1',           cat:'assaut',    mode:'Auto',     cal:'5.56×45mm',  mag:30,  price:16500, marge:0, spec:false },
  { name:'AR-15',          cat:'assaut',    mode:'Semi',     cal:'5.56×45mm',  mag:30,  price:16500, marge:0, spec:false },
  { name:'HK 416',         cat:'assaut',    mode:'Auto',     cal:'5.56×45mm',  mag:30,  price:16500, marge:0, spec:false },
  { name:'G36C',           cat:'assaut',    mode:'Auto',     cal:'5.56×45mm',  mag:30,  price:16500, marge:0, spec:false },
  { name:'CZ 805',         cat:'assaut',    mode:'Auto',     cal:'5.56×45mm',  mag:30,  price:16500, marge:0, spec:false },
  { name:'F90 MBR',        cat:'assaut',    mode:'Auto',     cal:'5.56×45mm',  mag:30,  price:16500, marge:0, spec:false },
  { name:'ACR',            cat:'assaut',    mode:'Auto',     cal:'5.56×45mm',  mag:30,  price:16500, marge:0, spec:false },
  { name:'SKS',            cat:'assaut',    mode:'Semi',     cal:'7.62×39mm',  mag:10,  price:49500, marge:0, spec:true  },
  { name:'Minimi',         cat:'assaut',    mode:'Auto',     cal:'5.56×45mm',  mag:200, price:33000, marge:0, spec:true  },
  { name:'RPK-12',         cat:'assaut',    mode:'Auto',     cal:'7.62×39mm',  mag:75,  price:33000, marge:0, spec:true  },
  { name:'MG36',           cat:'assaut',    mode:'Auto',     cal:'5.56×45mm',  mag:100, price:33000, marge:0, spec:true  },
  { name:'FN FAL',         cat:'assaut',    mode:'Auto',     cal:'7.62×51mm',  mag:20,  price:17600, marge:0, spec:true  },
  { name:'Abakan',         cat:'assaut',    mode:'Auto',     cal:'5.45×39mm',  mag:30,  price:16500, marge:0, spec:true  },
  { name:'Galil',          cat:'assaut',    mode:'Auto',     cal:'5.56×45mm',  mag:35,  price:16500, marge:0, spec:true  },
  { name:'AK-400',         cat:'assaut',    mode:'Auto',     cal:'5.45×39mm',  mag:30,  price:16500, marge:0, spec:true  },
  { name:'AK-103',         cat:'assaut',    mode:'Auto',     cal:'7.62×39mm',  mag:30,  price:16500, marge:0, spec:true  },
  // Précision
  { name:'Warface',        cat:'precision', mode:'Semi',     cal:'7.62×51mm',  mag:10,  price:52500, marge:0,  spec:false },
  { name:'M24',            cat:'precision', mode:'Semi',     cal:'7.62×51mm',  mag:10,  price:52500, marge:0,  spec:false },
  { name:'M40 A1',         cat:'precision', mode:'Semi',     cal:'7.62×51mm',  mag:5,   price:52500, marge:0,  spec:false },
  { name:'M98',            cat:'precision', mode:'Semi',     cal:'.338 Lapua', mag:5,   price:52500, marge:0,  spec:true  },
  { name:'M82',            cat:'precision', mode:'Semi',     cal:'.50 BMG',    mag:10,  price:52500, marge:0,  spec:true  },
  // Pompe
  { name:'M870',           cat:'pompe',     mode:'Pompe',    cal:'12 Gauge',   mag:7,   price:13200, marge:0, spec:false },
  { name:'Nova',           cat:'pompe',     mode:'Pompe',    cal:'12 Gauge',   mag:8,   price:13200, marge:0, spec:false },
  { name:'M590',           cat:'pompe',     mode:'Pompe',    cal:'12 Gauge',   mag:9,   price:13200, marge:0, spec:false },
  { name:'M500',           cat:'pompe',     mode:'Pompe',    cal:'12 Gauge',   mag:5,   price:17500, marge:0, spec:true  },
  { name:'SPAS-12',        cat:'pompe',     mode:'Pompe',    cal:'12 Gauge',   mag:8,   price:13200, marge:0, spec:true  },
  { name:'Fort 500',       cat:'pompe',     mode:'Pompe',    cal:'12 Gauge',   mag:7,   price:13200, marge:0, spec:true  },
  { name:'Toz 194',        cat:'pompe',     mode:'Pompe',    cal:'12 Gauge',   mag:6,   price:13200, marge:0, spec:true  },
  // Munitions
  { name:'Munitions Pistolet',       cat:'munitions',  mode:'—', cal:'9mm / .45',    mag:null, price:100,  marge:0, spec:false },
  { name:'Munitions .357',           cat:'munitions',  mode:'—', cal:'.357 Mag',     mag:null, price:120,  marge:0, spec:false },
  { name:'Munitions SMG',            cat:'munitions',  mode:'—', cal:'9mm / .45',    mag:null, price:175,  marge:0, spec:false },
  { name:'Munitions Pompe',          cat:'munitions',  mode:'—', cal:'12 Gauge',     mag:null, price:135,  marge:0, spec:false },
  { name:'Munitions Assaut',         cat:'munitions',  mode:'—', cal:'5.56 / 7.62',  mag:null, price:240,  marge:0, spec:false },
  { name:'Munitions Sniper',         cat:'munitions',  mode:'—', cal:'7.62 / .338',  mag:null, price:335,  marge:0, spec:false },
  // Explosifs
  { name:'C4',          cat:'explosif', mode:'—', cal:'—', mag:null, price:22000, marge:0, spec:true  },
  { name:'Détonateur',  cat:'explosif', mode:'—', cal:'—', mag:null, price:22000, marge:0, spec:true  },
  // Équipement
  { name:'Gilet pare-balles léger',  cat:'equipement', mode:'—', cal:'—', mag:null, price:3300,  marge:10, spec:false },
  { name:'Gilet pare-balles lourd',  cat:'equipement', mode:'—', cal:'—', mag:null, price:6600,  marge:10, spec:false },
];

// ── HELPERS
function MG_getTier(points) {
  for (let i = MG_TIERS.length-1; i >= 0; i--) {
    if (points >= MG_TIERS[i].min) return MG_TIERS[i];
  }
  return MG_TIERS[0];
}
function MG_fmtPrice(n) { return Number(n).toLocaleString('fr-FR') + ' $'; }
function MG_today() {
  return new Date().toLocaleDateString('fr-FR', { day:'2-digit', month:'short', year:'numeric' });
}
function MG_invoiceId() { return 'MF-' + Date.now().toString(36).toUpperCase().slice(-6); }

// ═══════════════════════════════════════════════════
//  SESSION (localStorage)
// ═══════════════════════════════════════════════════
const MG_SESSION_KEY = 'mg_session_v1';

function MG_getSession() {
  try { const r = localStorage.getItem(MG_SESSION_KEY); return r ? JSON.parse(r) : null; } catch(e) { return null; }
}
function MG_setSession(data) {
  try { localStorage.setItem(MG_SESSION_KEY, JSON.stringify(data)); } catch(e) {}
}
function MG_clearSession() {
  try { localStorage.removeItem(MG_SESSION_KEY); } catch(e) {}
}

// ═══════════════════════════════════════════════════
//  FIREBASE — initialisation
// ═══════════════════════════════════════════════════
let _db = null;

async function MG_getDB() {
  if (_db) return _db;
  // Charger les SDK Firebase si nécessaire
  if (typeof firebase === 'undefined') {
    await _loadScript('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
    await _loadScript('https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore-compat.js');
  } else if (!firebase.firestore) {
    await _loadScript('https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore-compat.js');
  }
  if (!firebase.apps.length) firebase.initializeApp(MG_FIREBASE_CONFIG);
  _db = firebase.firestore();
  return _db;
}

function _loadScript(src) {
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = src; s.onload = resolve; s.onerror = reject;
    document.head.appendChild(s);
  });
}

// ── Vérifier si Firebase est configuré
function MG_isFirebaseConfigured() {
  return !!(MG_FIREBASE_CONFIG.apiKey && MG_FIREBASE_CONFIG.projectId);
}

// ── Fallback localStorage si Firebase non configuré
async function MG_loadLocalDB() {
  try {
    const raw = localStorage.getItem('mg_db_v1');
    if (!raw) return { users:{}, employees:[], invoices:[] };
    const db = JSON.parse(raw);
    if (!db.employees) db.employees = [];
    if (!db.invoices)  db.invoices  = [];
    return db;
  } catch(e) { return { users:{}, employees:[], invoices:[] }; }
}
async function MG_saveLocalDB(db) {
  try { localStorage.setItem('mg_db_v1', JSON.stringify(db)); } catch(e) {}
}

// ═══════════════════════════════════════════════════
//  USER CRUD
// ═══════════════════════════════════════════════════

async function MG_getUser(uid) {
  if (!MG_isFirebaseConfigured()) {
    const db = await MG_loadLocalDB();
    return db.users[uid] || null;
  }
  const db  = await MG_getDB();
  const doc = await db.collection('users').doc(uid).get();
  return doc.exists ? doc.data() : null;
}

async function MG_getAllUsers() {
  if (!MG_isFirebaseConfigured()) {
    const db = await MG_loadLocalDB();
    return Object.values(db.users);
  }
  const db   = await MG_getDB();
  const snap = await db.collection('users').get();
  return snap.docs.map(d => d.data());
}

async function MG_getUserByEmail(email) {
  const users = await MG_getAllUsers();
  return users.find(u => u.email === email) || null;
}

async function MG_getUserByPseudo(pseudo) {
  const users = await MG_getAllUsers();
  return users.find(u => u.pseudo && u.pseudo.toLowerCase() === pseudo.toLowerCase()) || null;
}

async function MG_upsertUser(uid, data) {
  if (!MG_isFirebaseConfigured()) {
    // Mode localStorage
    const db   = await MG_loadLocalDB();
    let role   = 'client';
    if (MG_isAdmin(data.email))                        role = 'admin';
    else if ((db.employees||[]).includes(data.email))  role = 'employee';
    else if (db.users[uid]?.role && db.users[uid].role !== 'client') role = db.users[uid].role;
    if (!db.users[uid]) {
      db.users[uid] = { uid, email:data.email, pseudo:'', role, personnages:[], createdAt:MG_today() };
    } else {
      db.users[uid].email = data.email;
      db.users[uid].role  = role;
    }
    await MG_saveLocalDB(db);
    return db.users[uid];
  }

  // Mode Firebase
  const db      = await MG_getDB();
  const ref     = db.collection('users').doc(uid);
  const doc     = await ref.get();
  const empSnap = await db.collection('meta').doc('config').get();
  const emps    = empSnap.exists ? (empSnap.data().employees || []) : [];

  let role = 'client';
  if (MG_isAdmin(data.email))       role = 'admin';
  else if (emps.includes(data.email)) role = 'employee';
  else if (doc.exists && doc.data().role && doc.data().role !== 'client') role = doc.data().role;

  if (!doc.exists) {
    const user = { uid, email:data.email, pseudo:'', role, personnages:[], createdAt:MG_today() };
    await ref.set(user);
    return user;
  } else {
    await ref.update({ email:data.email, role });
    return (await ref.get()).data();
  }
}

// ── Pseudo
async function MG_isPseudoTaken(pseudo) {
  const users = await MG_getAllUsers();
  return users.some(u => u.pseudo && u.pseudo.toLowerCase() === pseudo.toLowerCase());
}

async function MG_setPseudo(uid, pseudo) {
  if (!MG_isFirebaseConfigured()) {
    const db = await MG_loadLocalDB();
    if (!db.users[uid]) return null;
    db.users[uid].pseudo = pseudo.trim();
    await MG_saveLocalDB(db);
    return db.users[uid];
  }
  const db = await MG_getDB();
  await db.collection('users').doc(uid).update({ pseudo: pseudo.trim() });
  return MG_getUser(uid);
}

// ── Suppression compte
async function MG_deleteAccount(uid) {
  if (!MG_isFirebaseConfigured()) {
    const db = await MG_loadLocalDB();
    delete db.users[uid];
    await MG_saveLocalDB(db);
    return;
  }
  const db = await MG_getDB();
  await db.collection('users').doc(uid).delete();
}

// ── Personnages
async function MG_addPersonnage(uid, prenom, nom) {
  const p = {
    id: 'p_' + Date.now(), prenom, nom, points: 0,
    contract: null, contractSince: null, loyaltyActive: false,
    history: [], createdAt: MG_today()
  };
  if (!MG_isFirebaseConfigured()) {
    const db = await MG_loadLocalDB();
    if (!db.users[uid]) return null;
    db.users[uid].personnages.push(p);
    await MG_saveLocalDB(db);
    return p;
  }
  const db  = await MG_getDB();
  const ref = db.collection('users').doc(uid);
  const doc = await ref.get();
  if (!doc.exists) return null;
  const user = doc.data();
  user.personnages.push(p);
  await ref.update({ personnages: user.personnages });
  return p;
}

async function MG_updatePersonnage(uid, pid, updates) {
  if (!MG_isFirebaseConfigured()) {
    const db   = await MG_loadLocalDB();
    const user = db.users[uid]; if (!user) return false;
    const idx  = user.personnages.findIndex(p => p.id === pid); if (idx === -1) return false;
    Object.assign(user.personnages[idx], updates);
    await MG_saveLocalDB(db); return true;
  }
  const db  = await MG_getDB();
  const ref = db.collection('users').doc(uid);
  const doc = await ref.get(); if (!doc.exists) return false;
  const user = doc.data();
  const idx  = user.personnages.findIndex(p => p.id === pid); if (idx === -1) return false;
  Object.assign(user.personnages[idx], updates);
  await ref.update({ personnages: user.personnages }); return true;
}

async function MG_deletePersonnage(uid, pid) {
  if (!MG_isFirebaseConfigured()) {
    const db   = await MG_loadLocalDB();
    const user = db.users[uid]; if (!user) return false;
    user.personnages = user.personnages.filter(p => p.id !== pid);
    await MG_saveLocalDB(db); return true;
  }
  const db  = await MG_getDB();
  const ref = db.collection('users').doc(uid);
  const doc = await ref.get(); if (!doc.exists) return false;
  const user = doc.data();
  user.personnages = user.personnages.filter(p => p.id !== pid);
  await ref.update({ personnages: user.personnages }); return true;
}

// ═══════════════════════════════════════════════════
//  EMPLOYEES
// ═══════════════════════════════════════════════════

async function MG_getEmployeeEmails() {
  try {
    if (!MG_isFirebaseConfigured()) {
      return (await MG_loadLocalDB()).employees || [];
    }
    const db  = await MG_getDB();
    const doc = await db.collection('meta').doc('config').get();
    return doc.exists ? (doc.data().employees || []) : [];
  } catch(e) { return []; }
}

async function MG_isEmployee(email) {
  if (MG_isAdmin(email)) return true;
  return (await MG_getEmployeeEmails()).includes(email);
}

async function MG_addEmployee(email) {
  if (!MG_isFirebaseConfigured()) {
    const db = await MG_loadLocalDB();
    if (!db.employees.includes(email)) db.employees.push(email);
    if (db.users) Object.values(db.users).forEach(u => { if (u.email === email) u.role = 'employee'; });
    await MG_saveLocalDB(db); return;
  }
  const db   = await MG_getDB();
  const ref  = db.collection('meta').doc('config');
  const doc  = await ref.get();
  const emps = doc.exists ? (doc.data().employees || []) : [];
  if (!emps.includes(email)) await ref.set({ employees:[...emps, email] }, { merge:true });
  const snap = await db.collection('users').where('email','==',email).limit(1).get();
  if (!snap.empty) await snap.docs[0].ref.update({ role:'employee' });
}

async function MG_removeEmployee(email) {
  if (!MG_isFirebaseConfigured()) {
    const db = await MG_loadLocalDB();
    db.employees = db.employees.filter(e => e !== email);
    if (db.users) Object.values(db.users).forEach(u => { if (u.email === email && u.role === 'employee') u.role = 'client'; });
    await MG_saveLocalDB(db); return;
  }
  const db   = await MG_getDB();
  const ref  = db.collection('meta').doc('config');
  const doc  = await ref.get();
  const emps = doc.exists ? (doc.data().employees || []) : [];
  await ref.set({ employees: emps.filter(e => e !== email) }, { merge:true });
  const snap = await db.collection('users').where('email','==',email).limit(1).get();
  if (!snap.empty) await snap.docs[0].ref.update({ role:'client' });
}

// ═══════════════════════════════════════════════════
//  INVOICES
// ═══════════════════════════════════════════════════

async function MG_saveInvoice(inv) {
  if (!MG_isFirebaseConfigured()) {
    const db = await MG_loadLocalDB();
    db.invoices.push(inv);
    await MG_saveLocalDB(db); return;
  }
  const db = await MG_getDB();
  await db.collection('invoices').doc(inv.id).set(inv);
}

async function MG_getInvoices() {
  if (!MG_isFirebaseConfigured()) {
    return (await MG_loadLocalDB()).invoices || [];
  }
  try {
    const db   = await MG_getDB();
    const snap = await db.collection('invoices').orderBy('date','desc').limit(50).get();
    return snap.docs.map(d => d.data());
  } catch(e) { return []; }
}

// ═══════════════════════════════════════════════════
//  GOOGLE GSI
// ═══════════════════════════════════════════════════

function MG_decodeJWT(token) {
  try {
    const parts  = token.split('.');
    if (parts.length !== 3) return null;
    const base64 = parts[1].replace(/-/g,'+').replace(/_/g,'/');
    const padded = base64 + '=='.slice(0,(4-base64.length%4)%4);
    const json   = decodeURIComponent(
      atob(padded).split('').map(c => '%'+('00'+c.charCodeAt(0).toString(16)).slice(-2)).join('')
    );
    return JSON.parse(json);
  } catch(e) { console.error('JWT decode error:',e); return null; }
}

async function MG_handleCredential(response) {
  const payload = MG_decodeJWT(response.credential);
  if (!payload) { alert('Erreur Google. Réessayez.'); return; }
  const uid  = 'g_' + payload.sub;
  const user = await MG_upsertUser(uid, { email: payload.email });
  MG_setSession({ uid, email: payload.email });
  if (window._mgLoginCb) window._mgLoginCb(user);
}

function MG_googleLogin(cb) { window._mgLoginCb = cb; }
function onGoogleLibraryLoad() {}
function _MG_initGSI()       {}
function _MG_renderButtons() {
  function tryRender(attempt) {
    ['_gsi_btn','_gsi_emp'].forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      if (el.offsetWidth > 0) {
        el.innerHTML = '';
        try {
          google.accounts.id.renderButton(el, {
            theme:'filled_black', size:'large', text:'continue_with',
            shape:'rectangular', width:Math.min(320,el.offsetWidth||320), locale:'fr'
          });
        } catch(e) { console.warn('GSI renderButton error:',e); }
      } else if (attempt < 5) {
        setTimeout(() => tryRender(attempt+1), 100*attempt);
      }
    });
  }
  requestAnimationFrame(() => requestAnimationFrame(() => tryRender(1)));
}

// ── TOAST
function MG_toast(title, msg, type='gold') {
  const el = document.getElementById('toast'); if (!el) return;
  const c  = { gold:'var(--gold)', red:'#e74c3c', green:'#3d8c6e', blue:'#5865F2' };
  el.style.borderLeftColor = c[type]||c.gold;
  document.getElementById('toastTitle').textContent = title;
  document.getElementById('toastMsg').textContent   = msg;
  el.classList.add('show'); clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove('show'), 3800);
}

// ═══════════════════════════════════════════════════
//  COMMANDES
// ═══════════════════════════════════════════════════
function MG_orderId() { return 'CMD-' + Date.now().toString(36).toUpperCase().slice(-6); }

async function MG_saveOrder(order) {
  if (!MG_isFirebaseConfigured()) {
    const db = await MG_loadLocalDB();
    if (!db.orders) db.orders = [];
    db.orders.unshift(order);
    await MG_saveLocalDB(db); return;
  }
  const db = await MG_getDB();
  await db.collection('orders').doc(order.id).set(order);
}

async function MG_getOrders() {
  if (!MG_isFirebaseConfigured()) {
    return ((await MG_loadLocalDB()).orders || []);
  }
  try {
    const db   = await MG_getDB();
    const snap = await db.collection('orders').orderBy('ts', 'desc').limit(300).get();
    return snap.docs.map(d => d.data());
  } catch(e) { return []; }
}

async function MG_getOrdersByUser(uid) {
  const all = await MG_getOrders();
  return all.filter(o => o.uid === uid);
}

async function MG_updateOrderStatus(orderId, status) {
  if (!MG_isFirebaseConfigured()) {
    const db  = await MG_loadLocalDB();
    const idx = (db.orders||[]).findIndex(o => o.id === orderId);
    if (idx >= 0) { db.orders[idx].status = status; await MG_saveLocalDB(db); }
    return;
  }
  const db = await MG_getDB();
  await db.collection('orders').doc(orderId).update({ status });
}

// ═══════════════════════════════════════════════════
//  POINTS — retrait
// ═══════════════════════════════════════════════════
async function MG_removePoints(uid, pid, amount) {
  const user  = await MG_getUser(uid); if (!user) return false;
  const perso = user.personnages.find(p => p.id === pid); if (!perso) return false;
  return MG_updatePersonnage(uid, pid, { points: Math.max(0, (perso.points||0) - amount) });
}

// ═══════════════════════════════════════════════════
//  FIDÉLITÉ — renouvellement mensuel + grâce 3j
// ═══════════════════════════════════════════════════
// Retourne { active, expired, grace, daysLeft, daysOver }
function MG_loyaltyStatus(perso) {
  if (!perso.loyaltyActive) return { active: false };
  if (!perso.loyaltyActivatedAt) return { active: true, noDate: true, daysLeft: 30 };
  const now      = new Date();
  const start    = new Date(perso.loyaltyActivatedAt);
  const expireAt = new Date(start.getTime() + 30 * 864e5);
  const graceEnd = new Date(expireAt.getTime() +  3 * 864e5);
  if (now < expireAt) return { active:true, expired:false, daysLeft: Math.ceil((expireAt-now)/864e5), expireAt };
  if (now < graceEnd) return { active:true, expired:true,  grace:true,  daysOver: Math.ceil((now-expireAt)/864e5), graceEnd };
  return             { active:true, expired:true,  grace:false, daysOver: Math.ceil((now-expireAt)/864e5) };
}

async function MG_activateLoyalty(uid, pid) {
  return MG_updatePersonnage(uid, pid, { loyaltyActive:true, loyaltyActivatedAt: new Date().toISOString() });
}
async function MG_renewLoyalty(uid, pid) {
  return MG_updatePersonnage(uid, pid, { loyaltyActivatedAt: new Date().toISOString() });
}
async function MG_deactivateLoyalty(uid, pid) {
  return MG_updatePersonnage(uid, pid, { loyaltyActive:false, loyaltyActivatedAt:null });
}
async function MG_checkAndResetLoyalty(uid, pid) {
  const user  = await MG_getUser(uid); if (!user) return;
  const perso = user.personnages.find(p => p.id === pid); if (!perso) return;
  const st = MG_loyaltyStatus(perso);
  if (st.expired && !st.grace) {
    await MG_updatePersonnage(uid, pid, { points:0, loyaltyActive:false, loyaltyActivatedAt:null });
    return 'reset';
  }
}

// ═══════════════════════════════════════════════════
//  CONTRATS — renouvellement mensuel + grâce 3j
// ═══════════════════════════════════════════════════
function MG_contractStatus(perso) {
  if (!perso.contract) return { active: false };
  if (!perso.contractSince || !perso.contractSince.includes('T')) return { active:true, noDate:true, daysLeft:30, type:perso.contract };
  const now      = new Date();
  const start    = new Date(perso.contractSince);
  const days = (perso.contractDays || 30);
  const expireAt = new Date(start.getTime() + days * 864e5);
  const graceEnd = new Date(expireAt.getTime() + 3 * 864e5);
  if (now < expireAt) return { active:true, expired:false, daysLeft:Math.ceil((expireAt-now)/864e5), expireAt, type:perso.contract, days };
  if (now < graceEnd) return { active:true, expired:true,  grace:true,  daysOver:Math.ceil((now-expireAt)/864e5), graceEnd, type:perso.contract };
  return             { active:true, expired:true,  grace:false, daysOver:Math.ceil((now-expireAt)/864e5), type:perso.contract };
}

async function MG_renewContract(uid, pid) {
  return MG_updatePersonnage(uid, pid, { contractSince: new Date().toISOString() });
}
async function MG_checkAndResetContract(uid, pid) {
  const user  = await MG_getUser(uid); if (!user) return;
  const perso = user.personnages.find(p => p.id === pid); if (!perso) return;
  const st = MG_contractStatus(perso);
  if (st.expired && !st.grace) {
    await MG_updatePersonnage(uid, pid, { contract:null, contractSince:null });
    return 'reset';
  }
}

// ═══════════════════════════════════════════════════
//  SUPPRESSION COMMANDE / FACTURE
// ═══════════════════════════════════════════════════
async function MG_deleteOrder(orderId) {
  if (!MG_isFirebaseConfigured()) {
    const db  = await MG_loadLocalDB();
    db.orders = (db.orders||[]).filter(o => o.id !== orderId);
    await MG_saveLocalDB(db); return;
  }
  const db = await MG_getDB();
  await db.collection('orders').doc(orderId).delete();
}

async function MG_deleteInvoice(invId) {
  if (!MG_isFirebaseConfigured()) {
    const db  = await MG_loadLocalDB();
    db.invoices = (db.invoices||[]).filter(i => i.id !== invId);
    await MG_saveLocalDB(db); return;
  }
  const db = await MG_getDB();
  await db.collection('invoices').doc(invId).delete();
}

// ═══════════════════════════════════════════════════
//  AVANTAGES CONTRATS / FIDÉLITÉ (Firestore overrides)
// ═══════════════════════════════════════════════════
async function MG_getPerksOverrides() {
  if (!MG_isFirebaseConfigured()) {
    try { const v=localStorage.getItem('mg_perks_v1'); return v ? JSON.parse(v) : null; } catch(e) { return null; }
  }
  try {
    const db  = await MG_getDB();
    const doc = await db.collection('meta').doc('perks').get();
    return doc.exists ? doc.data() : null;
  } catch(e) { return {}; }
}

async function MG_savePerksOverrides(data) {
  if (!MG_isFirebaseConfigured()) {
    localStorage.setItem('mg_perks_v1', JSON.stringify(data)); return;
  }
  const db = await MG_getDB();
  await db.collection('meta').doc('perks').set(data);
}

// Retourne les perks actifs (override ou défaut)
async function MG_getActivePerks() {
  const ov = await MG_getPerksOverrides();
  const tiers     = JSON.parse(JSON.stringify(MG_TIERS));
  const contracts = JSON.parse(JSON.stringify(MG_CONTRACTS));
  if (!ov || !Object.keys(ov).length) return { tiers, contracts };
  if (ov.tiers) ov.tiers.forEach((td, i) => {
    if (!tiers[i]) return;
    if (td.perks  !== undefined) tiers[i].perks  = td.perks;
    if (td.reward !== undefined) tiers[i].reward = td.reward;
  });
  if (ov.contracts) Object.keys(ov.contracts).forEach(k => {
    if (!contracts[k]) return;
    const oc = ov.contracts[k];
    if (oc.perks    !== undefined) contracts[k].perks    = oc.perks;
    if (oc.discount !== undefined) contracts[k].discount = oc.discount;
  });
  return { tiers, contracts };
}
