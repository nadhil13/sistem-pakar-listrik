import React, { useState, useMemo, useRef, useEffect } from 'react';
import { calculateFuzzyWaste } from './utils/fuzzyLogic';
import { Zap, Monitor, Activity, BatteryCharging, AlertTriangle, Printer, Settings, CheckCircle2, ChevronRight, ChevronLeft, XOctagon, Leaf, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useVelocity, useAnimationFrame, useMotionValue } from 'framer-motion';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from 'recharts';
import CountUp from 'react-countup';
import { ReactLenis } from '@studio-freight/react-lenis';
import { ParticleTextEffect } from './components/ui/particle-text-effect';
import Tilt from 'react-parallax-tilt';
import ExpertSystemModal from './components/ExpertSystemModal';

const TARIFFS = [
  { id: 'R1-900', label: 'R1 / 900 VA', price: 1352 },
  { id: 'R1-1300', label: 'R1 / 1300 VA', price: 1444.70 },
  { id: 'R2-3500', label: 'R2 / 3500 VA+', price: 1699.53 },
  { id: 'B1-900', label: 'Bisnis / 900 VA', price: 1064 },
];

const CO2_FACTOR = 0.85;


// ==========================================
// SPOTLIGHT CARD
// ==========================================
const SpotlightCard = ({ children, className, style, ...props }) => {
  const divRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    divRef.current.style.setProperty('--mouse-x', `${x}px`);
    divRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <motion.div
      ref={divRef}
      className={`double-bezel ${className || ''}`}
      style={style}
      onMouseMove={handleMouseMove}
      {...props}
    >
      <Tilt tiltMaxAngleX={4} tiltMaxAngleY={4} transitionSpeed={2000} scale={1.01} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div className="vanguard-card-inner" style={{ position: 'relative', overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          <div className="spotlight-glow" />
          <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
            {children}
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
};

const SpotlightFormCard = ({ children, className, style, ...props }) => {
  const divRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    divRef.current.style.setProperty('--mouse-x', `${x}px`);
    divRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div
      ref={divRef}
      className={`double-bezel ${className || ''}`}
      style={{ ...style, padding: 0 }}
      onMouseMove={handleMouseMove}
      {...props}
    >
      <div className="vanguard-card-inner" style={{ position: 'relative', overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column', flexGrow: 1, padding: 'var(--space-md)' }}>
        <div className="spotlight-glow" />
        <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          {children}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// SPLIT TEXT ANIMATION
// ==========================================
const SplitText = ({ text }) => {
  return (
    <span style={{ display: 'inline-block' }}>
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 50, rotateX: 90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.8, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
};


// ==========================================
// LANDING PAGE & PARALLAX FOOTER
// ==========================================

const SystemFooter = () => {
  return (
    <footer className="vanguard-footer">
      <div className="vanguard-footer-grid">
        <div className="vanguard-footer-left">
          <motion.h2
            className="vanguard-footer-display"
            initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.32, 0.72, 0, 1] }}
          >
            SIAP MENEKAN<br />PEMBOROSAN?
          </motion.h2>
        </div>
        
        <div className="vanguard-footer-right">
          <div className="vanguard-card double-bezel">
            <div className="vanguard-card-inner">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
                className="vanguard-footer-text"
              >
                Laporan efisiensi dan rekomendasi AI siap dikirim. Hubungi tim teknis kami untuk implementasi hari ini.
              </motion.p>
              
              <motion.a 
                href="mailto:admin@audit-energi.id"
                className="vanguard-btn"
                style={{ marginTop: '32px' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.32, 0.72, 0, 1] }}
              >
                <span>HUBUNGI KAMI SEKARANG</span>
                <div className="icon-circle">
                  <ChevronRight size={18} strokeWidth={2.5} />
                </div>
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const LandingPage = ({ onEnter, theme, toggleTheme }) => {
  return (
    <div className="landing-container">
      <div className="evolve-nav">
        <div className="evolve-logo">⬡ AUDIT.</div>
        <div className="evolve-nav-text hide-mobile" style={{ textAlign: 'right' }}>
          admin@audit-energi.id<br />
          Indonesia, EST 2024©
        </div>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <button
            onClick={toggleTheme}
            style={{ background: 'transparent', border: 'none', color: 'var(--color-text-primary)', cursor: 'pointer' }}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <div className="evolve-logo" style={{ fontSize: '14px', border: '1px solid var(--color-border)', padding: '4px 12px', cursor: 'pointer' }}>
            Menu
          </div>
        </div>
      </div>

      <div className="hero-section">
        <ParticleTextEffect words={["ENERGY", "AUDIT.", "SYSTEM"]} theme={theme} />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="hero-subtitle"
        >
          Sistem pakar revolusioner menggunakan algoritma Fuzzy Logic untuk mendeteksi tingkat pemborosan energi listrik secara akurat. Tingkatkan efisiensi finansial dan kurangi emisi karbon Anda sekarang juga.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 1.2, ease: [0.32, 0.72, 0, 1] }}
          onClick={onEnter}
          className="vanguard-btn group"
        >
          <span>MULAI DIAGNOSA</span>
          <div className="icon-circle">
            <ChevronRight size={18} strokeWidth={2.5} />
          </div>
        </motion.button>
      </div>

      <VelocityScroll text="ENERGY AUDIT SYSTEM — FUZZY LOGIC —" />

      <SystemFooter />
    </div>
  );
};

// ==========================================
// VELOCITY SCROLL COMPONENT
// ==========================================
function wrap(min, max, v) {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
}

const VelocityScroll = ({ text, defaultVelocity = 3 }) => {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);
  const directionFactor = useRef(1);

  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * defaultVelocity * (delta / 1000);
    if (velocityFactor.get() < 0) directionFactor.current = -1;
    else if (velocityFactor.get() > 0) directionFactor.current = 1;
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="no-print" style={{ overflow: 'hidden', whiteSpace: 'nowrap', display: 'flex', flexWrap: 'nowrap', margin: '40px 0', width: '100vw', marginLeft: 'calc(-50vw + 50%)', userSelect: 'none' }}>
      <motion.div style={{ x, display: 'flex', whiteSpace: 'nowrap', fontSize: '10vw', fontWeight: 900, letterSpacing: '-0.02em', opacity: 0.03, color: 'var(--color-text-primary)' }}>
        <span style={{ paddingRight: '50px' }}>{text}</span>
        <span style={{ paddingRight: '50px' }}>{text}</span>
        <span style={{ paddingRight: '50px' }}>{text}</span>
        <span style={{ paddingRight: '50px' }}>{text}</span>
        <span style={{ paddingRight: '50px' }}>{text}</span>
        <span style={{ paddingRight: '50px' }}>{text}</span>
      </motion.div>
    </div>
  );
};

