import React, { useState } from 'react';
import { motion } from 'framer-motion';
import useStore from '../store/useStore';

const CallModal = ({ title, script, color, icon, onClose, type }) => {
  const [copied, setCopied] = useState(false);
  const { addLog } = useStore();

  React.useEffect(() => {
    addLog('comms', `Opened ${type} protocol`);
  }, [addLog, type]);

  const handleCopy = () => {
    navigator.clipboard.writeText(script).then(() => {
      setCopied(true);
      addLog('copy', `Script copied`);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', zIndex: 100 }}
      />
      
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: '0%' }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 280, damping: 28 }}
        style={{
          position: 'fixed', bottom: 0, left: 0, right: 0, maxHeight: '72vh',
          backgroundColor: 'var(--surface-0)', borderTop: `2px solid ${color}`,
          borderRadius: '20px 20px 0 0', padding: '28px 24px', zIndex: 101, display: 'flex', flexDirection: 'column'
        }}
      >
        <div style={{ width: '36px', height: '4px', backgroundColor: 'var(--line-mid)', margin: '0 auto 24px', borderRadius: '2px' }} />
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
          <span style={{ fontSize: '1.8rem' }}>{icon}</span>
          <span className="bebas" style={{ fontSize: '1.8rem', color: color }}>{title}</span>
        </div>
        <div className="mono" style={{ fontSize: '0.65rem', color: 'var(--text-3)', marginBottom: '16px' }}>READ CLEARLY TO OPERATOR</div>
        
        <div style={{ height: '1px', backgroundColor: 'var(--line)', margin: '0 0 16px' }} />
        
        <div style={{ flex: 1, overflowY: 'auto', backgroundColor: 'var(--surface-1)', border: '1px solid var(--line)', borderRadius: '10px', padding: '20px', marginBottom: '16px' }}>
          <div style={{ fontSize: '0.95rem', color: 'var(--text-1)', lineHeight: 1.75 }}>
            {script.split(/(\[.*?\])/).map((part, i) => {
              if (part.startsWith('[') && part.endsWith(']')) {
                return (
                  <span key={i} className="mono" style={{ display: 'inline', backgroundColor: 'rgba(245,166,35,0.15)', borderBottom: '1px solid var(--pending)', color: 'var(--pending)', padding: '0 6px', borderRadius: '4px', fontSize: '0.9rem' }}>
                    {part}
                  </span>
                );
              }
              return part;
            })}
          </div>
        </div>
        
        <button
          onClick={handleCopy}
          style={{ width: '100%', height: '50px', borderRadius: '10px', backgroundColor: copied ? 'var(--live)' : 'var(--live)', color: '#000', fontWeight: 700, fontSize: '0.95rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          {copied ? '✓ SCRIPT COPIED' : 'COPY SCRIPT'}
        </button>
        <button
          onClick={onClose}
          style={{ width: '100%', height: '44px', borderRadius: '8px', backgroundColor: 'transparent', border: '1px solid var(--line)', color: 'var(--text-2)', marginTop: '8px' }}
        >
          CLOSE
        </button>
      </motion.div>
    </>
  );
};

export default CallModal;
