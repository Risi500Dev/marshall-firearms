// ═══════════════════════════════════════════════════
//  MARSHALL GROUP — Shared Data & Session Library
// ═══════════════════════════════════════════════════

const MG_GOOGLE_CLIENT_ID = '516324648555-abujqrn3783dl0fb52nctu8e6ss168ao.apps.googleusercontent.com';
const MG_ADMIN_EMAIL      = 'william.lautrec92enc.off@gmail.com';

// ── ROLES
function MG_getEmployeeEmails() {
  try { return MG_loadDB().employees || []; } catch(e) { return []; }
}
function MG_isAdmin(email)    { return email === MG_ADMIN_EMAIL; }
function MG_isEmployee(email) { return MG_isAdmin(email) || MG_getEmployeeEmails().includes(email); }

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
    label:'Contrat Particulier', price:5000, period:'par mois',
    perks:['Marge divisée par 2','Munitions offertes à chaque commande','Commandes prioritaires','Accès batteuses : Minimi, RPK-12 & MG36']
  },
  entreprise: {
    label:'Contrat Entreprise', price:15000, period:'par mois',
    perks:['Marge divisée par 2','Munitions offertes à chaque commande','Commandes prioritaires','Gestionnaire de compte dédié','Approvisionnement hebdomadaire garanti']
  }
};

