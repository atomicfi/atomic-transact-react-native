import React, { createContext, useContext, useMemo } from 'react';
import { usePersistedState } from './usePersistedState';

export type UserLinkStartingScreen = 'welcome' | 'search' | 'companyLogin';

// User Link tasks are mutually exclusive — exactly one runs at a time.
export type UserLinkTask = 'deposit' | 'verify';

export interface UserLinkState {
  task: UserLinkTask;
  startingScreen: UserLinkStartingScreen;
  companyLoginId: string;
  companyLoginName: string;
  searchRuleId: string;
}

const DEFAULT_STATE: UserLinkState = {
  task: 'deposit',
  startingScreen: 'welcome',
  companyLoginId: '',
  companyLoginName: '',
  searchRuleId: '',
};

interface UserLinkContextValue {
  state: UserLinkState;
  update: (patch: Partial<UserLinkState>) => void;
  setCompany: (id: string, name: string) => void;
}

const UserLinkContext = createContext<UserLinkContextValue | null>(null);

export const UserLinkProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = usePersistedState<UserLinkState>(
    'demo_userlink_v2',
    DEFAULT_STATE
  );

  const value = useMemo<UserLinkContextValue>(() => {
    const update = (patch: Partial<UserLinkState>) =>
      setState((prev) => ({ ...prev, ...patch }));
    return {
      state,
      update,
      setCompany: (id, name) =>
        update({ companyLoginId: id, companyLoginName: name }),
    };
  }, [state, setState]);

  return (
    <UserLinkContext.Provider value={value}>
      {children}
    </UserLinkContext.Provider>
  );
};

export function useUserLink(): UserLinkContextValue {
  const ctx = useContext(UserLinkContext);
  if (!ctx) {
    throw new Error('useUserLink must be used within a UserLinkProvider');
  }
  return ctx;
}
