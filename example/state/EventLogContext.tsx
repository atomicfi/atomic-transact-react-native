import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import { usePersistedState } from './usePersistedState';
import type { EventType } from '../constants/eventTypes';

export interface LoggedEvent {
  id: string;
  time: number;
  type: EventType;
  body?: string;
  secondary?: string;
  raw: unknown;
}

interface EventPayload {
  body?: string;
  secondary?: string;
  raw?: unknown;
}

interface EventLogContextValue {
  events: LoggedEvent[];
  unreadCount: number;
  logEvent: (type: EventType, payload?: EventPayload) => void;
  clear: () => void;
  markRead: () => void;
}

const EventLogContext = createContext<EventLogContextValue | null>(null);

const STORAGE_KEY = 'demo_event_log';
const MAX_EVENTS = 200;

export const EventLogProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [events, setEvents] = usePersistedState<LoggedEvent[]>(STORAGE_KEY, []);
  const [unreadCount, setUnreadCount] = useState(0);
  const counter = useRef(0);

  const logEvent = useCallback(
    (type: EventType, payload: EventPayload = {}) => {
      counter.current += 1;
      const event: LoggedEvent = {
        id: `${Date.now()}-${counter.current}`,
        time: Date.now(),
        type,
        body: payload.body,
        secondary: payload.secondary,
        raw: payload.raw ?? null,
      };
      setEvents((prev) => {
        const next = [...prev, event];
        return next.length > MAX_EVENTS
          ? next.slice(next.length - MAX_EVENTS)
          : next;
      });
      setUnreadCount((c) => c + 1);
    },
    [setEvents]
  );

  const clear = useCallback(() => {
    setEvents([]);
    setUnreadCount(0);
  }, [setEvents]);

  const markRead = useCallback(() => setUnreadCount(0), []);

  const value = useMemo<EventLogContextValue>(
    () => ({ events, unreadCount, logEvent, clear, markRead }),
    [events, unreadCount, logEvent, clear, markRead]
  );

  return (
    <EventLogContext.Provider value={value}>
      {children}
    </EventLogContext.Provider>
  );
};

export function useEventLog(): EventLogContextValue {
  const ctx = useContext(EventLogContext);
  if (!ctx) {
    throw new Error('useEventLog must be used within an EventLogProvider');
  }
  return ctx;
}

function asString(value: unknown): string | undefined {
  if (value == null) return undefined;
  if (typeof value === 'string') return value;
  if (typeof value === 'number' || typeof value === 'boolean')
    return String(value);
  return undefined;
}

// Callbacks passed to Atomic.transact that funnel every SDK event into the log.
// Payload shapes differ slightly between iOS and Android, so every field is read
// defensively.
export function useTransactCallbacks() {
  const { logEvent } = useEventLog();

  return useMemo(
    () => ({
      onLaunch: () =>
        logEvent('launch', { body: 'Transact launched', raw: {} }),
      onInteraction: (interaction: any) =>
        logEvent('interaction', {
          body: asString(interaction?.name) ?? 'Interaction',
          secondary: asString(interaction?.identifier),
          raw: interaction,
        }),
      onDataRequest: (request: any) =>
        logEvent('dataRequest', {
          body: asString(request?.identifier) ?? 'Data requested',
          secondary: request?.fields
            ? `fields: ${Array.isArray(request.fields) ? request.fields.length : ''}`
            : undefined,
          raw: request,
        }),
      onAuthStatusUpdate: (update: any) =>
        logEvent('authStatusUpdate', {
          body: asString(update?.status) ?? 'Auth status',
          secondary: asString(update?.company?.name),
          raw: update,
        }),
      onTaskStatusUpdate: (update: any) => {
        const status = asString(update?.status) ?? '';
        const product = asString(update?.product) ?? '';
        const parts = [asString(update?.taskId) && `task: ${update.taskId}`];
        if (update?.actionType)
          parts.push(`action: ${asString(update.actionType)}`);
        if (update?.failReason)
          parts.push(`reason: ${asString(update.failReason)}`);
        logEvent('taskStatusUpdate', {
          body: [status, product].filter(Boolean).join(' | ') || 'Task status',
          secondary: parts.filter(Boolean).join(' | ') || undefined,
          raw: update,
        });
      },
      onFinish: (response: any) =>
        logEvent('finish', { body: 'Transact finished', raw: response ?? {} }),
      onClose: (response: any) =>
        logEvent('close', { body: 'Transact closed', raw: response ?? {} }),
    }),
    [logEvent]
  );
}
