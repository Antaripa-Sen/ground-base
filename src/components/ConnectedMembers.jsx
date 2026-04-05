import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useStore from '../store/useStore';

const ConnectedMembers = () => {
  const { members, addMember } = useStore();

  useEffect(() => {
    if (members.length === 1) { // Only YOU
      const t1 = setTimeout(() => {
        addMember({ initials: 'MK', name: 'Marcus K.', color: '#3d8eff', role: 'MEMBER' });
      }, 4000);
      const t2 = setTimeout(() => {
        addMember({ initials: 'AR', name: 'Aisha R.', color: '#f5a623', role: 'MEMBER' });
      }, 10000);

      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
  }, [members.length, addMember]);

  return (
    <div>
      <div className="mono" style={{ fontSize: '0.6rem', color: 'var(--text-3)', letterSpacing: '0.3em' }}>CONNECTED</div>
      <div className="bebas" style={{ fontSize: '2.5rem', color: 'var(--live)' }}>{members.length}</div>
      
      <div style={{ display: 'flex', flexDirection: 'column', marginTop: '12px' }}>
        <AnimatePresence>
          {members.map((member) => (
            <motion.div
              key={member.initials}
              initial={{ x: -16, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: 'spring' }}
              style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 0' }}
            >
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: member.color, border: `2px solid ${member.color}80`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.75rem', fontWeight: 700, position: 'relative' }}>
                {member.initials}
                <div style={{ position: 'absolute', bottom: '-2px', right: '-2px', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--live)', border: '2px solid var(--void)' }} />
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-1)' }}>{member.name}</span>
                  {member.initials === 'YOU' && <span className="mono" style={{ fontSize: '0.6rem', color: 'var(--live)', padding: '2px 4px', backgroundColor: 'var(--live-dim)', borderRadius: '4px' }}>YOU</span>}
                </div>
                <div className="mono" style={{ fontSize: '0.62rem', color: 'var(--text-3)' }}>{member.role}</div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ConnectedMembers;
