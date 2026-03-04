// ═══════════════════════════════════════════════════
//  MARSHALL GROUP — Shared Data & Session Library
//  Partagé par toutes les pages du site
// ═══════════════════════════════════════════════════

// ── TIERS FIDÉLITÉ
const MG_TIERS = [
  {
    name: 'Bronze', min: 0, max: 1000,
    dot: '#cd7f32',
    color: '#cd7f32',
    perks: ['1 boîte de munitions offerte au choix à chaque achat']
  },
  {
    name: 'Argent', min: 1000, max: 3500,
    dot: '#a8a9ad',
    color: '#a8a9ad',
    perks: ['3 boîtes de munitions offertes au choix à chaque achat', 'Avantages Bronze inclus']
  },
  {
    name: 'Or', min: 3500, max: 10000,
    dot: '#c8a84b',
    color: '#c8a84b',
    perks: ['À l\'achat d\'un gilet léger, un second est offert', 'Avantages Bronze & Argent inclus']
  },
  {
    name: 'Platinium', min: 10000, max: 999999,
    dot: '#a0b2c8',
    color: '#a0b2c8',
    perks: ['1 arme de poing offerte par mois', 'Tous les avantages précédents inclus']
  },
];

// ── CONTRATS
const MG_CONTRACTS = {
  particulier: {
    label: 'Contrat Particulier',
    price: 5000,
    period: 'par mois',
    perks: [
      'Marge divisée par 2 sur tous les achats',
      'Munitions offertes à chaque commande',
      'Accès aux commandes via Discord',
      'Commandes prioritaires',
      'Accès batteuses : Minimi, RPK-12 & MG36',
    ]
  },
  entreprise: {
    label: 'Contrat Entreprise',
    price: 15000,
    period: 'par mois',
    perks: [
      'Marge divisée par 2 sur tous les achats',
      'Munitions offertes à chaque commande',
      'Accès aux commandes via Discord',
      'Commandes prioritaires',
      'Gestionnaire de compte dédié',
      'Approvisionnement hebdomadaire garanti',
    ]
  }
};

