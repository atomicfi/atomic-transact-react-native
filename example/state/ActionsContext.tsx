import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { usePersistedState } from './usePersistedState';
import {
  decodeGroups,
  fetchActionGroups,
  groupsToJson,
} from '../constants/actionModels';
import type { AccountGroup } from '../constants/actionModels';

interface ActionsContextValue {
  groups: AccountGroup[];
  lastChanged: number | null;
  editorText: string;
  setEditorText: (text: string) => void;
  syncEditorFromStored: () => void;
  saveEditor: () => boolean;
  clearAll: () => void;
  fetchActions: (apiBase: string, publicToken: string) => Promise<void>;
}

const ActionsContext = createContext<ActionsContextValue | null>(null);

export const ActionsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [groups, setGroups, groupsHydrated] = usePersistedState<AccountGroup[]>(
    'transact_paylink_action_groups',
    []
  );
  const [lastChanged, setLastChanged] = usePersistedState<number | null>(
    'transact_paylink_actions_last_changed',
    null
  );
  const [editorText, setEditorText] = useState('[]');
  const seeded = useRef(false);

  // Seed the editor draft from stored groups once, after hydration.
  useEffect(() => {
    if (groupsHydrated && !seeded.current) {
      seeded.current = true;
      setEditorText(groupsToJson(groups));
    }
  }, [groupsHydrated, groups]);

  const value = useMemo<ActionsContextValue>(() => {
    const persist = (next: AccountGroup[]) => {
      setGroups(next);
      setLastChanged(Date.now());
    };

    return {
      groups,
      lastChanged,
      editorText,
      setEditorText,
      syncEditorFromStored: () => setEditorText(groupsToJson(groups)),
      saveEditor: () => {
        const decoded = decodeGroups(editorText);
        if (!decoded) return false;
        persist(decoded);
        setEditorText(groupsToJson(decoded));
        return true;
      },
      clearAll: () => {
        setGroups([]);
        setLastChanged(null);
        setEditorText('[]');
      },
      fetchActions: async (apiBase: string, publicToken: string) => {
        const fetched = await fetchActionGroups(apiBase, publicToken);
        persist(fetched);
        setEditorText(groupsToJson(fetched));
      },
    };
  }, [groups, lastChanged, editorText, setGroups, setLastChanged]);

  return (
    <ActionsContext.Provider value={value}>{children}</ActionsContext.Provider>
  );
};

export function useActions(): ActionsContextValue {
  const ctx = useContext(ActionsContext);
  if (!ctx) {
    throw new Error('useActions must be used within an ActionsProvider');
  }
  return ctx;
}
