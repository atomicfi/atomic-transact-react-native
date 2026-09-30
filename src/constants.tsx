export const Product = {
  DEPOSIT: 'deposit',
  VERIFY: 'verify',
  IDENTIFY: 'identify',
  WITHHOLD: 'withhold',
  PRESENT: 'present',
  SWITCH: 'switch',
  MANAGE: 'manage',
};

export const Scope = {
  USERLINK: 'user-link',
  EMPLOYERLINK: 'employer-link',
  PAYLINK: 'pay-link',
};

export const PresentationStyles = {
  formSheet: 'formSheet',
  fullScreen: 'fullScreen',
} as const;

export type PresentationStyleIOS =
  (typeof PresentationStyles)[keyof typeof PresentationStyles];

export interface TransactEnvironment {
  environment: 'production' | 'sandbox' | 'custom';
  transactPath?: string;
  apiPath?: string;
}

export const Environment = {
  production: {
    environment: 'production' as const,
  } as TransactEnvironment,
  sandbox: {
    environment: 'sandbox' as const,
  } as TransactEnvironment,
  custom: (transactPath: string, apiPath: string): TransactEnvironment => ({
    environment: 'custom' as const,
    transactPath,
    apiPath,
  }),
};

export const DeferredPaymentMethodStrategy = {
  SDK: 'sdk',
  API: 'api',
};

export const App = {
  PAY_NOW: 'pay-now',
  EXPENSES: 'expenses',
  ORDERS: 'orders',
  SUGGESTIONS: 'suggestions',
} as const;

export type AppType = (typeof App)[keyof typeof App] | (string & {});

export const Step = {
  ADD_CARD: 'add-card',
  LOGIN_COMPANY: 'login-company',
  LOGIN_PAYROLL: 'login-payroll',
  SEARCH_COMPANY: 'search-company',
  SEARCH_PAYROLL: 'search-payroll',
  ACCOUNT: 'account',
} as const;

export type StepType = (typeof Step)[keyof typeof Step] | (string & {});

// Views Transact hands off to the host app instead of showing. Transact emits the matching
// event (onFinish or onClose) in their place, with `handoff` set to the value in its data.
export const Handoff = {
  EXIT_PROMPT: 'exit-prompt',
  AUTHENTICATION_SUCCESS: 'authentication-success',
  HIGH_LATENCY: 'high-latency',
  SELECTED_COMPANY: 'selected-company',
} as const;

export type HandoffType =
  (typeof Handoff)[keyof typeof Handoff] | (string & {});
