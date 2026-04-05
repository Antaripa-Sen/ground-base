import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const StreamingBlock = ({ block, onComplete, startDelay = 0 }) => {
  const [text, setText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    let timeout;
    let charIndex = 0;

    const startTyping = () => {
      setHasStarted(true);
      setIsTyping(true);
      
      const typeChar = () => {
        if (charIndex < block.body.length) {
          setText(prev => prev + block.body.charAt(charIndex));
          charIndex++;
          timeout = setTimeout(typeChar, 22);
        } else {
          setIsTyping(false);
          onComplete();
        }
      };
      
      typeChar();
    };

    timeout = setTimeout(startTyping, startDelay);
    
    return () => clearTimeout(timeout);
  }, [block, startDelay]);

  if (!hasStarted) return null;

  return (
    <div style={{ marginBottom: '16px' }}>
      <div className="mono" style={{ fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: `var(--${block.color})`, marginBottom: '8px' }}>
        {block.heading}
      </div>
      <div style={{ fontSize: '0.9rem', color: 'var(--text-1)', lineHeight: 1.65, whiteSpace: 'pre-wrap' }}>
        {text}
        {isTyping && (
          <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, ease: 'steps(1)', repeat: Infinity }} className="mono" style={{ color: 'var(--text-3)', marginLeft: '4px' }}>▌</motion.span>
        )}
      </div>
    </div>
  );
};

const AITriagePanel = ({ blocks }) => {
  const [activeBlock, setActiveBlock] = useState(0);
  const [complete, setComplete] = useState(false);

  const handleBlockComplete = () => {
    if (activeBlock < blocks.length - 1) {
      setTimeout(() => {
        setActiveBlock(prev => prev + 1);
      }, 400); // 400ms pause between blocks
    } else {
      setComplete(true);
    }
  };

  return (
    <motion.div animate={complete ? { borderColor: ['var(--line)', 'var(--live)', 'var(--line)'] } : {}} transition={{ duration: 0.6 }} style={{ backgroundColor: 'var(--surface-1)', border: '1px solid var(--line)', borderTop: '3px solid var(--live)', borderRadius: '12px', padding: '24px', marginBottom: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--live)" strokeWidth="2"><path d="M12 2l8.66 5v10L12 22l-8.66-5V7L12 2z"/></svg>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--live)', letterSpacing: '0.1em' }}>AI TRIAGE</span>
        </div>
        
        <div className="mono">
          {complete ? (
            <span style={{ fontSize: '0.7rem', color: 'var(--live)', padding: '4px 8px', backgroundColor: 'var(--live-dim)', borderRadius: '4px' }}>● COMPLETE</span>
          ) : (
            <span style={{ display: 'flex', gap: '4px' }}>
              <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--text-2)' }} />
              <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--text-2)' }} />
              <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }} style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--text-2)' }} />
            </span>
          )}
        </div>
      </div>
      
      <div>
        {blocks.map((block, index) => (
          index <= activeBlock && (
            <StreamingBlock key={index} block={block} onComplete={handleBlockComplete} startDelay={index === 0 ? 500 : 0} />
          )
        ))}
      </div>
    </motion.div>
  );
};

export default AITriagePanel;
