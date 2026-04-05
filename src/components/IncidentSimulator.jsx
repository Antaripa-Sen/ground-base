import React, { useEffect } from 'react';
import useStore from '../store/useStore';
import { CRISIS_DATA } from '../data/crisisData';

const IncidentSimulator = () => {
  const { incidentStartTime, isResolved, selectedCrisis, addLog, setTaskState } = useStore();

  useEffect(() => {
    if (!incidentStartTime || isResolved) return;

    const crisis = CRISIS_DATA[selectedCrisis];
    const tasks = crisis.tasks;

    let timeouts = [];

    // System logs sequence
    timeouts.push(setTimeout(() => addLog('system', 'Establishing secure comms channel...'), 2000));
    timeouts.push(setTimeout(() => addLog('system', 'Cross-referencing live sensor data...'), 8000));
    timeouts.push(setTimeout(() => addLog('system', 'Local authorities notified of active incident.'), 15000));

    // Simulated task actions by others (assuming Marcus K and Aisha R join)
    if (tasks.length > 0) {
      timeouts.push(setTimeout(() => setTaskState(tasks[0].id, tasks[0].title, 'claimed', 'Marcus K.'), 6000));
      timeouts.push(setTimeout(() => setTaskState(tasks[0].id, tasks[0].title, 'completed', 'Marcus K.'), 14000));
    }
    
    if (tasks.length > 1) {
      timeouts.push(setTimeout(() => setTaskState(tasks[1].id, tasks[1].title, 'claimed', 'Aisha R.'), 11000));
      timeouts.push(setTimeout(() => setTaskState(tasks[1].id, tasks[1].title, 'completed', 'Aisha R.'), 22000));
    }

    return () => timeouts.forEach(clearTimeout);
  }, [incidentStartTime, isResolved, selectedCrisis, addLog, setTaskState]);

  return null;
};

export default IncidentSimulator;
