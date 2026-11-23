// btoa expects a latin-1 binary string, so we UTF-8 encode first to
// match the base64 output Buffer.from(input, 'utf8').toString('base64')
// would produce on Node.
export function utf8Base64(input: string): string {
  const bytes = new TextEncoder().encode(input);
  let binary = '';
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary);
}

type ReactNativeVersion = {
  major: number;
  minor: number;
  patch: number;
  // React Native types this as a number on macOS.
  prerelease?: string | number | null;
};

// Formats Platform.constants.reactNativeVersion as major.minor.patch, plus -prerelease when
// set. Returns null when the version isn't available, so native leaves it out of telemetry.
export function formatReactNativeVersion(
  version: ReactNativeVersion | null | undefined
): string | null {
  if (version == null) {
    return null;
  }
  const { major, minor, patch, prerelease } = version;
  const base = `${major}.${minor}.${patch}`;
  return prerelease == null || prerelease === ''
    ? base
    : `${base}-${prerelease}`;
}
