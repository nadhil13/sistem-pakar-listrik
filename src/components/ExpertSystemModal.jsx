import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Activity, Cpu, Database, PieChart, Terminal } from 'lucide-react';

const ExpertSystemModal = ({ isOpen, onClose, processData, applianceName }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [isOpen]);

  if (!processData) return null;

  const { tahap1, tahap2, tahap3, tahap4, tahap5 } = processData;

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', damping: 25, stiffness: 300 } },
    exit: { opacity: 0, y: 20, scale: 0.95 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-overlay"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
        >
          <motion.div
            className="modal-content double-bezel"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div>
                <h2 style={{ margin: 0, fontSize: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Terminal size={20} color="var(--color-accent-start)" />
                  PROSES SISTEM PAKAR
                </h2>
                <p style={{ margin: 0, fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
                  Algoritma Fuzzy Sugeno untuk: <strong style={{ color: 'var(--color-text-primary)' }}>{applianceName}</strong>
                </p>
              </div>
              <button className="close-btn" onClick={onClose}><X size={24} /></button>
            </div>

            <div className="modal-body" data-lenis-prevent="true">
              <div className="modal-body-inner" style={{ padding: '24px', display: 'grid', gap: '24px' }}>

                {/* TAHAP 1 */}
                <div className="process-stage">
                  <div className="stage-header">
                    <Database size={16} /> TAHAP 1: NORMALISASI DATA (CRISP INPUT)
                  </div>
                  <div className="stage-content grid-2">
                    <div className="data-box">
                      <span className="label">Konsumsi Daya</span>
                      <div className="value">{tahap1.watt} <span className="unit">Watt</span></div>
                    </div>
                    <div className="data-box">
                      <span className="label">Selisih Waktu (Aktual - Ideal)</span>
                      <div className="value">
                        {tahap1.hoursUsed} - {tahap1.idealHours} = <span style={{ color: tahap1.excess > 0 ? 'var(--color-danger)' : 'var(--color-success)' }}>{tahap1.excess}</span> <span className="unit">Jam</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* TAHAP 2 */}
                <div className="process-stage">
                  <div className="stage-header">
                    <Activity size={16} /> TAHAP 2: FUZZIFIKASI (MEMBERSHIP FUNCTION)
                  </div>
                  <div className="stage-content grid-2">
                    <div>
                      <h4 style={{ margin: '0 0 12px 0', fontSize: '12px', color: 'var(--color-text-secondary)' }}>Variabel 1: Daya (Watt)</h4>
                      {Object.entries(tahap2.powerFuzzy).map(([key, val]) => (
                        <div key={key} className="membership-bar">
                          <div className="bar-label"><span>{key.toUpperCase()}</span> <span>{val.toFixed(2)}</span></div>
                          <div className="bar-track"><div className="bar-fill" style={{ width: `${val * 100}%` }}></div></div>
                        </div>
                      ))}
                    </div>
                    <div>
                      <h4 style={{ margin: '0 0 12px 0', fontSize: '12px', color: 'var(--color-text-secondary)' }}>Variabel 2: Waktu (Jam)</h4>
                      {Object.entries(tahap2.timeFuzzy).map(([key, val]) => (
                        <div key={key} className="membership-bar">
                          <div className="bar-label"><span>{key.toUpperCase()}</span> <span>{val.toFixed(2)}</span></div>
                          <div className="bar-track"><div className="bar-fill" style={{ width: `${val * 100}%`, background: 'linear-gradient(90deg, #FF3366, #FF9933)' }}></div></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* TAHAP 3 */}
                <div className="process-stage">
                  <div className="stage-header">
                    <Cpu size={16} /> TAHAP 3: MESIN INFERENSI (KNOWLEDGE BASE)
                  </div>
                  <div className="stage-content">
                    <p style={{ fontSize: '11px', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>Aturan yang memiliki bobot (w {'>'} 0) atau aktif:</p>
                    <div className="rules-list">
                      {tahap3.rules.filter(r => r.w > 0).map(r => (
                        <div key={r.id} className="rule-item">
                          <span className="rule-id">R{r.id}</span>
                          <span className="rule-w">α-predikat (w) = <strong>{r.w.toFixed(2)}</strong></span>
                          <span className="rule-out">Output (z) = <strong>{r.out}</strong></span>
                        </div>
                      ))}
                      {tahap3.rules.filter(r => r.w > 0).length === 0 && (
                        <div className="rule-item" style={{ justifyContent: 'center', color: 'var(--color-text-secondary)' }}>Tidak ada aturan yang aktif</div>
                      )}
                    </div>
                  </div>
                </div>

                {/* TAHAP 4 & 5 */}
                <div className="process-stage">
                  <div className="stage-header">
                    <PieChart size={16} /> TAHAP 4 & 5: DEFUZZIFIKASI & KESIMPULAN
                  </div>
                  <div className="stage-content" style={{ background: 'var(--color-input-bg-focus)', border: '1px solid var(--color-accent-start)' }}>
                    <div className="defuz-formula" style={{ textAlign: 'center', marginBottom: '16px', fontFamily: 'monospace', fontSize: '14px', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                      Z* = Σ(w × z) / Σw = {tahap4.weightedSum.toFixed(2)} / {tahap4.totalWeight.toFixed(2)} = <strong style={{ color: 'var(--color-accent-start)', fontSize: '18px' }}>{tahap4.result}</strong>
                    </div>

                    <div style={{ textAlign: 'center' }}>
                      <div className="metric-value mb-sm" style={{ fontSize: '24px' }}>
                        <span className={`status-badge status-${tahap5.status.toLowerCase().replace(' ', '-')}`}>{tahap5.status}</span>
                      </div>
                      <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: 0 }}>"{tahap5.tip}"</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExpertSystemModal;
