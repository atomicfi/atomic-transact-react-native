import React, { createContext, useContext, useMemo } from 'react';
import { usePersistedState } from './usePersistedState';

export type PayLinkStartingScreen = 'welcome' | 'search' | 'companyLogin';

// Pay Link tasks are mutually exclusive — exactly one runs at a time.
export type PayLinkTask = 'switch' | 'present' | 'manage';

export interface PayLinkState {
  task: PayLinkTask;
  apps: string[];
  startingScreen: PayLinkStartingScreen;
  companyLoginId: string;
  companyLoginName: string;
  useSDKPaymentResponse: boolean;
}

const DEFAULT_STATE: PayLinkState = {
  task: 'switch',
  apps: [],
  startingScreen: 'welcome',
  companyLoginId: '',
  companyLoginName: '',
  useSDKPaymentResponse: false,
};

interface PayLinkContextValue {
  state: PayLinkState;
  update: (patch: Partial<PayLinkState>) => void;
  setCompany: (id: string, name: string) => void;
}

const PayLinkContext = createContext<PayLinkContextValue | null>(null);

export const PayLinkProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = usePersistedState<PayLinkState>(
    'demo_paylink_v2',
    DEFAULT_STATE
  );

  const value = useMemo<PayLinkContextValue>(() => {
    const update = (patch: Partial<PayLinkState>) =>
      setState((prev) => ({ ...prev, ...patch }));
    return {
      state,
      update,
      setCompany: (id, name) =>
        update({ companyLoginId: id, companyLoginName: name }),
    };
  }, [state, setState]);

  return (
    <PayLinkContext.Provider value={value}>{children}</PayLinkContext.Provider>
  );
};

export function usePayLink(): PayLinkContextValue {
  const ctx = useContext(PayLinkContext);
  if (!ctx) {
    throw new Error('usePayLink must be used within a PayLinkProvider');
  }
  return ctx;
}
