import { create } from 'zustand';

const useStore = create((set, get) => ({
  screen: 'landing',
  selectedCrisis: 'medical',
  incidentId: null,
  incidentStartTime: null,
  taskStates: {}, // { id: 'unclaimed' | 'claimed' | 'completed' }
  taskCompletedAt: {}, // { id: 'HH:MM:SS' }
  members: [],
  activityLog: [],
  toasts: [],
  isResolved: false,
  resolvedAt: null,

  selectCrisis: (crisisId) => set({ selectedCrisis: crisisId }),
  
  startIncident: () => {
    const id = Math.floor(Math.random() * 65535).toString(16).toUpperCase().padStart(4, '0');
    set({
      screen: 'incident',
      incidentId: id,
      incidentStartTime: Date.now(),
      taskStates: {},
      taskCompletedAt: {},
      activityLog: [{
        id: Date.now(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        type: 'system',
        title: `Incident active: GRB-${id}`,
        sub: ''
      }],
      members: [{ initials: 'YOU', name: 'You', color: '#05d97a', role: 'INCIDENT LEAD' }]
    });
  },

  cycleTask: (taskId, taskTitle) => {
    const state = get();
    const current = state.taskStates[taskId] || 'unclaimed';
    let next = 'unclaimed';
    
    if (current === 'unclaimed') next = 'claimed';
    else if (current === 'claimed') next = 'completed';
    else next = 'unclaimed';

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    
    set((s) => ({
      taskStates: { ...s.taskStates, [taskId]: next },
      taskCompletedAt: next === 'completed' ? { ...s.taskCompletedAt, [taskId]: timeStr } : s.taskCompletedAt
    }));
    
    if (next === 'claimed') {
      get().addLog('task_claim', `Task "${taskTitle}" claimed by YOU`);
    } else if (next === 'completed') {
      get().addLog('task_done', `Task "${taskTitle}" completed by YOU`);
    }
  },

  addMember: (member) => {
    set((s) => ({ members: [...s.members, member] }));
    get().addLog('member', `${member.name} joined`);
  },

  addLog: (type, title, sub = '') => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    set((s) => ({
      activityLog: [{ id: Date.now() + Math.random(), time, type, title, sub }, ...s.activityLog]
    }));
    get().addToast(type, title);
  },

  addToast: (type, message) => {
    const id = Date.now() + Math.random();
    set((s) => ({ toasts: [...s.toasts, { id, type, message }].slice(-3) }));
    setTimeout(() => {
      set((s) => ({ toasts: s.toasts.filter(t => t.id !== id) }));
    }, 3000);
  },

  resolveIncident: () => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    set({ isResolved: true, resolvedAt: timeStr });
    get().addLog('system', `Incident marked resolved`);
  },

  resetAll: () => set({
    screen: 'landing',
    incidentId: null,
    incidentStartTime: null,
    taskStates: {},
    taskCompletedAt: {},
    members: [],
    activityLog: [],
    isResolved: false,
    resolvedAt: null
  })
}));

export default useStore;
