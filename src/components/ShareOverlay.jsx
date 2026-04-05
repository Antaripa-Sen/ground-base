import React, { useState } from 'react';
import { motion } from 'framer-motion';
import useStore from '../store/useStore';

const ShareOverlay = ({ onClose }) => {
  const { incidentId } = useStore();
  const [copied, setCopied] = useState(false);

  const url = `groundbase.app/room/GRB-${incidentId}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(5,7,10,0.95)', backdropFilter: 'blur(16px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <motion.div
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.92, opacity: 0 }}
          transition={{ type: 'spring' }}
          style={{
            backgroundColor: 'var(--surface-1)', border: '1px solid var(--line-mid)', borderTop: '2px solid var(--live)',
            borderRadius: '16px', padding: '36px', width: 'min(400px, calc(100vw - 48px))', position: 'relative', textAlign: 'center'
          }}
        >
          <button onClick={onClose} style={{ position: 'absolute', top: '16px', right: '16px', width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--surface-2)', color: 'var(--text-2)' }}>✕</button>
          
          <div className="bebas" style={{ fontSize: '1.8rem', color: '#fff', marginTop: '8px' }}>SHARE ROOM ACCESS</div>
          <div className="mono" style={{ fontSize: '0.65rem', color: 'var(--text-3)', marginBottom: '24px' }}>INVITE TO INCIDENT ROOM</div>
          
          <div style={{ backgroundColor: '#fff', padding: '16px', borderRadius: '8px', border: '2px solid var(--line-mid)', width: 'fit-content', margin: '0 auto 24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(21, 6px)', gridTemplateRows: 'repeat(21, 6px)', backgroundColor: '#fff' }}>
              {Array(441).fill(0).map((_, i) => (
                <div key={i} style={{ width: '100%', height: '100%', backgroundColor: Math.random() > 0.4 ? '#000' : '#fff' }} />
              ))}
            </div>
          </div>
          
          <button onClick={handleCopy} className="mono" style={{ backgroundColor: 'var(--void)', border: '1px solid var(--live)', borderRadius: '8px', padding: '12px 20px', fontSize: '0.82rem', color: 'var(--live)', marginBottom: '16px', width: '100%', display: 'flex', justifyContent: 'center' }}>
            {copied ? 'COPIED ✓' : url}
          </button>
          
          <div className="mono" style={{ color: 'var(--pending)', fontSize: '0.7rem', marginBottom: '24px' }}>⏱ EXPIRES IN 1:59</div>
          
          <button
            onClick={handleCopy}
            style={{ width: '100%', height: '52px', borderRadius: '10px', backgroundColor: 'var(--live)', color: '#000', fontSize: '0.95rem', fontWeight: 700 }}
          >
            COPY INVITE LINK
          </button>
        </motion.div>
      </motion.div>
    </>
  );
};

export default ShareOverlay;
