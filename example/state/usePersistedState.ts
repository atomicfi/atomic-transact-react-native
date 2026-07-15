import { useCallback, useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// useState backed by AsyncStorage. Hydrates once on mount and writes on every
// change after hydration. `hydrated` lets callers avoid persisting the initial
// value before the stored value has loaded.
export function usePersistedState<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, boolean] {
  const [state, setState] = useState<T>(initialValue);
  const [hydrated, setHydrated] = useState(false);
  const hydratedRef = useRef(false);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(key);
        if (active && raw != null) {
          setState(JSON.parse(raw) as T);
        }
      } catch (err) {
        console.warn(`Failed to hydrate "${key}"`, err);
      } finally {
        if (active) {
          hydratedRef.current = true;
          setHydrated(true);
        }
      }
    })();
    return () => {
      active = false;
    };
  }, [key]);

  useEffect(() => {
    if (!hydratedRef.current) return;
    AsyncStorage.setItem(key, JSON.stringify(state)).catch((err) =>
      console.warn(`Failed to persist "${key}"`, err)
    );
  }, [key, state]);

  const update = useCallback((value: T | ((prev: T) => T)) => {
    setState(value);
  }, []);

  return [state, update, hydrated];
}
