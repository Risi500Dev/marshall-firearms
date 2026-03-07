# Marshall Corporation — Site Web

## Stack Technique
- **React 18** (Create React App)
- **Firebase** (Auth + Firestore)
- **React Router v6**

---

## 🚀 Installation

### 1. Cloner et installer les dépendances

```bash
cd marshall
npm install
```

### 2. Configurer Firebase

1. Créez un projet sur [Firebase Console](https://console.firebase.google.com)
2. Activez **Authentication > Google**
3. Activez **Firestore Database**
4. Copiez votre config dans `src/firebase/config.js` :

```js
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
};
```

### 3. Déployer les règles Firestore

```bash
firebase deploy --only firestore:rules
```

### 4. Lancer en développement

```bash
npm start
```

---

## 📁 Structure du projet

```
src/
├── firebase/
│   ├── config.js          # Config Firebase (à personnaliser)
│   ├── services.js        # Toutes les fonctions Firestore
│   └── schema.js          # Documentation du schéma Firestore
├── contexts/
│   └── AuthContext.jsx    # Contexte d'authentification global
├── components/
│   ├── Navbar.jsx / .css
│   └── Footer.jsx / .css
├── pages/
│   ├── Home.jsx / .css       # Page d'accueil + stats
│   ├── Armurerie.jsx / .css  # Catalogue + contrats + fidélité
│   ├── Securite.jsx / .css   # Page "en développement"
│   ├── Boutiques.jsx / .css  # Liste des boutiques
│   ├── Compte.jsx / .css     # Dashboard utilisateur
│   ├── PanelEmploye.jsx      # Panel employé
│   ├── PanelAdmin.jsx        # Panel admin
│   └── Panel.css
└── styles/
    └── globals.css           # Design system Marshall
```

---

## 🔒 Système de rôles

| Rôle       | Accès                                              |
|------------|---------------------------------------------------|
| `user`     | Compte personnel, personnages, commandes           |
| `employee` | Panel employé + droits user                        |
| `admin`    | Panel admin + panel employé + tous les droits      |

**L'email `william.lautrec92enc.off@gmail.com` est automatiquement admin à la 1ère connexion.**

---

## 🗂 Schéma Firestore

```
users/{uid}
  ├── pseudo, email, role, createdAt
  └── characters/{charId}
        ├── firstNameRP, lastNameRP
        ├── loyaltyCard: { active, points, level, activatedAt }
        └── contracts: [{ contractId, status, activatedAt, expiresAt, durationMonths }]

contracts/{id}       — name, priceMonthly, benefits[], discordLink
shops/{id}           — name, description, location
products/{id}        — name, category, price, inStock
orders/{id}          — userUid, characterId, type, itemName, date, status
employees/{uid}      — uid, email, pseudo
admins/{email}       — email, uid
```

---

## ⚙️ Fonctionnalités

### Page Accueil
- Hero avec animation grid + scanline
- Devise **ARMEMENT. ÉLITE.**
- Statistiques avec compteur animé (CountUp au scroll)
- Présentation des 2 divisions

### Armurerie
- Catalogue filtrable par catégorie (placeholder produits inclus)
- Contrats mensuels avec lien Discord
- Programme fidélité 4 niveaux : Bronze → Argent → Or → Platinium

### Mon Compte
- Auth Google Firebase
- Setup pseudo unique à la 1ère connexion
- Jusqu'à **8 personnages** indépendants
- Timer en temps réel pour les contrats actifs
- Historique des commandes
- Paramètres compte

### Panel Employé
- Recherche de personnage par prénom/nom RP
- Activation carte de fidélité
- Ajout/retrait de points
- Activation de contrat avec durée 1–12 mois

### Panel Admin
- Vue de tous les comptes
- Gestion des employés (ajouter/retirer)
- Gestion des boutiques (CRUD complet)

---

## 🎨 Design

Police display : **Rajdhani**  
Police body : **Barlow Condensed**  
Police mono : **Share Tech Mono**

Palette : fond noir charcoal `#080a0c`, accent or `#c8a96e`, accents rouge danger.

---

## 📌 À faire / Extensions possibles

- [ ] Remplir les vrais produits Firebase
- [ ] Ajouter de vrais contrats dans Firestore
- [ ] Système de paiement (Stripe)
- [ ] Notifications en temps réel
- [ ] Panel admin : gestion des contrats disponibles
- [ ] Upload d'images produits (Firebase Storage)
