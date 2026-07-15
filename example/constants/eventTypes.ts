// Event categories surfaced in the Events tab. Every category here maps to a
// Transact callback the RN SDK actually forwards (plus `error` for demo-side
// failures like a failed actions fetch).

export type EventType =
  | 'launch'
  | 'interaction'
  | 'dataRequest'
  | 'authStatusUpdate'
  | 'taskStatusUpdate'
  | 'finish'
  | 'close'
  | 'error';

interface EventMeta {
  label: string;
  title: string;
  color: string;
}

export const EVENT_META: Record<EventType, EventMeta> = {
  launch: { label: 'LAUNCH', title: 'Launch', color: '#8b5cf6' },
  interaction: { label: 'INTERACTION', title: 'Interaction', color: '#3b82f6' },
  dataRequest: { label: 'DATA', title: 'Data Request', color: '#10b981' },
  authStatusUpdate: { label: 'AUTH', title: 'Auth Status', color: '#6366f1' },
  taskStatusUpdate: { label: 'TASK', title: 'Task Status', color: '#06b6d4' },
  finish: { label: 'FINISH', title: 'Finish', color: '#22c55e' },
  close: { label: 'CLOSE', title: 'Close', color: '#64748b' },
  error: { label: 'ERROR', title: 'Error', color: '#ef4444' },
};

export const EVENT_TYPES = Object.keys(EVENT_META) as EventType[];
