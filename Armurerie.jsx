// src/pages/Armurerie.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Filter, ExternalLink, Crown, Award, Medal, Star, ChevronRight, ShoppingBag } from 'lucide-react';
import { getContracts } from '../firebase/services';
import './Armurerie.css';

// Placeholder products
const PRODUCTS = [
  { id: 1, name: 'M1911 Tactical', category: 'Armes de poing', price: 2400, desc: 'Pistolet semi-automatique .45 ACP, finition noire mat', inStock: true },
  { id: 2, name: 'Glock 17 Gen5', category: 'Armes de poing', price: 1850, desc: 'Pistolet polymère 9mm, capacité 17+1', inStock: true },
  { id: 3, name: 'Beretta 92FS', category: 'Armes de poing', price: 1650, desc: 'Pistolet double-action 9mm, canonique', inStock: false },
  { id: 4, name: 'AR-15 Carbine', category: 'Armes longues', price: 4200, desc: 'Carabine semi-automatique .223 Rem, rail Picatinny', inStock: true },
  { id: 5, name: 'AKM Polytech', category: 'Armes longues', price: 3800, desc: 'Carabine 7.62x39mm, crosse bois', inStock: true },
  { id: 6, name: 'Remington 870', category: 'Armes longues', price: 1200, desc: 'Fusil à pompe 12/70, canon 18"', inStock: true },
  { id: 7, name: 'Gilet pare-balles NIJ III', category: 'Équipements', price: 890, desc: 'Protection balistique niveau III, léger et modulable', inStock: true },
  { id: 8, name: 'Casque FAST Noir', category: 'Équipements', price: 650, desc: 'Casque balistique haute-résistance, rails NVG', inStock: true },
  { id: 9, name: 'Holster KYDEX', category: 'Équipements', price: 180, desc: 'Holster tactique thermoformé pour pistolets standard', inStock: true },
  { id: 10, name: '9mm FMJ 50rds', category: 'Munitions', price: 45, desc: 'Munitions 9mm full metal jacket, boîte 50', inStock: true },
  { id: 11, name: '.45 ACP HP 25rds', category: 'Munitions', price: 62, desc: 'Munitions .45 ACP hollow-point défense, boîte 25', inStock: true },
  { id: 12, name: '12/70 Slug 10rds', category: 'Munitions', price: 38, desc: 'Cartouches 12/70 à balle, boîte 10', inStock: true },
];

const CATEGORIES = ['Tous', 'Armes de poing', 'Armes longues', 'Équipements', 'Munitions'];

const LOYALTY_LEVELS = [
  { name: 'Bronze', min: 0, max: 999, color: 'var(--bronze)', icon: <Medal size={20} />, benefits: ['Accès catalogue standard', 'Newsletter exclusive', '— Avantage à venir —'] },
  { name: 'Argent', min: 1000, max: 4999, color: 'var(--silver)', icon: <Award size={20} />, benefits: ['Accès catalogue standard', 'Réduction 5%', 'Support prioritaire', '— Avantage à venir —'] },
  { name: 'Or', min: 5000, max: 9999, color: 'var(--gold)', icon: <Star size={20} />, benefits: ['Catalogue prioritaire', 'Réduction 10%', 'Accès pré-vente', 'Support dédié', '— Avantage à venir —'] },
  { name: 'Platinium', min: 10000, max: null, color: 'var(--platinum)', icon: <Crown size={20} />, benefits: ['Catalogue VIP exclusif', 'Réduction 15%', 'Livraison prioritaire', 'Conseiller personnel', '— Avantage à venir —'] },
];

