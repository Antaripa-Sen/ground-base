import React, { useState, useEffect } from 'react';
import useStore from '../store/useStore';

const useTimer = () => {
  const { incidentStartTime, isResolved, resolvedAt } = useStore();
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!incidentStartTime || isResolved) return;
    
    // Initial sync
    setElapsed(Math.floor((Date.now() - incidentStartTime) / 1000));
    
    const interval = setInterval(() => {
      setElapsed(Math.floor((Date.now() - incidentStartTime) / 1000));
    }, 1000);
    
    return () => clearInterval(interval);
  }, [incidentStartTime, isResolved]);

  if (isResolved && resolvedAt) {
    return { displayTime: resolvedAt, totalSeconds: elapsed };
  }

  const m = String(Math.floor(elapsed / 60)).padStart(2, '0');
  const s = String(elapsed % 60).padStart(2, '0');
  
  return { displayTime: `${m}:${s}`, totalSeconds: elapsed };
};

export default useTimer;
