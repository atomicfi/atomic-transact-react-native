import React, { createContext, useContext, useMemo } from 'react';
import { usePersistedState } from './usePersistedState';

// Identity + card fields returned from onDataRequest when a deferred payment
// (deferredPaymentMethodStrategy: sdk) asks the host app for data. Shape mirrors
// the SDK's TransactDataResponse (card / identity).
export interface DataRequestState {
  firstName: string;
  lastName: string;
  address: string;
  address2: string;
  postalCode: string;
  city: string;
  state: string;
  phone: string;
  email: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvv: string;
  cardType: 'credit' | 'debit';
}

const DEFAULT_STATE: DataRequestState = {
  firstName: '',
  lastName: '',
  address: '',
  address2: '',
  postalCode: '',
  city: '',
  state: '',
  phone: '',
  email: '',
  cardNumber: '',
  cardExpiry: '',
  cardCvv: '',
  cardType: 'credit',
};

export interface DataResponse {
  card?: {
    number: string;
    expiry?: string;
    cvv?: string;
    cardType?: 'credit' | 'debit';
  };
  identity?: {
    firstName?: string;
    lastName?: string;
    postalCode?: string;
    address?: string;
    address2?: string;
    city?: string;
    state?: string;
    phone?: string;
    email?: string;
  };
}

interface DataRequestContextValue {
  state: DataRequestState;
  update: (patch: Partial<DataRequestState>) => void;
  clearAll: () => void;
  // Builds the onDataRequest response, or null when nothing is filled in.
  makeResponse: () => DataResponse | null;
}

const DataRequestContext = createContext<DataRequestContextValue | null>(null);

function trimmedOrUndefined(value: string): string | undefined {
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

export const DataRequestProviderState: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [state, setState] = usePersistedState<DataRequestState>(
    'demo_data_request',
    DEFAULT_STATE
  );

  const value = useMemo<DataRequestContextValue>(() => {
    const update = (patch: Partial<DataRequestState>) =>
      setState((prev) => ({ ...prev, ...patch }));

    const makeResponse = (): DataResponse | null => {
      const identityEntries = {
        firstName: trimmedOrUndefined(state.firstName),
        lastName: trimmedOrUndefined(state.lastName),
        postalCode: trimmedOrUndefined(state.postalCode),
        address: trimmedOrUndefined(state.address),
        address2: trimmedOrUndefined(state.address2),
        city: trimmedOrUndefined(state.city),
        state: trimmedOrUndefined(state.state),
        phone: trimmedOrUndefined(state.phone),
        email: trimmedOrUndefined(state.email),
      };
      // Matches the Android demo: address2 alone doesn't count as identity data.
      const hasIdentity = [
        identityEntries.firstName,
        identityEntries.lastName,
        identityEntries.postalCode,
        identityEntries.address,
        identityEntries.city,
        identityEntries.state,
        identityEntries.phone,
        identityEntries.email,
      ].some((v) => v !== undefined);

      const number = trimmedOrUndefined(state.cardNumber);
      const rawExpiry = state.cardExpiry.replace(/\D/g, '');
      const card = number
        ? {
            number,
            expiry:
              rawExpiry.length === 4
                ? `${rawExpiry.slice(0, 2)}/${rawExpiry.slice(2)}`
                : rawExpiry || undefined,
            cvv: trimmedOrUndefined(state.cardCvv),
            cardType: state.cardType,
          }
        : undefined;

      if (!hasIdentity && !card) return null;
      return {
        ...(card ? { card } : {}),
        ...(hasIdentity ? { identity: identityEntries } : {}),
      };
    };

    return {
      state,
      update,
      clearAll: () => setState(DEFAULT_STATE),
      makeResponse,
    };
  }, [state, setState]);

  return (
    <DataRequestContext.Provider value={value}>
      {children}
    </DataRequestContext.Provider>
  );
};

export function useDataRequest(): DataRequestContextValue {
  const ctx = useContext(DataRequestContext);
  if (!ctx) {
    throw new Error(
      'useDataRequest must be used within a DataRequestProviderState'
    );
  }
  return ctx;
}
