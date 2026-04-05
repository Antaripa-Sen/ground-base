import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useStore from '../store/useStore';
import { CRISIS_DATA } from '../data/crisisData';
import AITriagePanel from './AITriagePanel';
import TaskCard from './TaskCard';
import ActivityLog from './ActivityLog';
import ConnectedMembers from './ConnectedMembers';
import CallModal from './CallModal';
import CloseIncidentFlow from './CloseIncidentFlow';
import ShareOverlay from './ShareOverlay';
import useTimer from '../hooks/useTimer';
import IncidentSimulator from './IncidentSimulator';

const IncidentRoom = () => {
  const { selectedCrisis, incidentId, isResolved, taskStates } = useStore();
  const crisis = CRISIS_DATA[selectedCrisis];
  const { displayTime } = useTimer();
  
  const [modalType, setModalType] = React.useState(null);
  
  const completedTasks = Object.values(taskStates).filter(s => s === 'completed').length;
  
  return (
    <div className="incident-layout">
      {/* COLUMN A - SIDEBAR */}
      <div className="col-sidebar">
        <div className="bebas" style={{ fontSize: '1.4rem', color: '#fff' }}>GROUNDBASE</div>
        <div className="mono" style={{ fontSize: '0.7rem', color: 'var(--live)', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--live)' }} /> GRB-{incidentId}
        </div>
        
        <div style={{ height: '1px', backgroundColor: 'var(--line)', margin: '24px 0' }} />
        
        <div>
          <div className="mono" style={{ fontSize: '0.6rem', color: 'var(--text-3)', letterSpacing: '0.3em' }}>STATUS</div>
          <div className="bebas" style={{ fontSize: '2.2rem', color: isResolved ? 'var(--live)' : 'var(--crisis)' }}>{isResolved ? 'RESOLVED' : 'ACTIVE'}</div>
          
          <div style={{ marginTop: '16px' }}>
            <div className="mono" style={{ fontSize: '0.6rem', color: 'var(--text-3)' }}>ELAPSED</div>
            <div className="bebas" style={{ fontSize: '3rem', color: 'var(--text-1)' }}>{displayTime}</div>
          </div>
        </div>

        <div style={{ height: '1px', backgroundColor: 'var(--line)', margin: '24px 0' }} />
        
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1.6rem' }}>{crisis.icon}</span>
            <span className="bebas" style={{ fontSize: '1.6rem', color: crisis.color }}>{crisis.label}</span>
          </div>
          <div className="mono" style={{ fontSize: '0.65rem', color: 'var(--text-3)' }}>INCIDENT TYPE</div>
        </div>
        
        <div style={{ height: '1px', backgroundColor: 'var(--line)', margin: '24px 0' }} />
        
        <ConnectedMembers />
        
        <div style={{ marginTop: 'auto' }}>
          <button 
            onClick={() => setModalType('close')}
            style={{ width: '100%', padding: '12px', border: '1px solid var(--line-mid)', backgroundColor: 'transparent', color: 'var(--text-3)', borderRadius: '6px', fontWeight: 500, fontSize: '0.85rem' }}
          >
            CLOSE INCIDENT
          </button>
        </div>
      </div>

      {/* COLUMN B - MAIN */}
      <div className="col-main">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <motion.div animate={isResolved ? {} : { opacity: [1, 0.3, 1] }} transition={{ duration: 1, repeat: Infinity }} style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: isResolved ? 'var(--live)' : 'var(--crisis)' }} />
            <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{isResolved ? 'INCIDENT RESOLVED' : 'INCIDENT ACTIVE'}</span>
          </div>
          <button onClick={() => setModalType('share')} style={{ background: 'none', color: 'var(--text-2)', fontSize: '1.2rem', padding: '4px' }}>↗</button>
        </div>
        <div style={{ height: '1px', background: isResolved ? 'var(--live-dim)' : 'rgba(255,59,59,0.4)', marginBottom: '24px' }} />
        
        {isResolved ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} style={{ backgroundColor: 'var(--live-dim)', border: '1px solid var(--live)', borderTop: '3px solid var(--live)', borderRadius: '12px', padding: '28px', textAlign: 'center' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--live)', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: '1.5rem', fontWeight: 700 }}>✓</div>
            <div className="bebas" style={{ fontSize: '2rem', color: 'var(--live)' }}>INCIDENT RESOLVED</div>
            <button onClick={() => useStore.getState().resetAll()} style={{ marginTop: '24px', width: '100%', padding: '14px', borderRadius: '10px', border: '1px solid var(--live)', background: 'transparent', color: 'var(--live)', fontWeight: 600 }}>RETURN TO HOME</button>
          </motion.div>
        ) : (
          <>
            <AITriagePanel blocks={crisis.aiBlocks} />
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '32px 0 16px' }}>
              <div className="bebas" style={{ fontSize: '1.2rem', color: 'var(--text-2)' }}>RESPONSE TASKS</div>
              <div className="mono" style={{ fontSize: '0.7rem', color: 'var(--live)' }}>{completedTasks}/4 COMPLETE</div>
            </div>
            
            <div className="task-grid">
              {crisis.tasks.map(task => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>

            <div className="bebas" style={{ fontSize: '1.2rem', color: 'var(--text-2)', marginTop: '40px', marginBottom: '16px' }}>EMERGENCY COMMS</div>
            <div className="comms-row">
              <button onClick={() => setModalType('primary')} style={{ flex: 1, height: '72px', borderRadius: '10px', backgroundColor: 'var(--surface-1)', border: '1px solid rgba(61,142,255,0.4)', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'rgba(61,142,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>{crisis.primaryCallIcon}</div>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#fff' }}>{crisis.primaryCallLabel}</div>
                    <div className="mono" style={{ fontSize: '0.65rem', color: 'var(--text-3)' }}>Priority line</div>
                  </div>
                </div>
                <div style={{ color: 'var(--signal)', fontSize: '1.2rem' }}>→</div>
              </button>
              
              <button onClick={() => setModalType('secondary')} style={{ flex: 1, height: '72px', borderRadius: '10px', backgroundColor: 'var(--surface-1)', border: '1px solid rgba(255,59,59,0.4)', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'rgba(255,59,59,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>{crisis.secondaryCallIcon}</div>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#fff' }}>{crisis.secondaryCallLabel}</div>
                    <div className="mono" style={{ fontSize: '0.65rem', color: 'var(--text-3)' }}>Secondary line</div>
                  </div>
                </div>
                <div style={{ color: 'var(--crisis)', fontSize: '1.2rem' }}>→</div>
              </button>
            </div>
          </>
        )}
      </div>

      {/* COLUMN C - FEED */}
      <div className="col-feed">
        <div className="bebas" style={{ fontSize: '1.4rem', color: 'var(--text-2)' }}>ACTIVITY</div>
        <div className="mono" style={{ fontSize: '0.65rem', color: 'var(--text-3)' }}>LIVE FEED</div>
        <div style={{ height: '1px', backgroundColor: 'var(--line)', margin: '16px 0' }} />
        <ActivityLog />
      </div>

      {/* Modals */}
      <AnimatePresence>
        {modalType === 'primary' && <CallModal type="primary" onClose={() => setModalType(null)} script={crisis.primaryScript} title={`${crisis.primaryCallLabel} SCRIPT`} color="var(--signal)" icon={crisis.primaryCallIcon} />}
        {modalType === 'secondary' && <CallModal type="secondary" onClose={() => setModalType(null)} script={crisis.secondaryScript} title={`${crisis.secondaryCallLabel} SCRIPT`} color="var(--crisis)" icon={crisis.secondaryCallIcon} />}
        {modalType === 'close' && <CloseIncidentFlow onClose={() => setModalType(null)} />}
        {modalType === 'share' && <ShareOverlay onClose={() => setModalType(null)} />}
      </AnimatePresence>
      <IncidentSimulator />
    </div>
  );
};

export default IncidentRoom;
