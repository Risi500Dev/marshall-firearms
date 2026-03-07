// src/pages/PanelAdmin.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getAllUsers, getEmployees, addEmployee, removeEmployee, getShops, addShop, updateShop, deleteShop } from '../firebase/services';
import { Users, Briefcase, Store, Plus, Trash2, Edit, CheckCircle, AlertCircle, X, Save } from 'lucide-react';
import './Panel.css';

const ADMIN_EMAIL = 'william.lautrec92enc.off@gmail.com';

const PanelAdmin = () => {
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState('users');

  if (!profile || profile.role !== 'admin') {
    return (
      <div className="page-layout panel-access-denied">
        <div className="container" style={{ paddingTop: 100, textAlign: 'center' }}>
          <h2>Accès refusé</h2>
          <p style={{ color: 'var(--text-muted)', marginTop: 8 }}>Accès réservé aux administrateurs.</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'users', label: 'Comptes', icon: <Users size={14} /> },
    { id: 'employees', label: 'Employés', icon: <Briefcase size={14} /> },
    { id: 'shops', label: 'Boutiques', icon: <Store size={14} /> },
  ];

  return (
    <div className="panel page-layout">
      <div className="page-hero">
        <div className="container">
          <p className="section-label">// PANEL ADMIN</p>
          <h1 className="page-title">Administration</h1>
          <p className="page-subtitle">Accès réservé — {profile.email}</p>
        </div>
      </div>
      <div className="tabs-bar">
        <div className="container">
          <div className="tabs">
            {tabs.map(t => (
              <button key={t.id} className={`tab ${activeTab === t.id ? 'active' : ''}`} onClick={() => setActiveTab(t.id)}>
                {t.icon} {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="container section">
        {activeTab === 'users' && <UsersTab />}
        {activeTab === 'employees' && <EmployeesTab adminUid={profile.uid} />}
        {activeTab === 'shops' && <ShopsTab />}
      </div>
    </div>
  );
};

// USERS
const UsersTab = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { getAllUsers().then(d => { setUsers(d); setLoading(false); }); }, []);

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}><div className="spinner" /></div>;

  return (
    <div>
      <div className="tab-header">
        <div><h2 className="tab-title">Tous les comptes</h2><p className="tab-subtitle">{users.length} compte(s)</p></div>
      </div>
      <div className="admin-table">
        <div className="admin-table-header"><span>Pseudo</span><span>Email</span><span>Rôle</span><span>Créé le</span></div>
        {users.map(u => (
          <div key={u.id} className="admin-table-row">
            <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{u.pseudo}</span>
            <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>{u.email}</span>
            <span>
              <span className={`badge ${u.role === 'admin' ? 'badge-pending' : u.role === 'employee' ? 'badge-active' : ''}`} style={!u.role || u.role === 'user' ? { background: 'var(--bg-elevated)', color: 'var(--text-muted)', border: '1px solid var(--border)' } : {}}>
                {u.role || 'user'}
              </span>
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-muted)' }}>
              {u.createdAt?.toDate?.()?.toLocaleDateString('fr-FR') || '—'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// EMPLOYEES
const EmployeesTab = ({ adminUid }) => {
  const [employees, setEmployees] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [selectedUid, setSelectedUid] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });

  const showMsg = (type, text) => { setMessage({ type, text }); setTimeout(() => setMessage({ type: '', text: '' }), 4000); };

  const load = async () => {
    setLoading(true);
    const [emp, users] = await Promise.all([getEmployees(), getAllUsers()]);
    setEmployees(emp); setAllUsers(users); setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const handleAdd = async () => {
    if (!selectedUid) return;
    const user = allUsers.find(u => u.uid === selectedUid);
    if (!user) return;
    try {
      await addEmployee(selectedUid, user.email, user.pseudo, adminUid);
      showMsg('success', `${user.pseudo} est maintenant employé.`);
      setShowAdd(false); setSelectedUid(''); load();
    } catch (e) { showMsg('error', 'Erreur.'); }
  };

  const handleRemove = async (uid, pseudo) => {
    if (!window.confirm(`Retirer ${pseudo} des employés ?`)) return;
    await removeEmployee(uid);
    showMsg('success', `${pseudo} retiré.`); load();
  };

  const nonEmployees = allUsers.filter(u => u.role !== 'employee' && u.role !== 'admin' && u.email !== ADMIN_EMAIL);

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}><div className="spinner" /></div>;

  return (
    <div>
      <div className="tab-header">
        <div><h2 className="tab-title">Employés</h2><p className="tab-subtitle">{employees.length} employé(s)</p></div>
        <button className="btn btn-gold" onClick={() => setShowAdd(!showAdd)}><Plus size={15} /> Ajouter un employé</button>
      </div>

      {message.text && (
        <div className={`panel-msg ${message.type}`}>
          {message.type === 'success' ? <CheckCircle size={14} /> : <AlertCircle size={14} />}
          {message.text}
        </div>
      )}

      {showAdd && (
        <div className="card create-form anim-fade-up" style={{ marginBottom: 24 }}>
          <h3 style={{ marginBottom: 16, fontSize: 17 }}>Ajouter un employé</h3>
          <div className="form-row">
            <select value={selectedUid} onChange={e => setSelectedUid(e.target.value)}>
              <option value="">-- Sélectionner un compte --</option>
              {nonEmployees.map(u => <option key={u.uid} value={u.uid}>{u.pseudo} ({u.email})</option>)}
            </select>
            <button className="btn btn-gold" onClick={handleAdd} disabled={!selectedUid}>Confirmer</button>
            <button className="btn btn-ghost" onClick={() => setShowAdd(false)}><X size={14} /></button>
          </div>
        </div>
      )}

      {employees.length === 0 ? (
        <div className="empty-state"><p>Aucun employé enregistré.</p></div>
      ) : (
        <div className="admin-table">
          <div className="admin-table-header"><span>Pseudo</span><span>Email</span><span>Ajouté le</span><span>Actions</span></div>
          {employees.map(e => (
            <div key={e.id} className="admin-table-row">
              <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{e.pseudo}</span>
              <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>{e.email}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-muted)' }}>{e.addedAt?.toDate?.()?.toLocaleDateString('fr-FR') || '—'}</span>
              <span>
                {e.email !== ADMIN_EMAIL && (
                  <button className="btn btn-danger" style={{ padding: '4px 12px', fontSize: 12 }} onClick={() => handleRemove(e.uid, e.pseudo)}>
                    <Trash2 size={12} /> Retirer
                  </button>
                )}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// SHOPS
const ShopsTab = () => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', description: '', location: '' });
  const [message, setMessage] = useState({ type: '', text: '' });

  const showMsg = (type, text) => { setMessage({ type, text }); setTimeout(() => setMessage({ type: '', text: '' }), 4000); };
  const load = () => { setLoading(true); getShops().then(d => { setShops(d); setLoading(false); }); };
  useEffect(() => { load(); }, []);

  const handleAdd = async () => {
    if (!form.name || !form.location) return;
    await addShop(form.name, form.description, form.location);
    showMsg('success', 'Boutique ajoutée.'); setShowAdd(false); setForm({ name: '', description: '', location: '' }); load();
  };

  const handleUpdate = async () => {
    if (!editing) return;
    await updateShop(editing.id, { name: form.name, description: form.description, location: form.location });
    showMsg('success', 'Boutique mise à jour.'); setEditing(null); setForm({ name: '', description: '', location: '' }); load();
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Supprimer "${name}" ?`)) return;
    await deleteShop(id); showMsg('success', 'Boutique supprimée.'); load();
  };

  const startEdit = (shop) => { setEditing(shop); setForm({ name: shop.name, description: shop.description, location: shop.location }); setShowAdd(false); };

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}><div className="spinner" /></div>;

  return (
    <div>
      <div className="tab-header">
        <div><h2 className="tab-title">Boutiques</h2><p className="tab-subtitle">{shops.length} boutique(s)</p></div>
        <button className="btn btn-gold" onClick={() => { setShowAdd(true); setEditing(null); setForm({ name: '', description: '', location: '' }); }}>
          <Plus size={15} /> Ajouter
        </button>
      </div>

      {message.text && (
        <div className={`panel-msg ${message.type}`}>
          {message.type === 'success' ? <CheckCircle size={14} /> : <AlertCircle size={14} />}
          {message.text}
        </div>
      )}

      {(showAdd || editing) && (
        <div className="card create-form anim-fade-up" style={{ marginBottom: 24 }}>
          <h3 style={{ marginBottom: 16, fontSize: 17 }}>{editing ? 'Modifier la boutique' : 'Nouvelle boutique'}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Nom de la boutique" />
            <input value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Description" />
            <input value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} placeholder="Localisation" />
            <div style={{ display: 'flex', gap: 12 }}>
              <button className="btn btn-gold" onClick={editing ? handleUpdate : handleAdd}><Save size={14} /> {editing ? 'Mettre à jour' : 'Ajouter'}</button>
              <button className="btn btn-ghost" onClick={() => { setShowAdd(false); setEditing(null); }}><X size={14} /></button>
            </div>
          </div>
        </div>
      )}

      <div className="admin-table">
        <div className="admin-table-header"><span>Nom</span><span>Description</span><span>Localisation</span><span>Actions</span></div>
        {shops.map(shop => (
          <div key={shop.id} className="admin-table-row">
            <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{shop.name}</span>
            <span style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{shop.description}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--accent)' }}>{shop.location}</span>
            <span style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-outline" style={{ padding: '4px 10px', fontSize: 12 }} onClick={() => startEdit(shop)}><Edit size={12} /></button>
              <button className="btn btn-danger" style={{ padding: '4px 10px', fontSize: 12 }} onClick={() => handleDelete(shop.id, shop.name)}><Trash2 size={12} /></button>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PanelAdmin;