// ==========================================
// TOAST NOTIFICATIONS
// ==========================================
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      style={{
        padding: '12px 24px',
        background: type === 'error' ? 'var(--color-danger)' : 'var(--color-card-bg)',
        color: type === 'error' ? '#fff' : 'var(--color-text-primary)',
        border: `1px solid ${type === 'error' ? 'transparent' : 'var(--color-border)'}`,
        borderRadius: '8px',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
        marginBottom: '10px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '14px',
        fontWeight: 500
      }}
    >
      {type === 'success' ? <CheckCircle2 size={16} color="var(--color-success)" /> : <AlertTriangle size={16} />}
      {message}
    </motion.div>
  );
};

// ==========================================
// DASHBOARD
// ==========================================

const Dashboard = ({ onBack, theme, toggleTheme }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const [appliances, setAppliances] = useState(() => {
    const saved = localStorage.getItem('sispak_appliances');
    return saved ? JSON.parse(saved) : [];
  });
  const [tariff, setTariff] = useState(() => {
    const saved = localStorage.getItem('sispak_tariff');
    return saved ? parseFloat(saved) : 1444.70;
  });
  const [budget, setBudget] = useState(() => {
    const saved = localStorage.getItem('sispak_budget');
    return saved ? parseFloat(saved) : 500000;
  });

  useEffect(() => {
    localStorage.setItem('sispak_appliances', JSON.stringify(appliances));
  }, [appliances]);

  useEffect(() => {
    localStorage.setItem('sispak_tariff', tariff.toString());
  }, [tariff]);

  useEffect(() => {
    localStorage.setItem('sispak_budget', budget.toString());
  }, [budget]);

  const [formData, setFormData] = useState({
    name: '',
    power: '',
    hoursUsed: '',
    idealHours: '8'
  });

  const [simulation, setSimulation] = useState({});
  const [modalProcessData, setModalProcessData] = useState(null);
  const [modalApplianceName, setModalApplianceName] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddAppliance = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.power || !formData.hoursUsed) return;

    const watt = parseFloat(formData.power);
    const hours = parseFloat(formData.hoursUsed);
    const ideal = parseFloat(formData.idealHours);

    const fuzzyRes = calculateFuzzyWaste(watt, hours, ideal);
    const dailyKwh = (watt * hours) / 1000;

    const newItem = {
      id: Date.now(),
      name: formData.name.toUpperCase(),
      watt,
      hours,
      ideal,
      score: fuzzyRes.score,
      status: fuzzyRes.status,
      tip: fuzzyRes.tip,
      process: fuzzyRes.process,
      dailyKwh
    };

    setAppliances([...appliances, newItem]);
    setFormData({ name: '', power: '', hoursUsed: '', idealHours: '8' });
    addToast(`${newItem.name} berhasil dianalisis!`);
  };

  const handleRemove = (id) => {
    const appToRemove = appliances.find(a => a.id === id);
    setAppliances(appliances.filter(item => item.id !== id));
    const newSim = { ...simulation };
    delete newSim[id];
    setSimulation(newSim);
    if (appToRemove) {
      addToast(`${appToRemove.name} dihapus dari audit.`, 'error');
    }
  };

  const handleSimulate = (id, reducedHours) => {
    setSimulation(prev => ({ ...prev, [id]: parseFloat(reducedHours) }));
  };

  const totalDailyKwh = appliances.reduce((sum, item) => sum + item.dailyKwh, 0);
  const totalMonthlyCost = totalDailyKwh * 30 * tariff;
  const totalMonthlyCO2 = totalDailyKwh * 30 * CO2_FACTOR;

  const simulatedSavings = useMemo(() => {
    let totalSavedKwh = 0;
    Object.keys(simulation).forEach(appId => {
      const app = appliances.find(a => a.id === parseInt(appId));
      if (app) totalSavedKwh += (app.watt * simulation[appId]) / 1000;
    });
    return {
      cost: totalSavedKwh * 30 * tariff,
      co2: totalSavedKwh * 30 * CO2_FACTOR
    };
  }, [simulation, appliances, tariff]);

  const overallScore = appliances.length > 0
    ? Math.round(appliances.reduce((sum, item) => sum + item.score, 0) / appliances.length)
    : 0;

  const chartData = appliances.map(app => ({
    name: app.name,
    kwh: app.dailyKwh,
    cost: app.dailyKwh * 30 * tariff
  }));

  const getStatusBadge = (status) => {
    switch (status) {
      case 'HEMAT': return <span className="badge success"><CheckCircle2 size={10} style={{ marginRight: 4 }} /> HEMAT</span>;
      case 'NORMAL': return <span className="badge"><Activity size={10} style={{ marginRight: 4 }} /> NORMAL</span>;
      case 'BOROS': return <span className="badge warning"><AlertTriangle size={10} style={{ marginRight: 4 }} /> BOROS</span>;
      case 'SANGAT BOROS': return <span className="badge danger"><XOctagon size={10} style={{ marginRight: 4 }} /> KRITIS</span>;
      default: return <span className="badge">{status}</span>;
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p style={{ margin: '0 0 8px 0', fontWeight: 'bold' }}>{label || payload[0].name}</p>
          <p style={{ margin: 0, color: 'var(--color-accent-start)' }}>
            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="app-container">
      <div className="no-print" style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
        <AnimatePresence>
          {toasts.map(t => (
            <Toast key={t.id} message={t.message} type={t.type} onClose={() => removeToast(t.id)} />
          ))}
        </AnimatePresence>
      </div>
      <svg style={{ height: 0, width: 0, position: 'absolute' }}>
        <defs>
          <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-accent-start)" />
            <stop offset="100%" stopColor="var(--color-accent-end)" />
          </linearGradient>
          <linearGradient id="pie1" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#00d2ff" /><stop offset="100%" stopColor="#3a7bd5" /></linearGradient>
          <linearGradient id="pie2" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#ff3366" /><stop offset="100%" stopColor="#cc0033" /></linearGradient>
          <linearGradient id="pie3" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#00ff88" /><stop offset="100%" stopColor="#009955" /></linearGradient>
          <linearGradient id="pie4" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#ffb800" /><stop offset="100%" stopColor="#cc9300" /></linearGradient>
        </defs>
      </svg>

      <div className="sidebar no-print">
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
          <button onClick={onBack} className="btn-secondary" style={{ padding: '8px 16px', fontSize: '10px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <ChevronLeft size={12} /> KEMBALI
          </button>
          <button onClick={toggleTheme} style={{ background: 'transparent', border: 'none', color: 'var(--color-text-primary)', cursor: 'pointer' }}>
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        <div className="mt-md">
          <h1>ENERGY</h1>
          <h1 style={{ color: 'var(--color-text-secondary)' }}>AUDIT.</h1>
        </div>

        <SpotlightFormCard className="mt-xl">
          <label className="label" style={{ color: 'var(--color-text-primary)' }}>
            PENGATURAN GLOBAL RUMAH
          </label>
          <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '4px', marginBottom: '12px' }}>
            Golongan tarif PLN ini akan diterapkan pada kalkulasi tagihan seluruh perangkat Anda.
          </p>
          <div className="input-group">
            <select className="select-field" style={{ background: 'var(--color-card-bg)' }} value={tariff} onChange={(e) => setTariff(parseFloat(e.target.value))}>
              {TARIFFS.map(t => (
                <option key={t.id} value={t.price}>{t.label} - Rp {t.price}</option>
              ))}
            </select>
          </div>
          <div className="input-group mt-md">
            <label className="label">Limit Budget Bulanan (Rp)</label>
            <input type="number" className="input-field" style={{ background: 'var(--color-card-bg)' }} value={budget} onChange={(e) => setBudget(parseFloat(e.target.value) || 0)} />
          </div>
        </SpotlightFormCard>

        <div style={{ margin: 'var(--space-xl) 0 var(--space-md) 0' }}></div>

        <SpotlightFormCard>
          <form onSubmit={handleAddAppliance} className="flex-col gap-lg">
            <div style={{ marginBottom: '8px' }}>
              <h3 style={{ margin: 0, fontSize: '16px' }}>TAMBAH PERANGKAT</h3>
              <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Masukkan data alat elektronik untuk diaudit.</span>
            </div>
            
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '8px' }}>
              <button type="button" className="btn-secondary" onClick={() => setFormData({ name: 'KULKAS', power: '150', hoursUsed: '24', idealHours: '24' })}>+ Kulkas</button>
              <button type="button" className="btn-secondary" onClick={() => setFormData({ name: 'AC 1 PK', power: '800', hoursUsed: '8', idealHours: '4' })}>+ AC 1 PK</button>
              <button type="button" className="btn-secondary" onClick={() => setFormData({ name: 'TV LED', power: '50', hoursUsed: '5', idealHours: '3' })}>+ TV LED</button>
              <button type="button" className="btn-secondary" onClick={() => setFormData({ name: 'MESIN CUCI', power: '350', hoursUsed: '2', idealHours: '1' })}>+ Mesin Cuci</button>
            </div>

            <div className="input-group">
              <label className="label">Identitas Alat</label>
              <input type="text" name="name" className="input-field" placeholder="Kulkas Dapur" value={formData.name} onChange={handleInputChange} autoComplete="off" />
            </div>
            <div className="flex gap-md mobile-col">
              <div className="input-group" style={{ flex: 1 }}>
                <label className="label">Konsumsi (W)</label>
                <input type="number" name="power" className="input-field" placeholder="0" value={formData.power} onChange={handleInputChange} />
              </div>
              <div className="input-group" style={{ flex: 1 }}>
                <label className="label">Durasi (Jam/Hr)</label>
                <input type="number" name="hoursUsed" className="input-field" placeholder="0" value={formData.hoursUsed} onChange={handleInputChange} />
              </div>
            </div>
            <div className="input-group">
              <label className="label">Target Ideal (Jam/Hr)</label>
              <input type="number" name="idealHours" className="input-field" placeholder="8" value={formData.idealHours} onChange={handleInputChange} />
            </div>

            <button type="submit" className="vanguard-btn" style={{ width: '100%', marginTop: '16px' }}>
              TAMBAHKAN PERANGKAT
              <div className="icon-circle">
                <ChevronRight size={18} />
              </div>
            </button>
          </form>
        </SpotlightFormCard>

        <div style={{ flexGrow: 1 }}></div>

        {appliances.length > 0 && (
          <button onClick={() => window.print()} className="vanguard-btn no-print" style={{ width: '100%' }}>
            <Printer size={18} /> EXPORT REPORT
            <div className="icon-circle">
              <ChevronRight size={18} />
            </div>
          </button>
        )}
      </div>

      <div className="main-content">
        <motion.div variants={containerVariants} initial="hidden" animate="show" className="bento-grid">

          <SpotlightCard variants={itemVariants} style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: totalMonthlyCost > budget && budget > 0 ? '1px solid var(--color-danger)' : undefined, boxShadow: totalMonthlyCost > budget && budget > 0 ? '0 0 20px rgba(255, 51, 102, 0.2)' : undefined }}>
            <div>
              <div className="metric-label mb-sm">
                PROYEKSI BIAYA BULANAN 
                {totalMonthlyCost > budget && budget > 0 && <span style={{ color: 'var(--color-danger)', marginLeft: '8px', fontWeight: 600 }}>OVER BUDGET</span>}
              </div>
              <div className="metric-value">
                <span style={{ fontSize: '24px', verticalAlign: 'super', marginRight: '4px', color: totalMonthlyCost > budget && budget > 0 ? 'var(--color-danger)' : 'var(--color-text-secondary)' }}>Rp</span>
                <span style={{ color: totalMonthlyCost > budget && budget > 0 ? 'var(--color-danger)' : 'inherit' }}>
                  <CountUp key={totalMonthlyCost} end={totalMonthlyCost} separator="." decimal="," duration={1.5} />
                </span>
              </div>
              {simulatedSavings.cost > 0 && (
                <div className="mt-sm" style={{ color: 'var(--color-success)', fontWeight: 700 }}>
                  ↓ Menghemat Rp <CountUp end={simulatedSavings.cost} separator="." decimal="," duration={1} />
                </div>
              )}
            </div>

            <div style={{ textAlign: 'right' }}>
              <div className="metric-label mb-sm">FUZZY INDEX SCORE</div>
              <div className={`metric-value ${overallScore > 70 ? 'danger' : overallScore < 45 ? 'success' : 'warning'}`}>
                <CountUp key={overallScore} end={overallScore} duration={2} />%
              </div>
            </div>
          </SpotlightCard>

          {appliances.length > 0 && (
            <>
              <SpotlightCard variants={itemVariants}>
                <div className="flex" style={{ justifyContent: 'space-between' }}>
                  <div className="metric-label mb-md"><Activity size={14} style={{ display: 'inline', verticalAlign: 'middle' }} /> Distribusi Beban</div>
                </div>
                <div style={{ height: '220px', width: '100%' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={chartData} dataKey="cost" nameKey="name" cx="50%" cy="50%" innerRadius={65} outerRadius={80} stroke="rgba(255,255,255,0.05)" paddingAngle={5}>
                        {chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={`url(#pie${(index % 4) + 1})`} />)}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </SpotlightCard>

              <SpotlightCard variants={itemVariants}>
                <div className="metric-label mb-md"><BatteryCharging size={14} style={{ display: 'inline', verticalAlign: 'middle' }} /> Konsumsi Energi (kWh/Hari)</div>
                <div style={{ height: '220px', width: '100%' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <XAxis dataKey="name" tick={{ fontSize: 10, fontFamily: 'var(--font-display)', fill: 'var(--color-text-secondary)' }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 10, fill: 'var(--color-text-secondary)' }} axisLine={false} tickLine={false} />
                      <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
                      <Bar dataKey="kwh" fill="url(#barGradient)" radius={[4, 4, 0, 0]} barSize={30} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </SpotlightCard>

              <SpotlightCard variants={itemVariants} style={{ gridColumn: '1 / -1' }}>
                <div className="metric-label mb-sm"><Leaf size={14} style={{ display: 'inline', verticalAlign: 'middle' }} /> ESTIMASI JEJAK KARBON (CO₂)</div>
                <div className="metric-value">
                  <CountUp key={totalMonthlyCO2} end={totalMonthlyCO2} decimals={1} duration={1.5} /> <span style={{ fontSize: '20px', color: 'var(--color-text-secondary)' }}>kg / Bulan</span>
                </div>
                <p style={{ color: 'var(--color-text-secondary)', margin: '8px 0 0 0', fontSize: '12px' }}>
                  Berdasarkan rasio emisi rata-rata PLN (0.85 kg CO₂ per kWh).
                </p>
              </SpotlightCard>
            </>
          )}

        </motion.div>

        <div className="flex mt-xl" style={{ justifyContent: 'space-between', alignItems: 'center', paddingBottom: 'var(--space-md)', borderBottom: '1px solid var(--color-border)' }}>
          <h3>PERANGKAT TERDAFTAR ({appliances.length})</h3>
        </div>

        {appliances.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 'var(--space-xl)', opacity: 0.3 }}>
            <Monitor size={48} style={{ margin: '0 auto var(--space-md)' }} />
            <h3>BELUM ADA DATA</h3>
            <p>Silakan input perangkat di panel sebelah kiri.</p>
          </div>
        ) : (
          <motion.div variants={containerVariants} initial="hidden" animate="show" className="bento-grid">
            <AnimatePresence>
              {appliances.map((app) => {
                const currentCost = app.dailyKwh * 30 * tariff;
                const simHours = simulation[app.id] || 0;

                return (
                  <SpotlightCard key={app.id} variants={itemVariants} exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }} className="flex-col">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-md)' }}>
                      <div>
                        <h4 style={{ margin: '0 0 8px 0', color: 'var(--color-text-primary)', fontSize: '16px' }}>{app.name}</h4>
                        {getStatusBadge(app.status)}
                      </div>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        {app.process && (
                          <button onClick={() => { setModalProcessData(app.process); setModalApplianceName(app.name); }} className="btn-secondary no-print" style={{ padding: '6px 10px', fontSize: '10px' }}>
                            <Activity size={12} style={{ display: 'inline', marginRight: '4px' }} />
                            PROSES ALGORITMA
                          </button>
                        )}
                        <button onClick={() => handleRemove(app.id)} className="btn-secondary no-print" style={{ padding: '6px 10px', fontSize: '10px' }}>HAPUS</button>
                      </div>
                    </div>

                    <div className="flex-col gap-sm" style={{ padding: 'var(--space-md) 0', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)', flexGrow: 1 }}>
                      <div className="flex" style={{ justifyContent: 'space-between' }}>
                        <span style={{ color: 'var(--color-text-secondary)' }}>Daya</span>
                        <strong>{app.watt} W</strong>
                      </div>
                      <div className="flex" style={{ justifyContent: 'space-between' }}>
                        <span style={{ color: 'var(--color-text-secondary)' }}>Durasi Aktual</span>
                        <strong>{app.hours} Jam / Hari</strong>
                      </div>
                      <div className="flex" style={{ justifyContent: 'space-between' }}>
                        <span style={{ color: 'var(--color-text-secondary)' }}>Durasi Ideal</span>
                        <strong>{app.ideal} Jam / Hari</strong>
                      </div>
                    </div>

                    <div className="flex" style={{ justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-md) 0' }}>
                      <span className="metric-label" style={{ margin: 0 }}>BIAYA / BLN</span>
                      <strong style={{ fontSize: '18px', color: 'var(--color-accent-start)' }}>
                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(currentCost)}
                      </strong>
                    </div>

                    {app.tip && (
                      <div style={{ padding: '0 0 var(--space-md) 0', fontSize: '11px', color: 'var(--color-text-secondary)', fontStyle: 'italic', lineHeight: 1.4 }}>
                        💡 {app.tip}
                      </div>
                    )}

                    <div className="no-print" style={{ background: 'var(--color-input-bg)', padding: 'var(--space-md)', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                      <div className="metric-label mb-sm"><Settings size={12} style={{ display: 'inline', verticalAlign: 'text-bottom' }} /> SIMULASI PENGHEMATAN</div>
                      <div className="flex" style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                        <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Kurangi pemakaian</span>
                        <strong style={{ color: 'var(--color-text-primary)', fontSize: '14px' }}>{simHours} Jam</strong>
                      </div>
                      <input type="range" min="0" max={app.hours} step="0.5" value={simHours} onChange={(e) => handleSimulate(app.id, e.target.value)} className="slider" />
                      {simHours > 0 && (
                        <div className="mt-md" style={{ color: 'var(--color-success)', fontWeight: 700, fontSize: '12px' }}>
                          Saves {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(((app.watt * simHours) / 1000) * 30 * tariff)}
                        </div>
                      )}
                    </div>
                  </SpotlightCard>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      <ExpertSystemModal 
        isOpen={!!modalProcessData} 
        onClose={() => setModalProcessData(null)} 
        processData={modalProcessData} 
        applianceName={modalApplianceName} 
      />
    </div>
  );
};

// ==========================================
// MAIN APP COMPONENT
// ==========================================

function App() {
  const [view, setView] = useState('home'); // 'home' | 'dashboard'
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <ReactLenis root>
      <AnimatePresence mode="wait">
        {view === 'home' ? (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <LandingPage
              theme={theme}
              toggleTheme={toggleTheme}
              onEnter={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setTimeout(() => setView('dashboard'), 300);
              }}
            />
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            style={{ background: 'var(--color-bg)', minHeight: '100vh' }}
          >
            <Dashboard
              theme={theme}
              toggleTheme={toggleTheme}
              onBack={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setTimeout(() => setView('home'), 300);
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </ReactLenis>
  );
}

export default App;
