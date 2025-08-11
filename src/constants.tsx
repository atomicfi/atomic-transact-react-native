export const Product = {
  DEPOSIT: 'deposit',
  VERIFY: 'verify',
  IDENTIFY: 'identify',
  WITHHOLD: 'withhold',
  PRESENT: 'present',
  SWITCH: 'switch',
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