const Armurerie = () => {
  const [activeTab, setActiveTab] = useState('catalogue');
  const [category, setCategory] = useState('Tous');
  const [contracts, setContracts] = useState([]);
  const [loadingContracts, setLoadingContracts] = useState(false);

  useEffect(() => {
    if (activeTab === 'contrats') {
      setLoadingContracts(true);
      getContracts().then(data => { setContracts(data); setLoadingContracts(false); }).catch(() => setLoadingContracts(false));
    }
  }, [activeTab]);

  const filtered = category === 'Tous' ? PRODUCTS : PRODUCTS.filter(p => p.category === category);

  return (
    <div className="armurerie page-layout">
      <div className="page-hero">
        <div className="container">
          <p className="section-label">// DIVISION I</p>
          <h1 className="page-title">Marshall Firearms</h1>
          <p className="page-subtitle">Armement d'élite. Équipements tactiques. Sélection rigoureuse.</p>
        </div>
      </div>

      {/* TABS */}
      <div className="tabs-bar">
        <div className="container">
          <div className="tabs">
            {[
              { id: 'catalogue', label: 'Catalogue' },
              { id: 'contrats', label: 'Contrats' },
              { id: 'fidelite', label: 'Programme fidélité' },
            ].map(tab => (
              <button key={tab.id} className={`tab ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id)}>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container section">
        {/* CATALOGUE */}
        {activeTab === 'catalogue' && (
          <div className="anim-fade">
            <div className="catalogue-filters">
              <Filter size={14} className="filter-icon" />
              {CATEGORIES.map(cat => (
                <button key={cat} className={`filter-btn ${category === cat ? 'active' : ''}`} onClick={() => setCategory(cat)}>
                  {cat}
                </button>
              ))}
            </div>
            <div className="products-grid">
              {filtered.map(product => (
                <div key={product.id} className="product-card card card-hover">
                  <div className="product-img">
                    <ShoppingBag size={32} className="product-img-icon" />
                  </div>
                  <div className="product-body">
                    <span className="tag product-cat">{product.category}</span>
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-desc">{product.desc}</p>
                    <div className="product-footer">
                      <span className="product-price">{product.price.toLocaleString()} $</span>
                      <span className={`badge ${product.inStock ? 'badge-active' : 'badge-expired'}`}>
                        {product.inStock ? 'En stock' : 'Épuisé'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {filtered.length === 0 && (
              <div className="empty-state">
                <p>Aucun produit dans cette catégorie.</p>
              </div>
            )}
          </div>
        )}

        {/* CONTRATS */}
        {activeTab === 'contrats' && (
          <div className="anim-fade">
            <div className="section-header">
              <p className="section-label">// CONTRATS DISPONIBLES</p>
              <h2 className="section-title">Nos offres d'abonnement</h2>
              <p className="contracts-intro">Souscrivez à un contrat mensuel pour bénéficier d'avantages exclusifs. Activation effectuée par un employé Marshall.</p>
            </div>
            {loadingContracts ? (
              <div style={{ display: 'flex', justifyContent: 'center', padding: '60px' }}>
                <div className="spinner" />
              </div>
            ) : contracts.length === 0 ? (
              /* Placeholder contracts */
              <div className="contracts-grid">
                {[
                  { name: 'Contrat Recrue', price: 500, benefits: ['Accès catalogue étendu', 'Réduction 5% en boutique', '— Avantage à venir —', '— Avantage à venir —'], discord: '#' },
                  { name: 'Contrat Opérateur', price: 1200, benefits: ['Accès prioritaire', 'Réduction 10%', 'Équipements exclusifs', '— Avantage à venir —'], discord: '#', featured: true },
                  { name: 'Contrat Vétéran', price: 2500, benefits: ['Accès VIP complet', 'Réduction 15%', 'Conseiller dédié', 'Livraison express', '— Avantage à venir —'], discord: '#' },
                ].map((contract, i) => (
                  <ContractCard key={i} contract={contract} />
                ))}
              </div>
            ) : (
              <div className="contracts-grid">
                {contracts.map(contract => <ContractCard key={contract.id} contract={contract} />)}
              </div>
            )}
          </div>
        )}

        {/* FIDÉLITÉ */}
        {activeTab === 'fidelite' && (
          <div className="anim-fade">
            <div className="section-header">
              <p className="section-label">// PROGRAMME</p>
              <h2 className="section-title">Carte de fidélité Marshall</h2>
              <p className="contracts-intro">Cumulez des points à chaque achat et accédez à des avantages exclusifs. Carte activée par un employé en boutique.</p>
            </div>
            <div className="loyalty-grid">
              {LOYALTY_LEVELS.map((level, i) => (
                <div key={i} className="loyalty-card card" style={{ '--level-color': level.color }}>
                  <div className="loyalty-header">
                    <div className="loyalty-icon" style={{ color: level.color }}>
                      {level.icon}
                    </div>
                    <div>
                      <h3 className="loyalty-name" style={{ color: level.color }}>{level.name}</h3>
                      <p className="loyalty-range">
                        {level.min.toLocaleString()} pts
                        {level.max ? ` – ${level.max.toLocaleString()} pts` : ' +'}
                      </p>
                    </div>
                  </div>
                  <div className="divider" />
                  <ul className="loyalty-benefits">
                    {level.benefits.map((b, j) => (
                      <li key={j} className={b.startsWith('—') ? 'benefit-placeholder' : ''}>
                        <ChevronRight size={12} />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const ContractCard = ({ contract }) => (
  <div className={`contract-card card ${contract.featured ? 'contract-featured' : ''}`}>
    {contract.featured && <div className="contract-badge">POPULAIRE</div>}
    <h3 className="contract-name">{contract.name}</h3>
    <div className="contract-price">
      <span className="price-amount">{contract.price?.toLocaleString?.() || contract.priceMonthly?.toLocaleString?.()}</span>
      <span className="price-currency"> $ / mois</span>
    </div>
    <div className="divider" />
    <ul className="contract-benefits">
      {(contract.benefits || []).map((b, i) => (
        <li key={i} className={b?.startsWith?.('—') ? 'benefit-placeholder' : ''}>
          <ChevronRight size={12} /> {b}
        </li>
      ))}
    </ul>
    <a href={contract.discord || contract.discordLink || '#'} target="_blank" rel="noopener noreferrer" className="btn btn-gold contract-cta">
      Souscrire via Discord <ExternalLink size={13} />
    </a>
  </div>
);

export default Armurerie;