// ── CATALOGUE COMPLET
const MG_CATALOGUE = [
  // Pistolets
  { name:'MK23',           cat:'pistolet',    price:4950,  marge:10, spec:false },
  { name:'M9',             cat:'pistolet',    price:4950,  marge:10, spec:false },
  { name:'P320',           cat:'pistolet',    price:4950,  marge:10, spec:false },
  { name:'FNP-45',         cat:'pistolet',    price:4950,  marge:10, spec:false },
  { name:'Glock 19',       cat:'pistolet',    price:4950,  marge:10, spec:false },
  { name:'Five-seveN MK2', cat:'pistolet',    price:4950,  marge:10, spec:false },
  { name:'Glock 17',       cat:'pistolet',    price:4950,  marge:10, spec:false },
  { name:'CZ 75',          cat:'pistolet',    price:4950,  marge:10, spec:false },
  { name:'Colt M45',       cat:'pistolet',    price:4950,  marge:10, spec:false },
  { name:'P99',            cat:'pistolet',    price:3850,  marge:10, spec:false },
  { name:'USP',            cat:'pistolet',    price:4950,  marge:10, spec:true  },
  { name:'SW659',          cat:'pistolet',    price:4950,  marge:10, spec:true  },
  { name:'KNW',            cat:'pistolet',    price:4950,  marge:10, spec:true  },
  // Revolvers
  { name:'MR 96',          cat:'revolver',    price:4950,  marge:10, spec:false },
  { name:'MR 73',          cat:'revolver',    price:3850,  marge:10, spec:false },
  { name:'Desert Eagle',   cat:'revolver',    price:4950,  marge:10, spec:true  },
  { name:'Taurus Cobra',   cat:'revolver',    price:4950,  marge:10, spec:true  },
  // SMG
  { name:'MP5',            cat:'smg',         price:13200, marge:10, spec:false },
  { name:'UMP-45',         cat:'smg',         price:13200, marge:10, spec:false },
  { name:'MP7',            cat:'smg',         price:9900,  marge:10, spec:false },
  { name:'Kriss Vector',   cat:'smg',         price:13200, marge:10, spec:true  },
  { name:'MP9',            cat:'smg',         price:9900,  marge:10, spec:true  },
  { name:'Uzi',            cat:'smg',         price:8800,  marge:10, spec:true  },
  // Assaut
  { name:'RFB',            cat:'assaut',      price:49500, marge:10, spec:false },
  { name:'Scar-H',         cat:'assaut',      price:24200, marge:10, spec:false },
  { name:'Scar-L',         cat:'assaut',      price:16500, marge:10, spec:false },
  { name:'MK 18',          cat:'assaut',      price:16500, marge:10, spec:false },
  { name:'MK 18 Mod',      cat:'assaut',      price:16500, marge:10, spec:false },
  { name:'M4A1',           cat:'assaut',      price:16500, marge:10, spec:false },
  { name:'AR-15',          cat:'assaut',      price:16500, marge:10, spec:false },
  { name:'HK 416',         cat:'assaut',      price:16500, marge:10, spec:false },
  { name:'G36C',           cat:'assaut',      price:16500, marge:10, spec:false },
  { name:'CZ 805',         cat:'assaut',      price:16500, marge:10, spec:false },
  { name:'F90 MBR',        cat:'assaut',      price:16500, marge:10, spec:false },
  { name:'ACR',            cat:'assaut',      price:16500, marge:10, spec:false },
  { name:'SKS',            cat:'assaut',      price:49500, marge:10, spec:true  },
  { name:'Minimi',         cat:'assaut',      price:33000, marge:10, spec:true  },
  { name:'RPK-12',         cat:'assaut',      price:33000, marge:10, spec:true  },
  { name:'MG36',           cat:'assaut',      price:33000, marge:10, spec:true  },
  { name:'FN FAL',         cat:'assaut',      price:17600, marge:10, spec:true  },
  { name:'Abakan',         cat:'assaut',      price:16500, marge:10, spec:true  },
  { name:'Galil',          cat:'assaut',      price:16500, marge:10, spec:true  },
  { name:'AK-400',         cat:'assaut',      price:16500, marge:10, spec:true  },
  { name:'AK-103',         cat:'assaut',      price:16500, marge:10, spec:true  },
  // Précision
  { name:'Warface',        cat:'precision',   price:52500, marge:5,  spec:false },
  { name:'M24',            cat:'precision',   price:52500, marge:5,  spec:false },
  { name:'M40 A1',         cat:'precision',   price:52500, marge:5,  spec:false },
  { name:'M98',            cat:'precision',   price:52500, marge:5,  spec:true  },
  { name:'M82',            cat:'precision',   price:52500, marge:5,  spec:true  },
  // Pompe
  { name:'M870',           cat:'pompe',       price:13200, marge:10, spec:false },
  { name:'Nova',           cat:'pompe',       price:13200, marge:10, spec:false },
  { name:'M590',           cat:'pompe',       price:13200, marge:10, spec:false },
  { name:'M500',           cat:'pompe',       price:14300, marge:10, spec:true  },
  { name:'SPAS-12',        cat:'pompe',       price:13200, marge:10, spec:true  },
  { name:'Fort 500',       cat:'pompe',       price:13200, marge:10, spec:true  },
  { name:'Toz 194',        cat:'pompe',       price:13200, marge:10, spec:true  },
  // Munitions
  { name:'Munitions Pistolet',      cat:'munitions', price:83,  marge:34, spec:false },
  { name:'Munitions .357',          cat:'munitions', price:99,  marge:34, spec:false },
  { name:'Munitions SMG',           cat:'munitions', price:143, marge:34, spec:false },
  { name:'Munitions Pompe',         cat:'munitions', price:110, marge:34, spec:false },
  { name:'Munitions Assaut',        cat:'munitions', price:198, marge:34, spec:false },
  { name:'Munitions Sniper',        cat:'munitions', price:275, marge:34, spec:false },
  // Équipement
  { name:'Gilet pare-balles léger', cat:'equipement', price:3300, marge:10, spec:false },
  { name:'Gilet pare-balles lourd', cat:'equipement', price:6600, marge:10, spec:false },
];

// ── HELPERS
function MG_getTier(points) {
  for (let i = MG_TIERS.length - 1; i >= 0; i--) {
    if (points >= MG_TIERS[i].min) return MG_TIERS[i];
  }
  return MG_TIERS[0];
}

function MG_fmtPrice(n) {
  return Number(n).toLocaleString('fr-FR') + ' $';
}

function MG_today() {
  return new Date().toLocaleDateString('fr-FR', { day:'2-digit', month:'short', year:'numeric' });
}

// ── STORAGE KEYS
const MG_DB_KEY      = 'mg_db_v1';
const MG_SESSION_KEY = 'mg_session_v1';

