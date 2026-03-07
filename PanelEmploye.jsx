// src/pages/PanelEmploye.jsx
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { searchCharacterByName, activateLoyaltyCard, addLoyaltyPoints, getContracts, activateContract, getLoyaltyLevel } from '../firebase/services';
import { Search, Shield, Plus, Minus, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import './Panel.css';

const PanelEmploye = () => {
  const { profile } = useAuth();

  if (!profile || (profile.role !== 'employee' && profile.role !== 'admin')) {
    return (
      <div className="page-layout panel-access-denied">
        <div className="container" style={{ paddingTop: 100, textAlign: 'center' }}>
          <Shield size={48} style={{ color: '#e74c3c', marginBottom: 16 }} />
          <h2>Accès refusé</h2>
          <p style={{ color: 'var(--text-muted)', marginTop: 8 }}>Vous n'avez pas les droits pour accéder au panel employé.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="panel page-layout">
      <div className="page-hero">
        <div className="container">
          <p className="section-label">// PANEL EMPLOYÉ</p>
          <h1 className="page-title">Gestion personnages</h1>
        </div>
      </div>
      <div className="container section">
        <CharacterSearch />
      </div>
    </div>
  );
};

const CharacterSearch = () => {
  const { profile } = useAuth();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [selected, setSelected] = useState(null);
  const [contracts, setContracts] = useState([]);
  const [message, setMessage] = useState({ type: '', text: '' });

  const showMsg = (type, text) => { setMessage({ type, text }); setTimeout(() => setMessage({ type: '', text: '' }), 4000); };

  const handleSearch = async () => {
    if (!query.trim()) return;
    setSearching(true); setResults([]); setSelected(null);
    const parts = query.trim().split(' ');
    const first = parts[0] || '';
    const last = parts.slice(1).join(' ') || parts[0];
    const data = await searchCharacterByName(first, last);
    setResults(data); setSearching(false);
  };

  const handleSelect = async (char) => {
    setSelected(char);
    const c = await getContracts();
    setContracts(c);
  };

  const handleActivateLoyalty = async () => {
    try {
      await activateLoyaltyCard(selected.userUid, selected.id, profile.uid);
      showMsg('success', 'Carte de fidélité activée !');
      setSelected(prev => ({ ...prev, loyaltyCard: { ...prev.loyaltyCard, active: true } }));
    } catch (e) { showMsg('error', 'Erreur lors de l\'activation.'); }
  };

  const [pointsDelta, setPointsDelta] = useState(0);
  const handlePoints = async (add) => {
    if (!pointsDelta || pointsDelta <= 0) return;
    try {
      await addLoyaltyPoints(selected.userUid, selected.id, add ? pointsDelta : -pointsDelta);
      showMsg('success', `${add ? '+' : '-'}${pointsDelta} points appliqués.`);
      const newPts = Math.max(0, (selected.loyaltyCard?.points || 0) + (add ? pointsDelta : -pointsDelta));
      setSelected(prev => ({ ...prev, loyaltyCard: { ...prev.loyaltyCard, points: newPts, level: getLoyaltyLevel(newPts) } }));
    } catch (e) { showMsg('error', 'Erreur.'); }
  };

  const [selectedContract, setSelectedContract] = useState('');
  const [contractDuration, setContractDuration] = useState(1);
  const handleActivateContract = async () => {
    if (!selectedContract) return;
    const contract = contracts.find(c => c.id === selectedContract);
    if (!contract) return;
    try {
      await activateContract(selected.userUid, selected.id, contract.id, contract.name, parseInt(contractDuration), profile.uid);
      showMsg('success', `Contrat "${contract.name}" activé pour ${contractDuration} mois.`);
    } catch (e) { showMsg('error', 'Erreur lors de l\'activation.'); }
  };

  return (
    <div>
      <div className="panel-search-bar">
        <input
          value={query} onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSearch()}
          placeholder="Rechercher par prénom / nom RP..."
          className="panel-search-input"
        />
        <button className="btn btn-gold" onClick={handleSearch} disabled={searching}>
          {searching ? <div className="spinner" style={{ width: 16, height: 16 }} /> : <><Search size={15} /> Rechercher</>}
        </button>
      </div>

      {message.text && (
        <div className={`panel-msg ${message.type}`}>
          {message.type === 'success' ? <CheckCircle size={14} /> : <AlertCircle size={14} />}
          {message.text}
        </div>
      )}

      {results.length > 0 && !selected && (
        <div className="results-list">
          {results.map((r, i) => (
            <button key={i} className="result-item" onClick={() => handleSelect(r)}>
              <div className="result-avatar">{r.firstNameRP?.[0]}{r.lastNameRP?.[0]}</div>
              <div>
                <div className="result-name">{r.firstNameRP} {r.lastNameRP}</div>
                <div className="result-meta">Compte: {r.userPseudo}</div>
              </div>
            </button>
          ))}
        </div>
      )}

      {searching === false && results.length === 0 && query && (
        <div className="empty-state"><p>Aucun personnage trouvé.</p></div>
      )}

      {selected && (
        <div className="selected-char anim-fade-up">
          <div className="selected-header">
            <div className="char-avatar" style={{ width: 52, height: 52, fontSize: 16 }}>{selected.firstNameRP?.[0]}{selected.lastNameRP?.[0]}</div>
            <div>
              <h2 className="selected-name">{selected.firstNameRP} {selected.lastNameRP}</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>Compte: <strong style={{ color: 'var(--text-secondary)' }}>{selected.userPseudo}</strong></p>
            </div>
            <button className="btn btn-ghost" onClick={() => setSelected(null)} style={{ marginLeft: 'auto' }}>← Retour</button>
          </div>

          <div className="panel-actions-grid">
            {/* Fidélité */}
            <div className="panel-action-card card">
              <h3 className="panel-action-title"><Shield size={16} /> Carte de fidélité</h3>
              {!selected.loyaltyCard?.active ? (
                <div>
                  <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16 }}>La carte n'est pas encore activée.</p>
                  <button className="btn btn-gold" onClick={handleActivateLoyalty}>Activer la carte</button>
                </div>
              ) : (
                <div>
                  <div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
                    <div className="char-stat">
                      <span className="char-stat-label">Points</span>
                      <span className="char-stat-value">{(selected.loyaltyCard.points || 0).toLocaleString()}</span>
                    </div>
                    <div className="char-stat">
                      <span className="char-stat-label">Niveau</span>
                      <span className="char-stat-value" style={{ fontSize: 16 }}>{selected.loyaltyCard.level}</span>
                    </div>
                  </div>
                  <div className="points-form">
                    <input type="number" min="1" value={pointsDelta || ''} onChange={e => setPointsDelta(parseInt(e.target.value) || 0)} placeholder="Points" style={{ width: 120 }} />
                    <button className="btn btn-gold" onClick={() => handlePoints(true)}><Plus size={14} /> Ajouter</button>
                    <button className="btn btn-danger" onClick={() => handlePoints(false)}><Minus size={14} /> Retirer</button>
                  </div>
                </div>
              )}
            </div>

            {/* Contrats */}
            <div className="panel-action-card card">
              <h3 className="panel-action-title"><Clock size={16} /> Activer un contrat</h3>
              <div className="contract-form">
                <select value={selectedContract} onChange={e => setSelectedContract(e.target.value)}>
                  <option value="">-- Sélectionner un contrat --</option>
                  {contracts.map(c => <option key={c.id} value={c.id}>{c.name} ({c.priceMonthly}$/m)</option>)}
                </select>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <label style={{ fontSize: 13, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>Durée (mois):</label>
                  <input type="number" min="1" max="12" value={contractDuration} onChange={e => setContractDuration(e.target.value)} style={{ width: 80 }} />
                </div>
                <button className="btn btn-gold" onClick={handleActivateContract} disabled={!selectedContract}>
                  <CheckCircle size={14} /> Activer le contrat
                </button>
              </div>
              {selected.contracts?.filter(c => c.status === 'active').length > 0 && (
                <div style={{ marginTop: 16 }}>
                  <p className="settings-label" style={{ marginBottom: 8 }}>Contrats actifs</p>
                  {selected.contracts.filter(c => c.status === 'active').map((c, i) => (
                    <div key={i} className="contract-timer" style={{ marginBottom: 8 }}>
                      <span>{c.contractName}</span>
                      <span style={{ fontSize: 11, color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>
                        Expire le {c.expiresAt?.toDate?.()?.toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PanelEmploye;
