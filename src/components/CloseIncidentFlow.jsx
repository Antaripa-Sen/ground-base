import React from 'react';
import { motion } from 'framer-motion';
import useStore from '../store/useStore';

const CloseIncidentFlow = ({ onClose }) => {
  const resolveIncident = useStore(s => s.resolveIncident);

  const handleConfirm = () => {
    resolveIncident();
    onClose();
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(6px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyItems: 'center' }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring' }}
          style={{
            backgroundColor: 'var(--surface-1)', border: '1px solid var(--line-mid)', borderTop: '2px solid var(--live)',
            borderRadius: '14px', padding: '32px', maxWidth: '420px', width: 'calc(100% - 48px)', margin: 'auto', textAlign: 'center'
          }}
        >
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--live)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#000', fontSize: '1.2rem', fontWeight: 900 }}>◉</div>
          <div className="bebas" style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '8px' }}>CLOSE INCIDENT?</div>
          <div style={{ fontSize: '0.9rem', color: 'var(--text-2)', lineHeight: 1.6, marginBottom: '24px' }}>
            This will mark the incident as resolved and notify all connected members.
          </div>
          
          <button
            onClick={handleConfirm}
            style={{ width: '100%', height: '52px', borderRadius: '10px', backgroundColor: 'var(--live)', color: '#000', fontSize: '1.1rem', marginBottom: '10px' }}
            className="bebas"
          >
            CONFIRM CLOSE
          </button>
          
          <button
            onClick={onClose}
            style={{ width: '100%', height: '44px', borderRadius: '10px', backgroundColor: 'transparent', border: '1px solid var(--line-mid)', color: 'var(--text-2)' }}
          >
            CANCEL
          </button>
        </motion.div>
      </motion.div>
    </>
  );
};

export default CloseIncidentFlow;