// ── CATALOGUE
const MG_CATALOGUE = [
  // Pistolets
  { name:'MK23',           cat:'pistolet',  mode:'Semi',     cal:'11.43mm',    mag:12,  price:4950,  marge:10, spec:false },
  { name:'M9',             cat:'pistolet',  mode:'Semi',     cal:'9mm',        mag:15,  price:4950,  marge:10, spec:false },
  { name:'P320',           cat:'pistolet',  mode:'Semi',     cal:'9mm',        mag:17,  price:4950,  marge:10, spec:false },
  { name:'FNP-45',         cat:'pistolet',  mode:'Semi',     cal:'11.43mm',    mag:15,  price:4950,  marge:10, spec:false },
  { name:'Glock 19',       cat:'pistolet',  mode:'Semi',     cal:'9mm',        mag:15,  price:4950,  marge:10, spec:false },
  { name:'Five-seveN MK2', cat:'pistolet',  mode:'Semi',     cal:'5.7×28mm',   mag:20,  price:4950,  marge:10, spec:false },
  { name:'Glock 17',       cat:'pistolet',  mode:'Semi',     cal:'9mm',        mag:17,  price:4950,  marge:10, spec:false },
  { name:'CZ 75',          cat:'pistolet',  mode:'Semi',     cal:'9mm',        mag:16,  price:4950,  marge:10, spec:false },
  { name:'Colt M45',       cat:'pistolet',  mode:'Semi',     cal:'11.43mm',    mag:8,   price:4950,  marge:10, spec:false },
  { name:'P99',            cat:'pistolet',  mode:'Semi',     cal:'9mm',        mag:16,  price:3850,  marge:10, spec:false },
  { name:'USP',            cat:'pistolet',  mode:'Semi',     cal:'9mm',        mag:15,  price:4950,  marge:10, spec:true  },
  { name:'SW659',          cat:'pistolet',  mode:'Semi',     cal:'9mm',        mag:14,  price:4950,  marge:10, spec:true  },
  { name:'KNW',            cat:'pistolet',  mode:'Auto',     cal:'9mm',        mag:20,  price:4950,  marge:10, spec:true  },
  // Revolvers
  { name:'MR 96',          cat:'revolver',  mode:'Revolver', cal:'.357 Mag',   mag:6,   price:4950,  marge:10, spec:false },
  { name:'MR 73',          cat:'revolver',  mode:'Revolver', cal:'.357 Mag',   mag:6,   price:3850,  marge:10, spec:false },
  { name:'Desert Eagle',   cat:'revolver',  mode:'Semi',     cal:'.50 AE',     mag:7,   price:4950,  marge:10, spec:true  },
  { name:'Thanez Cobra',   cat:'revolver',  mode:'Semi',     cal:'.357 Magnum',mag:'6',  price:4500,  marge:10, spec:true  },
  // SMG
  { name:'MP5',            cat:'smg',       mode:'Auto',     cal:'9mm',        mag:30,  price:13200, marge:10, spec:false },
  { name:'UMP-45',         cat:'smg',       mode:'Auto',     cal:'11.43mm',    mag:25,  price:13200, marge:10, spec:false },
  { name:'MP7',            cat:'smg',       mode:'Auto',     cal:'4.6×30mm',   mag:40,  price:9900,  marge:10, spec:false },
  { name:'Kriss Vector',   cat:'smg',       mode:'Auto',     cal:'11.43mm',    mag:25,  price:13200, marge:10, spec:true  },
  { name:'MP9',            cat:'smg',       mode:'Auto',     cal:'9mm',        mag:32,  price:9900,  marge:10, spec:true  },
  { name:'Uzi',            cat:'smg',       mode:'Auto',     cal:'9mm',        mag:32,  price:8800,  marge:10, spec:true  },
  // Assaut
  { name:'RFB',            cat:'assaut',    mode:'Semi',     cal:'7.62×51mm',  mag:20,  price:49500, marge:10, spec:false },
  { name:'Scar-H',         cat:'assaut',    mode:'Auto',     cal:'7.62×51mm',  mag:20,  price:24200, marge:10, spec:false },
  { name:'Scar-L',         cat:'assaut',    mode:'Auto',     cal:'5.56×45mm',  mag:30,  price:16500, marge:10, spec:false },
  { name:'MK 18',          cat:'assaut',    mode:'Auto',     cal:'5.56×45mm',  mag:30,  price:16500, marge:10, spec:false },
  { name:'MK 18 Mod',      cat:'assaut',    mode:'Auto',     cal:'5.56×45mm',  mag:30,  price:16500, marge:10, spec:false },
  { name:'M4A1',           cat:'assaut',    mode:'Auto',     cal:'5.56×45mm',  mag:30,  price:16500, marge:10, spec:false },
  { name:'AR-15',          cat:'assaut',    mode:'Semi',     cal:'5.56×45mm',  mag:30,  price:16500, marge:10, spec:false },
  { name:'HK 416',         cat:'assaut',    mode:'Auto',     cal:'5.56×45mm',  mag:30,  price:16500, marge:10, spec:false },
  { name:'G36C',           cat:'assaut',    mode:'Auto',     cal:'5.56×45mm',  mag:30,  price:16500, marge:10, spec:false },
  { name:'CZ 805',         cat:'assaut',    mode:'Auto',     cal:'5.56×45mm',  mag:30,  price:16500, marge:10, spec:false },
  { name:'F90 MBR',        cat:'assaut',    mode:'Auto',     cal:'5.56×45mm',  mag:30,  price:16500, marge:10, spec:false },
  { name:'ACR',            cat:'assaut',    mode:'Auto',     cal:'5.56×45mm',  mag:30,  price:16500, marge:10, spec:false },
  { name:'SKS',            cat:'assaut',    mode:'Semi',     cal:'7.62×39mm',  mag:10,  price:49500, marge:10, spec:true  },
  { name:'Minimi',         cat:'assaut',    mode:'Auto',     cal:'5.56×45mm',  mag:200, price:33000, marge:10, spec:true  },
  { name:'RPK-12',         cat:'assaut',    mode:'Auto',     cal:'7.62×39mm',  mag:75,  price:33000, marge:10, spec:true  },
  { name:'MG36',           cat:'assaut',    mode:'Auto',     cal:'5.56×45mm',  mag:100, price:33000, marge:10, spec:true  },
  { name:'FN FAL',         cat:'assaut',    mode:'Auto',     cal:'7.62×51mm',  mag:20,  price:17600, marge:10, spec:true  },
  { name:'Abakan',         cat:'assaut',    mode:'Auto',     cal:'5.45×39mm',  mag:30,  price:16500, marge:10, spec:true  },
  { name:'Galil',          cat:'assaut',    mode:'Auto',     cal:'5.56×45mm',  mag:35,  price:16500, marge:10, spec:true  },
  { name:'AK-400',         cat:'assaut',    mode:'Auto',     cal:'5.45×39mm',  mag:30,  price:16500, marge:10, spec:true  },
  { name:'AK-103',         cat:'assaut',    mode:'Auto',     cal:'7.62×39mm',  mag:30,  price:16500, marge:10, spec:true  },
  // Précision
  { name:'Warface',        cat:'precision', mode:'Semi',     cal:'7.62×51mm',  mag:10,  price:52500, marge:5,  spec:false },
  { name:'M24',            cat:'precision', mode:'Semi',     cal:'7.62×51mm',  mag:10,  price:52500, marge:5,  spec:false },
  { name:'M40 A1',         cat:'precision', mode:'Semi',     cal:'7.62×51mm',  mag:5,   price:52500, marge:5,  spec:false },
  { name:'M98',            cat:'precision', mode:'Semi',     cal:'.338 Lapua', mag:5,   price:52500, marge:5,  spec:true  },
  { name:'M82',            cat:'precision', mode:'Semi',     cal:'.50 BMG',    mag:10,  price:52500, marge:5,  spec:true  },
  // Pompe
  { name:'M870',           cat:'pompe',     mode:'Pompe',    cal:'12 Gauge',   mag:7,   price:13200, marge:10, spec:false },
  { name:'Nova',           cat:'pompe',     mode:'Pompe',    cal:'12 Gauge',   mag:8,   price:13200, marge:10, spec:false },
  { name:'M590',           cat:'pompe',     mode:'Pompe',    cal:'12 Gauge',   mag:9,   price:13200, marge:10, spec:false },
  { name:'M500',           cat:'pompe',     mode:'Pompe',    cal:'12 Gauge',   mag:5,   price:14300, marge:10, spec:true  },
  { name:'SPAS-12',        cat:'pompe',     mode:'Pompe',    cal:'12 Gauge',   mag:8,   price:13200, marge:10, spec:true  },
  { name:'Fort 500',       cat:'pompe',     mode:'Pompe',    cal:'12 Gauge',   mag:7,   price:13200, marge:10, spec:true  },
  { name:'Toz 194',        cat:'pompe',     mode:'Pompe',    cal:'12 Gauge',   mag:6,   price:13200, marge:10, spec:true  },
  // Munitions
  { name:'Munitions Pistolet',       cat:'munitions',  mode:'—', cal:'9mm / .45',    mag:null, price:83,   marge:34, spec:false },
  { name:'Munitions .357',           cat:'munitions',  mode:'—', cal:'.357 Mag',     mag:null, price:99,   marge:34, spec:false },
  { name:'Munitions SMG',            cat:'munitions',  mode:'—', cal:'9mm / .45',    mag:null, price:143,  marge:34, spec:false },
  { name:'Munitions Pompe',          cat:'munitions',  mode:'—', cal:'12 Gauge',     mag:null, price:110,  marge:34, spec:false },
  { name:'Munitions Assaut',         cat:'munitions',  mode:'—', cal:'5.56 / 7.62',  mag:null, price:198,  marge:34, spec:false },
  { name:'Munitions Sniper',         cat:'munitions',  mode:'—', cal:'7.62 / .338',  mag:null, price:275,  marge:34, spec:false },
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

// ── DB — JSONBin.io (base partagée entre tous les navigateurs)
// Bin ID et Master Key à configurer ci-dessous après création sur jsonbin.io
const MG_BIN_ID    = '';   // ex: '65f3a...' — créer sur https://jsonbin.io
const MG_BIN_KEY   = '';   // Master Key JSONBin (commence par $2b$...)
const MG_SESSION_KEY = 'mg_session_v1';
// ── Session (localStorage)
function MG_getSession() {
  try { const r = localStorage.getItem(MG_SESSION_KEY); return r ? JSON.parse(r) : null; } catch(e) { return null; }
}
function MG_setSession(data) {
  try { localStorage.setItem(MG_SESSION_KEY, JSON.stringify(data)); } catch(e) {}
}
function MG_clearSession() {
  try { localStorage.removeItem(MG_SESSION_KEY); } catch(e) {}
}

const MG_CACHE_KEY   = 'mg_db_cache_v1';  // cache local pour les lectures rapides

const MG_BIN_URL   = () => `https://api.jsonbin.io/v3/b/${MG_BIN_ID}`;
const MG_HEADERS   = () => ({ 'Content-Type':'application/json', 'X-Master-Key': MG_BIN_KEY });

// ── Cache local (évite les appels réseau redondants)
function MG_getCached() {
  try { const r=localStorage.getItem(MG_CACHE_KEY); return r?JSON.parse(r):null; } catch(e){return null;}
}
function MG_setCache(db) {
  try { localStorage.setItem(MG_CACHE_KEY, JSON.stringify({db, ts:Date.now()})); } catch(e){}
}

// ── Lecture DB (async — retourne Promise<db>)
async function MG_loadDB() {
  // Si pas de BIN configuré → fallback localStorage (mode dev local)
  if (!MG_BIN_ID || !MG_BIN_KEY) {
    try {
      const raw = localStorage.getItem('mg_db_v1');
      if (!raw) { const db={users:{},employees:[],invoices:[]}; return db; }
      const db = JSON.parse(raw);
      if (!db.employees) db.employees=[];
      if (!db.invoices)  db.invoices=[];
      return db;
    } catch(e) { return {users:{},employees:[],invoices:[]}; }
  }
  try {
    const res = await fetch(MG_BIN_URL()+'/latest', { headers: MG_HEADERS() });
    if (!res.ok) throw new Error('HTTP '+res.status);
    const json = await res.json();
    const db = json.record || json;
    if (!db.employees) db.employees=[];
    if (!db.invoices)  db.invoices=[];
    MG_setCache(db);
    return db;
  } catch(e) {
    console.warn('JSONBin read failed, using cache:', e);
    const c = MG_getCached();
    return c ? c.db : {users:{},employees:[],invoices:[]};
  }
}

// ── Écriture DB (async — retourne Promise<void>)
async function MG_saveDB(db) {
  MG_setCache(db);  // toujours sauver en cache local d'abord
  if (!MG_BIN_ID || !MG_BIN_KEY) {
    try { localStorage.setItem('mg_db_v1', JSON.stringify(db)); } catch(e){}
    return;
  }
  try {
    await fetch(MG_BIN_URL(), {
      method: 'PUT',
      headers: MG_HEADERS(),
      body: JSON.stringify(db)
    });
  } catch(e) { console.warn('JSONBin write failed:', e); }
}

// ── USER CRUD (toutes async — appellent await MG_loadDB/saveDB)
async function MG_getUser(uid)      { const db=await MG_loadDB(); return db.users[uid]||null; }
async function MG_getAllUsers()      { const db=await MG_loadDB(); return Object.values(db.users); }
async function MG_getUserByPseudo(pseudo) {
  return (await MG_getAllUsers()).find(u =>
    u.pseudo && u.pseudo.toLowerCase() === pseudo.toLowerCase()
  ) || null;
}
async function MG_getUserByEmail(e) { return (await MG_getAllUsers()).find(u=>u.email===e)||null; }

async function MG_getEmployeeEmails() {
  try { return (await MG_loadDB()).employees || []; } catch(e) { return []; }
}
async function MG_isEmployee(email) {
  if (MG_isAdmin(email)) return true;
  return (await MG_getEmployeeEmails()).includes(email);
}

async function MG_upsertUser(uid, data) {
  const db = await MG_loadDB();
  let role = 'client';
  if (MG_isAdmin(data.email)) {
    role = 'admin';
  } else if ((db.employees||[]).includes(data.email)) {
    role = 'employee';
  } else if (db.users[uid] && db.users[uid].role && db.users[uid].role !== 'client') {
    role = db.users[uid].role;
  }
  if (!db.users[uid]) {
    // Nouveau compte — pseudo vide, sera demandé à la première connexion
    db.users[uid] = { uid, name:data.name, email:data.email, pseudo:'',
      avatar:(data.name||'?')[0].toUpperCase(), role, personnages:[], createdAt:MG_today() };
  } else {
    // Reconnexion — on met à jour name/email/role mais on CONSERVE le pseudo existant
    Object.assign(db.users[uid], { name:data.name, email:data.email,
      avatar:(data.name||'?')[0].toUpperCase(), role });
    // pseudo est conservé tel quel (pas dans Object.assign)
  }
  await MG_saveDB(db);
  return db.users[uid];
}


// ── Pseudo unique
async function MG_isPseudoTaken(pseudo) {
  const users = await MG_getAllUsers();
  return users.some(u => u.pseudo && u.pseudo.toLowerCase() === pseudo.toLowerCase());
}
async function MG_setPseudo(uid, pseudo) {
  const db = await MG_loadDB();
  if (!db.users[uid]) return null;
  db.users[uid].pseudo = pseudo.trim();
  await MG_saveDB(db);
  return db.users[uid];
}
async function MG_addPersonnage(uid, prenom, nom) {
  const db = await MG_loadDB();
  if (!db.users[uid]) return null;
  const p = { id:'p_'+Date.now(), prenom, nom, points:0, contract:null,
    contractSince:null, loyaltyActive:false, history:[], createdAt:MG_today() };
  db.users[uid].personnages.push(p);
  await MG_saveDB(db);
  return p;
}
async function MG_updatePersonnage(uid, pid, updates) {
  const db = await MG_loadDB();
  const user = db.users[uid]; if (!user) return false;
  const idx = user.personnages.findIndex(p=>p.id===pid); if (idx===-1) return false;
  Object.assign(user.personnages[idx], updates);
  await MG_saveDB(db); return true;
}
async function MG_deletePersonnage(uid, pid) {
  const db = await MG_loadDB();
  const user = db.users[uid]; if (!user) return false;
  user.personnages = user.personnages.filter(p=>p.id!==pid);
  await MG_saveDB(db); return true;
}

// ── EMPLOYEE MANAGEMENT
async function MG_addEmployee(email) {
  const db = await MG_loadDB();
  if (!db.employees.includes(email)) db.employees.push(email);
  Object.values(db.users).forEach(u => { if (u.email===email) u.role='employee'; });
  await MG_saveDB(db);
}
async function MG_removeEmployee(email) {
  const db = await MG_loadDB();
  db.employees = db.employees.filter(e=>e!==email);
  Object.values(db.users).forEach(u => { if (u.email===email && u.role==='employee') u.role='client'; });
  await MG_saveDB(db);
}

// ── INVOICES
async function MG_saveInvoice(inv) {
  const db = await MG_loadDB(); db.invoices.push(inv); await MG_saveDB(db);
}
async function MG_getInvoices() { return (await MG_loadDB()).invoices||[]; }

// ── GOOGLE GSI LOGIN
// Double-guard : fonctionne peu importe l'ordre DOMContentLoaded vs onGoogleLibraryLoad.
// Cas 1 : GSI charge avant MG_googleLogin() → _gsiReady=true, init au moment de l'appel
// Cas 2 : MG_googleLogin() appelé avant GSI → _gsiCb stocké, init dans onGoogleLibraryLoad
// _mgLoginCb défini sur window par MG_googleLogin()

// MG_handleCredential — appelé par le SDK Google via data-callback="MG_handleCredential"
// Méthode déclarative : Google rend le bouton automatiquement via <div class="g_id_signin">
// ── JWT DECODE — décode le token Google credential
function MG_decodeJWT(token) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64 + '=='.slice(0, (4 - base64.length % 4) % 4);
    const json = decodeURIComponent(
      atob(padded).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join('')
    );
    return JSON.parse(json);
  } catch(e) { console.error('JWT decode error:', e); return null; }
}

