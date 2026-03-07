// src/pages/Compte.jsx
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getCharacters, createCharacter, deleteCharacter, getUserOrders, checkExpiredContracts, getLoyaltyLevel, updateUserPseudo } from '../firebase/services';
import { User, Plus, Trash2, Package, Settings, Shield, Star, Clock, AlertCircle, CheckCircle, X } from 'lucide-react';
import './Compte.css';

const LEVEL_COLORS = { bronze: 'var(--bronze)', silver: 'var(--silver)', gold: 'var(--gold)', platinum: 'var(--platinum)' };
const LEVEL_NAMES = { bronze: 'Bronze', silver: 'Argent', gold: 'Or', platinum: 'Platinium' };

// ── LOGIN ────────────────────────────────────────────────────
const LoginView = () => {
  const { loginWithGoogle } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setLoading(true); setError('');
    try { await loginWithGoogle(); }
    catch (e) { setError('Connexion annulée ou échouée.'); }
    finally { setLoading(false); }
  };

  return (
    <div className="login-container">
      <div className="login-card card">
        <div className="login-logo">
          <Shield size={32} />
        </div>
        <h2 className="login-title">Connexion</h2>
        <p className="login-desc">Connectez-vous à votre espace Marshall avec votre compte Google.</p>
        {error && <div className="error-banner"><AlertCircle size={14} /> {error}</div>}
        <button className="btn btn-gold google-btn" onClick={handleLogin} disabled={loading}>
          {loading ? <div className="spinner" style={{ width: 18, height: 18 }} /> : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
          )}
          Continuer avec Google
        </button>
      </div>
    </div>
  );
};

// ── PSEUDO SETUP ─────────────────────────────────────────────
const PseudoSetup = () => {
  const { completeProfile } = useAuth();
  const [pseudo, setPseudo] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handle = async (e) => {
    e.preventDefault();
    if (pseudo.trim().length < 3) { setError('Le pseudo doit faire au moins 3 caractères.'); return; }
    setLoading(true); setError('');
    try { await completeProfile(pseudo.trim()); }
    catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  return (
    <div className="login-container">
      <div className="login-card card">
        <div className="login-logo"><User size={32} /></div>
        <h2 className="login-title">Choisir un pseudo</h2>
        <p className="login-desc">Bienvenue ! Choisissez un pseudo unique pour votre compte Marshall.</p>
        {error && <div className="error-banner"><AlertCircle size={14} /> {error}</div>}
        <form onSubmit={handle} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <input value={pseudo} onChange={e => setPseudo(e.target.value)} placeholder="Votre pseudo" maxLength={24} />
          <button type="submit" className="btn btn-gold" disabled={loading}>
            {loading ? <div className="spinner" style={{ width: 18, height: 18 }} /> : 'Confirmer'}
          </button>
        </form>
      </div>
    </div>
  );
};

// ── CHARACTERS TAB ───────────────────────────────────────────
const CharactersTab = ({ uid }) => {
  const [chars, setChars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ first: '', last: '' });
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    const data = await getCharacters(uid);
    // Check expired contracts for each character
    for (const c of data) { await checkExpiredContracts(uid, c.id); }
    const refreshed = await getCharacters(uid);
    setChars(refreshed);
    setLoading(false);
  };

  useEffect(() => { load(); }, [uid]);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!form.first.trim() || !form.last.trim()) { setError('Prénom et nom requis.'); return; }
    if (chars.length >= 8) { setError('Maximum 8 personnages atteint.'); return; }
    setCreating(true); setError('');
    try { await createCharacter(uid, form.first.trim(), form.last.trim()); setShowForm(false); setForm({ first: '', last: '' }); load(); }
    catch (e) { setError('Erreur lors de la création.'); }
    finally { setCreating(false); }
  };

  const handleDelete = async (charId) => {
    if (!window.confirm('Supprimer ce personnage ?')) return;
    await deleteCharacter(uid, charId);
    load();
  };

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}><div className="spinner" /></div>;

  return (
    <div>
      <div className="tab-header">
        <div>
          <h2 className="tab-title">Mes personnages</h2>
          <p className="tab-subtitle">{chars.length}/8 personnages créés</p>
        </div>
        {chars.length < 8 && (
          <button className="btn btn-gold" onClick={() => setShowForm(!showForm)}>
            <Plus size={15} /> Nouveau personnage
          </button>
        )}
      </div>

      {showForm && (
        <div className="card create-form anim-fade-up">
          <h3 style={{ marginBottom: 16, fontSize: 17 }}>Nouveau personnage</h3>
          {error && <div className="error-banner"><AlertCircle size={14} /> {error}</div>}
          <form onSubmit={handleCreate} className="form-row">
            <input value={form.first} onChange={e => setForm(f => ({ ...f, first: e.target.value }))} placeholder="Prénom RP" />
            <input value={form.last} onChange={e => setForm(f => ({ ...f, last: e.target.value }))} placeholder="Nom RP" />
            <button type="submit" className="btn btn-gold" disabled={creating}>
              {creating ? <div className="spinner" style={{ width: 16, height: 16 }} /> : 'Créer'}
            </button>
            <button type="button" className="btn btn-ghost" onClick={() => setShowForm(false)}><X size={14} /></button>
          </form>
        </div>
      )}

      {chars.length === 0 ? (
        <div className="empty-state"><User size={32} style={{ marginBottom: 12, opacity: 0.3 }} /><p>Aucun personnage créé.</p></div>
      ) : (
        <div className="chars-grid">
          {chars.map(char => <CharacterCard key={char.id} char={char} onDelete={() => handleDelete(char.id)} />)}
        </div>
      )}
    </div>
  );
};

