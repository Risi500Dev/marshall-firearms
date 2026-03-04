# Configuration JSONBin.io — Marshall Group

## Pourquoi JSONBin ?
localStorage = données stockées dans UN SEUL navigateur.
JSONBin = base de données cloud gratuite accessible depuis n'importe quel appareil.

## Étapes (5 minutes)

### 1. Créer un compte
→ https://jsonbin.io
→ Sign Up (gratuit)

### 2. Créer un Bin
→ Dashboard → "CREATE BIN"
→ Coller ce JSON de départ :
{
  "users": {},
  "employees": ["william.lautrec92enc.off@gmail.com"],
  "invoices": []
}
→ Mettre "Private" ON
→ Cliquer "CREATE"
→ Copier le BIN ID (ex: 65f3a8b2e41b4d34e8123456)

### 3. Récupérer la Master Key
→ Dashboard → Account Settings → API Keys
→ Copier la "Master Key" (commence par $2b$...)

### 4. Configurer mg_data.js
Ouvrir mg_data.js et remplir :

const MG_BIN_ID  = 'TON_BIN_ID_ICI';
const MG_BIN_KEY = 'TA_MASTER_KEY_ICI';

### 5. Redéployer sur Netlify
Uploader les fichiers mis à jour → le site fonctionnera pour TOUS les utilisateurs.

## Résultat
- Comptes partagés entre tous les navigateurs/appareils
- Employés ajoutés depuis le panel admin → effectifs immédiatement
- Factures/contrats/points visibles par tous les employés