async function MG_handleCredential(response) {
  const payload = MG_decodeJWT(response.credential);
  if (!payload) { alert('Erreur Google. Réessayez.'); return; }
  const uid = 'g_' + payload.sub;
  const user = await MG_upsertUser(uid, { name: payload.name, email: payload.email });
  MG_setSession({ uid, email: payload.email });
  if (window._mgLoginCb) window._mgLoginCb(user);
}

// MG_googleLogin — définit le callback appelé après connexion réussie
function MG_googleLogin(cb) { window._mgLoginCb = cb; }

function onGoogleLibraryLoad() {} // conservé pour compatibilité
function _MG_initGSI() {}         // conservé pour compatibilité

function _MG_renderButtons() {
  // Double rAF + fallback 300ms pour garantir que le layout est calculé
  // avant que Google mesure le conteneur (offsetWidth > 0 requis)
  function tryRender(attempt) {
    ['_gsi_btn', '_gsi_emp'].forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      // Si le div est visible et a une largeur, on peut rendre
      if (el.offsetWidth > 0) {
        el.innerHTML = '';
        try {
          google.accounts.id.renderButton(el, {
            theme: 'filled_black', size: 'large',
            text: 'continue_with', shape: 'rectangular',
            width: Math.min(320, el.offsetWidth || 320), locale: 'fr'
          });
        } catch(e) { console.warn('GSI renderButton error:', e); }
      } else if (attempt < 5) {
        // Réessayer jusqu'à 5 fois avec délai croissant
        setTimeout(() => tryRender(attempt + 1), 100 * attempt);
      }
    });
  }
  requestAnimationFrame(() => requestAnimationFrame(() => tryRender(1)));
}

// ── TOAST
function MG_toast(title,msg,type='gold'){
  const el=document.getElementById('toast'); if(!el) return;
  const c={gold:'var(--gold)',red:'#e74c3c',green:'#3d8c6e',blue:'#5865F2'};
  el.style.borderLeftColor=c[type]||c.gold;
  document.getElementById('toastTitle').textContent=title;
  document.getElementById('toastMsg').textContent=msg;
  el.classList.add('show'); clearTimeout(el._t);
  el._t=setTimeout(()=>el.classList.remove('show'),3800);
}