const CharacterCard = ({ char, onDelete }) => {
  const loyalty = char.loyaltyCard;
  const level = loyalty?.level || 'bronze';
  const activeContracts = (char.contracts || []).filter(c => c.status === 'active');
  const expiredContracts = (char.contracts || []).filter(c => c.status === 'expired');

  return (
    <div className="char-card card">
      <div className="char-header">
        <div className="char-avatar">{char.firstNameRP?.[0]}{char.lastNameRP?.[0]}</div>
        <div className="char-info">
          <h3 className="char-name">{char.firstNameRP} {char.lastNameRP}</h3>
          <div className="char-meta">
            {loyalty?.active ? (
              <span style={{ color: LEVEL_COLORS[level], fontSize: 12, fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>
                ★ {LEVEL_NAMES[level]}
              </span>
            ) : (
              <span className="tag">Carte inactive</span>
            )}
          </div>
        </div>
        <button className="btn btn-ghost char-delete" onClick={onDelete}><Trash2 size={14} /></button>
      </div>

      <div className="char-stats">
        <div className="char-stat">
          <span className="char-stat-label">Points fidélité</span>
          <span className="char-stat-value" style={{ color: loyalty?.active ? LEVEL_COLORS[level] : 'var(--text-muted)' }}>
            {loyalty?.active ? (loyalty.points || 0).toLocaleString() : '—'}
          </span>
        </div>
        <div className="char-stat">
          <span className="char-stat-label">Contrats actifs</span>
          <span className="char-stat-value">{activeContracts.length}</span>
        </div>
        <div className="char-stat">
          <span className="char-stat-label">Contrats expirés</span>
          <span className="char-stat-value" style={{ color: expiredContracts.length > 0 ? '#e74c3c' : 'inherit' }}>{expiredContracts.length}</span>
        </div>
      </div>

      {activeContracts.length > 0 && (
        <div className="char-contracts">
          {activeContracts.map((c, i) => (
            <ContractTimer key={i} contract={c} />
          ))}
        </div>
      )}
    </div>
  );
};

const ContractTimer = ({ contract }) => {
  const [remaining, setRemaining] = useState('');
  useEffect(() => {
    const update = () => {
      const now = Date.now();
      const exp = contract.expiresAt?.toMillis?.() || 0;
      const diff = exp - now;
      if (diff <= 0) { setRemaining('Expiré'); return; }
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      setRemaining(`${d}j ${h}h ${m}m`);
    };
    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, [contract]);

  return (
    <div className="contract-timer">
      <div className="contract-timer-name">{contract.contractName}</div>
      <div className="contract-timer-remain">
        <Clock size={10} /> {remaining}
      </div>
    </div>
  );
};

// ── ORDERS TAB ───────────────────────────────────────────────
const OrdersTab = ({ uid }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserOrders(uid).then(data => { setOrders(data); setLoading(false); }).catch(() => setLoading(false));
  }, [uid]);

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}><div className="spinner" /></div>;

  return (
    <div>
      <div className="tab-header">
        <div>
          <h2 className="tab-title">Historique des commandes</h2>
          <p className="tab-subtitle">{orders.length} commande(s)</p>
        </div>
      </div>
      {orders.length === 0 ? (
        <div className="empty-state"><Package size={32} style={{ marginBottom: 12, opacity: 0.3 }} /><p>Aucune commande pour le moment.</p></div>
      ) : (
        <div className="orders-table">
          <div className="orders-header">
            <span>Personnage</span><span>Produit / Contrat</span><span>Date</span><span>Statut</span>
          </div>
          {orders.map(order => (
            <div key={order.id} className="order-row">
              <span className="order-char">{order.characterName || '—'}</span>
              <span>{order.itemName}</span>
              <span className="order-date">{order.date?.toDate?.()?.toLocaleDateString('fr-FR') || '—'}</span>
              <span><span className={`badge badge-${order.status === 'completed' ? 'active' : order.status === 'cancelled' ? 'expired' : 'pending'}`}>{order.status}</span></span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ── SETTINGS TAB ─────────────────────────────────────────────
const SettingsTab = ({ profile, onRefresh }) => {
  const { user, logout } = useAuth();
  const [pseudo, setPseudo] = useState(profile?.pseudo || '');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async () => {
    if (pseudo.trim().length < 3) { setError('Le pseudo doit faire au moins 3 caractères.'); return; }
    setSaving(true); setError('');
    try {
      await updateUserPseudo(profile.uid, pseudo.trim());
      setSaved(true); setTimeout(() => setSaved(false), 3000);
      onRefresh();
    } catch (e) { setError('Erreur lors de la sauvegarde.'); }
    finally { setSaving(false); }
  };

  return (
    <div>
      <div className="tab-header">
        <h2 className="tab-title">Paramètres du compte</h2>
      </div>
      <div style={{ maxWidth: 500, display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div className="settings-group">
          <label className="settings-label">Pseudo</label>
          <input value={pseudo} onChange={e => setPseudo(e.target.value)} maxLength={24} />
          {error && <p className="settings-error">{error}</p>}
          <button className="btn btn-gold" onClick={handleSave} disabled={saving} style={{ alignSelf: 'flex-start', marginTop: 8 }}>
            {saving ? <div className="spinner" style={{ width: 16, height: 16 }} /> : saved ? <><CheckCircle size={14} /> Sauvegardé</> : 'Sauvegarder'}
          </button>
        </div>
        <div className="settings-group">
          <label className="settings-label">Email</label>
          <input value={user?.email || ''} disabled style={{ opacity: 0.6 }} />
          <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>L'email est géré par votre compte Google.</p>
        </div>
        <div className="settings-group settings-danger">
          <label className="settings-label">Zone de danger</label>
          <button className="btn btn-danger" onClick={logout} style={{ alignSelf: 'flex-start' }}>
            Se déconnecter
          </button>
        </div>
      </div>
    </div>
  );
};

// ── MAIN COMPTE PAGE ─────────────────────────────────────────
const Compte = () => {
  const { user, profile, loading, needsPseudo, refreshProfile } = useAuth();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'characters');

  if (loading) return <div className="page-loader"><div className="spinner" /></div>;
  if (!user) return <LoginView />;
  if (needsPseudo) return <PseudoSetup />;

  const tabs = [
    { id: 'characters', label: 'Personnages', icon: <User size={15} /> },
    { id: 'orders', label: 'Commandes', icon: <Package size={15} /> },
    { id: 'settings', label: 'Paramètres', icon: <Settings size={15} /> },
  ];

  return (
    <div className="compte page-layout">
      <div className="page-hero">
        <div className="container">
          <p className="section-label">// MON ESPACE</p>
          <h1 className="page-title">Bienvenue, {profile?.pseudo}</h1>
          <div style={{ display: 'flex', gap: 12, marginTop: 8, flexWrap: 'wrap' }}>
            <span className="tag">{profile?.email}</span>
            <span className="tag" style={{ color: profile?.role === 'admin' ? 'var(--accent)' : 'inherit' }}>
              {profile?.role === 'admin' ? '★ Admin' : profile?.role === 'employee' ? '⬡ Employé' : 'Membre'}
            </span>
          </div>
        </div>
      </div>
      <div className="tabs-bar">
        <div className="container">
          <div className="tabs">
            {tabs.map(tab => (
              <button key={tab.id} className={`tab ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id)}>
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="container section">
        {activeTab === 'characters' && <CharactersTab uid={profile.uid} />}
        {activeTab === 'orders' && <OrdersTab uid={profile.uid} />}
        {activeTab === 'settings' && <SettingsTab profile={profile} onRefresh={refreshProfile} />}
      </div>
    </div>
  );
};

export default Compte;