// ── DEFAULT DB
const MG_DEFAULT_DB = {
  users: {}  // keyed by Google sub/email — populated on first login
};

// ── DB
function MG_loadDB() {
  try {
    const raw = localStorage.getItem(MG_DB_KEY);
    if (!raw) { const db = JSON.parse(JSON.stringify(MG_DEFAULT_DB)); MG_saveDB(db); return db; }
    return JSON.parse(raw);
  } catch(e) { return JSON.parse(JSON.stringify(MG_DEFAULT_DB)); }
}
function MG_saveDB(db) { localStorage.setItem(MG_DB_KEY, JSON.stringify(db)); }

function MG_getUser(uid) { return MG_loadDB().users[uid] || null; }

function MG_upsertUser(uid, data) {
  const db = MG_loadDB();
  if (!db.users[uid]) {
    db.users[uid] = { uid, name: data.name, email: data.email, avatar: data.avatar||'', role:'client', personnages:[], createdAt: MG_today() };
  } else {
    Object.assign(db.users[uid], { name: data.name, email: data.email, avatar: data.avatar||'' });
  }
  MG_saveDB(db);
  return db.users[uid];
}

function MG_updateUser(uid, updates) {
  const db = MG_loadDB();
  if (!db.users[uid]) return false;
  Object.assign(db.users[uid], updates);
  MG_saveDB(db);
  return true;
}

function MG_addPersonnage(uid, prenom, nom) {
  const db = MG_loadDB();
  if (!db.users[uid]) return null;
  const perso = {
    id: 'p_' + Date.now(),
    prenom, nom,
    points: 0,
    contract: null,
    contractSince: null,
    loyaltyActive: false,
    history: [],
    createdAt: MG_today()
  };
  db.users[uid].personnages.push(perso);
  MG_saveDB(db);
  return perso;
}

function MG_updatePersonnage(uid, pid, updates) {
  const db = MG_loadDB();
  const user = db.users[uid];
  if (!user) return false;
  const idx = user.personnages.findIndex(p => p.id === pid);
  if (idx === -1) return false;
  Object.assign(user.personnages[idx], updates);
  MG_saveDB(db);
  return true;
}

function MG_deletePersonnage(uid, pid) {
  const db = MG_loadDB();
  const user = db.users[uid];
  if (!user) return false;
  user.personnages = user.personnages.filter(p => p.id !== pid);
  MG_saveDB(db);
  return true;
}

// ── SESSION
function MG_getSession() {
  try { return JSON.parse(sessionStorage.getItem(MG_SESSION_KEY)); } catch(e) { return null; }
}
function MG_setSession(data) { sessionStorage.setItem(MG_SESSION_KEY, JSON.stringify(data)); }
function MG_clearSession() { sessionStorage.removeItem(MG_SESSION_KEY); }

// ── TOAST (global — requires #toast, #toastTitle, #toastMsg in DOM)
function MG_toast(title, msg, type = 'gold') {
  const el = document.getElementById('toast');
  if (!el) return;
  const c = { gold:'var(--gold)', red:'#e74c3c', green:'#3d8c6e', blue:'#5865F2' };
  el.style.borderLeftColor = c[type] || c.gold;
  document.getElementById('toastTitle').textContent = title;
  document.getElementById('toastMsg').textContent = msg;
  el.classList.add('show');
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove('show'), 3800);
}

// ── GOOGLE OAUTH SIMULATION
// In production: replace with real Google Identity Services
const MG_GOOGLE_USERS = [
  { uid:'g_001', name:'Alexandre Martin',   email:'alexandre.martin@gmail.com',   avatar:'A' },
  { uid:'g_002', name:'Sophie Leclerc',     email:'sophie.leclerc@gmail.com',     avatar:'S' },
  { uid:'g_003', name:'Lucas Bernard',      email:'lucas.bernard@gmail.com',      avatar:'L' },
  { uid:'g_004', name:'Emma Dubois',        email:'emma.dubois@gmail.com',        avatar:'E' },
];

function MG_simulateGoogleLogin(callback) {
  // Simulates OAuth — in production use Google Identity Services SDK
  const u = MG_GOOGLE_USERS[Math.floor(Math.random() * MG_GOOGLE_USERS.length)];
  const user = MG_upsertUser(u.uid, u);
  MG_setSession({ uid: u.uid });
  if (callback) callback(user);
}
