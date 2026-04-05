import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useStore from '../store/useStore';

const TaskCard = ({ task }) => {
  const { taskStates, taskCompletedAt, cycleTask } = useStore();
  const state = taskStates[task.id] || 'unclaimed';
  const completedAt = taskCompletedAt[task.id];

  const getStyles = () => {
    switch(state) {
      case 'claimed':
        return {
          borderTop: '2px solid var(--pending)',
          accentBg: 'var(--pending)',
          bg: 'var(--pending-dim)',
          boxShadow: '0 0 20px rgba(245,166,35,0.1)'
        };
      case 'completed':
        return {
          borderTop: '2px solid var(--live)',
          accentBg: 'var(--live)',
          bg: 'var(--live-dim)',
          boxShadow: 'none'
        };
      default: // unclaimed
        return {
          borderTop: '1px solid transparent',
          accentBg: 'var(--line-mid)',
          bg: 'var(--surface-1)',
          boxShadow: 'none'
        };
    }
  };

  const styles = getStyles();

  return (
    <motion.button
      layout
      onClick={() => cycleTask(task.id, task.title)}
      whileHover={state === 'unclaimed' ? { y: -2, boxShadow: '0 4px 12px rgba(0,0,0,0.3)', borderColor: 'var(--line-mid)', backgroundColor: 'var(--surface-2)' } : { y: -1 }}
      animate={{ backgroundColor: styles.bg, borderTop: styles.borderTop, boxShadow: styles.boxShadow }}
      transition={{ duration: 0.2 }}
      style={{
        width: '100%', minHeight: '130px', borderRadius: '10px',
        borderLeft: '1px solid var(--line)', borderRight: '1px solid var(--line)', borderBottom: '1px solid var(--line)',
        padding: '16px', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column',
        textAlign: 'left', cursor: 'pointer'
      }}
    >
      <motion.div layout animate={{ backgroundColor: styles.accentBg }} style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '3px' }} />
      
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'flex-start' }}>
        <div className="mono" style={{ fontSize: '0.65rem', color: 'var(--text-3)' }}>{task.num}</div>
        
        <AnimatePresence>
          {state === 'completed' && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ type: 'spring', stiffness: 400, damping: 15 }} style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'var(--live)', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', position: 'absolute', top: '16px', right: '16px' }} className="bebas">✓</motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.div layout style={{ marginTop: '4px', fontSize: '1rem', fontWeight: 600, color: state === 'completed' ? 'var(--text-3)' : 'var(--text-1)', textDecoration: state === 'completed' ? 'line-through' : 'none' }}>
        {task.title}
      </motion.div>
      
      <motion.div layout style={{ marginTop: '4px', fontSize: '0.8rem', color: 'var(--text-2)' }}>
        {task.description}
      </motion.div>

      <motion.div layout style={{ marginTop: 'auto', paddingTop: '16px', display: 'flex', alignItems: 'center', gap: '6px' }} className="mono">
        {state === 'unclaimed' && (
          <span style={{ fontSize: '0.65rem', color: 'var(--text-3)' }}>TAP TO CLAIM →</span>
        )}
        {state === 'claimed' && (
          <>
            <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.2, repeat: Infinity }} style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--pending)' }} />
            <span style={{ fontSize: '0.65rem', color: 'var(--pending)' }}>YOU — IN PROGRESS</span>
          </>
        )}
        {state === 'completed' && (
          <span style={{ fontSize: '0.65rem', color: 'var(--live)' }}>✓ COMPLETE · {completedAt}</span>
        )}
      </motion.div>
    </motion.button>
  );
};

export default TaskCard;
