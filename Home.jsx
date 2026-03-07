// src/pages/Home.jsx
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Crosshair, ArrowRight, Zap, Globe, Users, Box } from 'lucide-react';
import './Home.css';

const STATS = [
  { id: 'refs', label: 'Références', value: 847, icon: <Box size={20} />, suffix: '+' },
  { id: 'shops', label: 'Boutiques', value: 12, icon: <Globe size={20} />, suffix: '' },
  { id: 'clients', label: 'Clients', value: 3240, icon: <Users size={20} />, suffix: '+' },
  { id: 'divs', label: 'Divisions', value: 2, icon: <Zap size={20} />, suffix: '' },
];

const useCountUp = (target, duration = 2000, start = false) => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return value;
};

const StatCard = ({ stat, started }) => {
  const count = useCountUp(stat.value, 2000, started);
  return (
    <div className="stat-card">
      <div className="stat-icon">{stat.icon}</div>
      <div className="stat-number">{count.toLocaleString()}{stat.suffix}</div>
      <div className="stat-label">{stat.label}</div>
    </div>
  );
};

const Home = () => {
  const [statsStarted, setStatsStarted] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsStarted(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="home">
      {/* HERO */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-grid" />
          <div className="hero-vignette" />
          <div className="scanline" />
        </div>

        <div className="container hero-content">
          <div className="hero-badge">
            <span className="badge-dot" />
            SYSTÈME OPÉRATIONNEL
          </div>
          <h1 className="hero-title">
            <span className="hero-title-main">MARSHALL</span>
            <span className="hero-title-sub">CORPORATION</span>
          </h1>
          <p className="hero-motto">ARMEMENT. ÉLITE.</p>
          <p className="hero-desc">
            Référence absolue en armement tactique et sécurité d'élite.<br />
            Deux divisions, une seule exigence : l'excellence.
          </p>
          <div className="hero-actions">
            <Link to="/armurerie" className="btn btn-gold">
              <Crosshair size={16} /> Accéder à l'armurerie
            </Link>
            <Link to="/securite" className="btn btn-outline">
              En savoir plus
            </Link>
          </div>
        </div>

        <div className="hero-scroll">
          <span>SCROLL</span>
          <div className="scroll-line" />
        </div>
      </section>

      {/* STATS */}
      <section className="stats-section" ref={statsRef}>
        <div className="container">
          <div className="stats-grid">
            {STATS.map(stat => (
              <StatCard key={stat.id} stat={stat} started={statsStarted} />
            ))}
          </div>
        </div>
      </section>

      {/* DIVISIONS */}
      <section className="divisions section">
        <div className="container">
          <div className="section-header">
            <p className="section-label">// STRUCTURE</p>
            <h2 className="section-title">NOS DIVISIONS</h2>
          </div>
          <div className="divisions-grid">
            {/* Firearms */}
            <div className="division-card">
              <div className="division-accent division-accent-gold" />
              <div className="division-icon">
                <Crosshair size={32} />
              </div>
              <div className="division-content">
                <span className="division-tag">DIVISION I</span>
                <h3 className="division-name">Marshall Firearms</h3>
                <p className="division-desc">
                  Armurerie d'excellence proposant une sélection rigoureuse d'armes et d'équipements tactiques. 
                  Catalogue étendu, service expert, stock permanent.
                </p>
                <div className="division-features">
                  <span className="tag">Armes de poing</span>
                  <span className="tag">Armes longues</span>
                  <span className="tag">Équipements</span>
                  <span className="tag">Munitions</span>
                </div>
                <Link to="/armurerie" className="btn btn-gold division-btn">
                  Consulter le catalogue <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Security */}
            <div className="division-card division-card-locked">
              <div className="division-accent division-accent-red" />
              <div className="division-icon division-icon-red">
                <Shield size={32} />
              </div>
              <div className="division-content">
                <span className="division-tag">DIVISION II</span>
                <h3 className="division-name">Marshall Tactical Security</h3>
                <p className="division-desc">
                  Service de sécurité d'élite en cours de déploiement. 
                  Opérations tactiques, protection rapprochée et sécurisation de zones.
                </p>
                <div className="division-status">
                  <div className="status-dot status-offline" />
                  <span>Service en développement</span>
                </div>
                <Link to="/securite" className="btn btn-outline division-btn">
                  En cours de déploiement <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container cta-inner">
          <div className="cta-content">
            <p className="section-label">// PROGRAMME FIDÉLITÉ</p>
            <h2 className="cta-title">Rejoignez l'élite Marshall</h2>
            <p className="cta-desc">Créez votre compte, gérez vos personnages, accédez à des contrats exclusifs et progressez dans notre programme de fidélité.</p>
          </div>
          <Link to="/compte" className="btn btn-gold cta-btn">
            Créer un compte <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
