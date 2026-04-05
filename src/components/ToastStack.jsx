import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useStore from '../store/useStore';

const ToastStack = () => {
  const toasts = useStore(state => state.toasts || []);

  const getColor = (type) => {
    switch (type) {
      case 'system': return 'var(--live)';
      case 'task_claim': return 'var(--pending)';
      case 'task_done': return 'var(--live)';
      case 'member': return 'var(--signal)';
      case 'comms': return 'var(--crisis)';
      case 'copy': return 'var(--text-2)';
      default: return 'var(--text-2)';
    }
  };

  return (
    <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 9999, pointerEvents: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ type: 'spring', duration: 0.25 }}
            style={{
              backgroundColor: 'var(--surface-1)', border: `1px solid ${getColor(toast.type)}`, borderLeft: `3px solid ${getColor(toast.type)}`,
              borderRadius: '10px', padding: '12px 16px', boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
              minWidth: '260px', maxWidth: '340px', display: 'flex', alignItems: 'center', gap: '10px', pointerEvents: 'auto'
            }}
          >
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: getColor(toast.type), flexShrink: 0 }} />
            <div style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-1)' }}>{toast.message}</div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ToastStack;
