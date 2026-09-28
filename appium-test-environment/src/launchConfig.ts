import { Environment, Product, Scope } from '@atomicfi/transact-react-native';
import type { TransactEnvironment } from '@atomicfi/transact-react-native';

/**
 * The TRANSACT_* intent extras the conformance suite launches this app with. Mirrors the contract
 * implemented by the native Android test app.
 */
export interface LaunchExtras {
  TRANSACT_LAUNCH_ID?: string;
  TRANSACT_PUBLIC_TOKEN?: string;
  TRANSACT_URL?: string;
  TRANSACT_PRODUCT_TYPE?: string;
  TRANSACT_SCOPE_TYPE?: string;
  TRANSACT_DEEPLINK?: string;
  TRANSACT_HANDOFF?: string;
  TRANSACT_CUSTOM_FLOW?: string;
  TRANSACT_DEFERRED_PAYMENT_METHOD_STRATEGY?: string;
  TRANSACT_ACTION_ID?: string;
}

const PRODUCTS: Record<string, string> = {
  deposit: Product.DEPOSIT,
  verify: Product.VERIFY,
  identify: Product.IDENTIFY,
  switch: Product.SWITCH,
  withhold: Product.WITHHOLD,
  present: Product.PRESENT,
  manage: Product.MANAGE,
};

const SCOPES: Record<string, string> = {
  'user-link': Scope.USERLINK,
  'user_link': Scope.USERLINK,
  'employer-link': Scope.EMPLOYERLINK,
  'employer_link': Scope.EMPLOYERLINK,
  'pay-link': Scope.PAYLINK,
  'pay_link': Scope.PAYLINK,
};

/** The suite base64-encodes the deeplink JSON, matching what the native app decodes. */
export function decodeDeeplink(
  encoded?: string
): Record<string, unknown> | null {
  if (!encoded) return null;

  try {
    // The payload is ASCII JSON (step/companyId/connectorId), so atob's binary string is the JSON
    // as-is; no UTF-8 decoding step is needed.
    return JSON.parse(globalThis.atob(encoded));
  } catch {
    return null;
  }
}

export function isLaunchable(extras: LaunchExtras): boolean {
  return Boolean(
    extras.TRANSACT_PUBLIC_TOKEN &&
    extras.TRANSACT_URL &&
    extras.TRANSACT_PRODUCT_TYPE &&
    extras.TRANSACT_SCOPE_TYPE
  );
}

export function buildEnvironment(extras: LaunchExtras): TransactEnvironment {
  if (extras.TRANSACT_URL) {
    return Environment.custom(
      extras.TRANSACT_URL,
      process.env.EXPO_PUBLIC_API_URL || 'https://api.atomicfi.com'
    );
  }
  return Environment.sandbox;
}

export function buildConfig(extras: LaunchExtras): Record<string, unknown> {
  const product =
    PRODUCTS[(extras.TRANSACT_PRODUCT_TYPE || '').toLowerCase()] ||
    Product.DEPOSIT;
  const scope =
    SCOPES[(extras.TRANSACT_SCOPE_TYPE || '').toLowerCase()] || Scope.USERLINK;

  const config: Record<string, unknown> = {
    publicToken: extras.TRANSACT_PUBLIC_TOKEN,
    scope,
    tasks: [
      extras.TRANSACT_ACTION_ID
        ? { operation: 'action', action: { id: extras.TRANSACT_ACTION_ID } }
        : { operation: product },
    ],
  };

  const deeplink = decodeDeeplink(extras.TRANSACT_DEEPLINK);
  if (deeplink) {
    config.deeplink = deeplink;
  }

  // The bridge types handoff as a string and passes the config through verbatim, so send the
  // comma-separated value as-is rather than the array the native SDKs take.
  const handoff = extras.TRANSACT_HANDOFF?.trim();
  if (handoff) {
    config.handoff = handoff;
  }

  if (extras.TRANSACT_DEFERRED_PAYMENT_METHOD_STRATEGY) {
    config.deferredPaymentMethodStrategy =
      extras.TRANSACT_DEFERRED_PAYMENT_METHOD_STRATEGY.toLowerCase();
  }

  return config;
}
