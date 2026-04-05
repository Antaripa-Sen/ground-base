import React from 'react';
import { motion } from 'framer-motion';
import useStore from '../store/useStore';
import { CRISIS_DATA } from '../data/crisisData';

const LandingScreen = () => {
  const { selectCrisis, selectedCrisis, startIncident } = useStore();

  return (
    <div className="landing-grid">
      {/* LEFT PANEL */}
      <div className="landing-left">
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="var(--crisis)"><path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13h-13L12 6.5z"/></svg>
          <span className="bebas" style={{ fontSize: '2.8rem', color: '#fff' }}>GROUNDBASE</span>
        </div>
        
        <div style={{ marginTop: 'auto' }}>
          <div style={{ marginBottom: '24px' }}>
            <div className="mono" style={{ fontSize: '0.65rem', color: 'var(--text-3)', letterSpacing: '0.3em' }}>SYSTEM</div>
            <div className="bebas" style={{ fontSize: '4rem', color: 'var(--text-2)', lineHeight: 1 }}>STANDBY</div>
          </div>
          
          <div style={{ height: '1px', backgroundColor: 'var(--line)', marginBottom: '24px' }}></div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div>
              <div className="mono" style={{ fontSize: '0.65rem', color: 'var(--text-3)' }}>RESPONSE NETWORK</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-1)' }}>847 members</div>
            </div>
            <div>
              <div className="mono" style={{ fontSize: '0.65rem', color: 'var(--text-3)' }}>INCIDENTS TODAY</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-1)' }}>3 active</div>
            </div>
            <div>
              <div className="mono" style={{ fontSize: '0.65rem', color: 'var(--text-3)' }}>AVG RESPONSE TIME</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-1)' }}>2m 14s</div>
            </div>
            <div>
              <div className="mono" style={{ fontSize: '0.65rem', color: 'var(--text-3)' }}>COVERAGE</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-1)' }}>Global</div>
            </div>
          </div>
        </div>
        <div style={{ marginTop: '48px', fontSize: '0.65rem' }} className="mono">v2.4.1 · PROD</div>
      </div>

      {/* RIGHT PANEL */}
      <div className="landing-right">
        <div className="mono" style={{ fontSize: '0.7rem', color: 'var(--text-3)', letterSpacing: '0.25em', marginBottom: '16px' }}>SELECT CRISIS TYPE</div>
        
        <div className="crisis-grid">
          {Object.values(CRISIS_DATA).map((crisis, idx) => {
            const isSelected = selectedCrisis === crisis.id;
            return (
              <motion.div
                key={crisis.id}
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => selectCrisis(crisis.id)}
                style={{
                  height: '100px', borderRadius: '12px', padding: '16px', cursor: 'pointer', position: 'relative',
                  border: isSelected ? `1.5px solid ${crisis.color}` : '1px solid var(--line)',
                  background: isSelected ? `linear-gradient(135deg, ${crisis.color}15, var(--surface-0))` : 'linear-gradient(135deg, var(--surface-1), var(--surface-0))',
                  boxShadow: isSelected ? `0 4px 20px ${crisis.color}33` : 'none',
                  transition: 'all 0.15s ease'
                }}
                whileHover={{ y: -2, borderColor: crisis.color, background: `linear-gradient(135deg, ${crisis.color}0A, var(--surface-0))` }}
              >
                {isSelected && (
                  <>
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '3px', height: '100%', backgroundColor: crisis.color, borderRadius: '12px 0 0 12px' }} />
                    <div style={{ position: 'absolute', top: '8px', right: '8px', width: '20px', height: '20px', backgroundColor: crisis.color, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '10px' }}>✓</div>
                  </>
                )}
                {!isSelected && (
                  <div style={{ position: 'absolute', top: '12px', right: '12px', width: '8px', height: '8px', backgroundColor: crisis.color, borderRadius: '50%' }} />
                )}
                <div style={{ fontSize: '2rem', marginBottom: '12px', position: 'absolute', top: '12px' }}>{crisis.icon}</div>
                <div style={{ position: 'absolute', bottom: '12px' }}>
                  <div style={{ fontSize: '1rem', fontWeight: 600 }}>{crisis.label}</div>
                  <div className="mono" style={{ fontSize: '0.65rem', color: 'var(--text-3)' }}>{crisis.subLabel}</div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mono" style={{ fontSize: '0.7rem', color: 'var(--text-3)', letterSpacing: '0.25em', marginBottom: '16px' }}>ACTIVATE INCIDENT RESPONSE</div>
        
        <button
          onClick={startIncident}
          style={{
            width: '100%', height: '72px', borderRadius: '12px', background: 'linear-gradient(135deg, #1a0505, #0d0000)',
            border: '1.5px solid var(--crisis)', boxShadow: 'var(--crisis-glow)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', cursor: 'pointer', position: 'relative', overflow: 'hidden'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <motion.div
              animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              style={{ width: '10px', height: '10px', backgroundColor: 'var(--crisis)', borderRadius: '50%', boxShadow: '0 0 10px var(--crisis)' }}
            />
            <span style={{ fontSize: '1.1rem', fontWeight: 600, color: '#fff' }}>DECLARE CRISIS</span>
          </div>
          <div style={{ position: 'relative' }}>
            <motion.div animate={{ scale: [1, 1.8], opacity: [0.6, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0 }} style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '1px solid var(--crisis)' }} />
            <motion.div animate={{ scale: [1, 1.8], opacity: [0.6, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.9 }} style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '1px solid var(--crisis)' }} />
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid var(--crisis)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--crisis)', fontSize: '1.2rem', position: 'relative', zIndex: 2 }}>→</div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default LandingScreen;
