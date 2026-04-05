import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useStore from '../store/useStore';

const ActivityLog = () => {
  const activityLog = useStore((state) => state.activityLog);

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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
      <AnimatePresence initial={false}>
        {activityLog.map((log) => (
          <motion.div
            key={log.id}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            style={{
              padding: '12px 0 12px 16px', borderLeft: `3px solid ${getColor(log.type)}`,
              display: 'flex', flexDirection: 'column', gap: '4px', cursor: 'default'
            }}
            whileHover={{ backgroundColor: 'var(--surface-1)' }}
          >
            <div className="mono" style={{ fontSize: '0.65rem', color: 'var(--text-3)' }}>{log.time}</div>
            <div style={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--text-1)' }}>{log.title}</div>
            {log.sub && <div style={{ fontSize: '0.75rem', color: 'var(--text-2)' }}>{log.sub}</div>}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ActivityLog;
