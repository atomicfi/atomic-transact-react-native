import { formatReactNativeVersion, utf8Base64 } from '../utils';

describe('utf8Base64', () => {
  it('matches Buffer base64 output for ASCII input', () => {
    const input = 'hello world';
    expect(utf8Base64(input)).toBe(
      Buffer.from(input, 'utf8').toString('base64')
    );
  });

  it('matches Buffer base64 output for non-ASCII input', () => {
    const input = 'héllo 日本語 🌎';
    expect(utf8Base64(input)).toBe(
      Buffer.from(input, 'utf8').toString('base64')
    );
  });

  it('matches Buffer base64 output for a JSON payload', () => {
    const input = JSON.stringify({
      publicToken: 'pt-abc-123',
      tasks: [{ operation: 'auth' }],
      customer: { name: 'Aimée Müller' },
    });
    expect(utf8Base64(input)).toBe(
      Buffer.from(input, 'utf8').toString('base64')
    );
  });

  it('returns an empty string for empty input', () => {
    expect(utf8Base64('')).toBe('');
  });
});

describe('formatReactNativeVersion', () => {
  it('formats a release as major.minor.patch', () => {
    expect(
      formatReactNativeVersion({
        major: 0,
        minor: 86,
        patch: 3,
        prerelease: null,
      })
    ).toBe('0.86.3');
  });

  it('appends the prerelease tag when set', () => {
    expect(
      formatReactNativeVersion({
        major: 0,
        minor: 87,
        patch: 0,
        prerelease: 'rc.1',
      })
    ).toBe('0.87.0-rc.1');
  });

  it('appends a numeric prerelease, including 0', () => {
    expect(
      formatReactNativeVersion({ major: 0, minor: 88, patch: 0, prerelease: 0 })
    ).toBe('0.88.0-0');
  });

  it('omits an undefined or empty prerelease', () => {
    expect(formatReactNativeVersion({ major: 0, minor: 86, patch: 3 })).toBe(
      '0.86.3'
    );
    expect(
      formatReactNativeVersion({
        major: 0,
        minor: 86,
        patch: 3,
        prerelease: '',
      })
    ).toBe('0.86.3');
  });

  it('returns null when the version is unavailable', () => {
    expect(formatReactNativeVersion(undefined)).toBeNull();
    expect(formatReactNativeVersion(null)).toBeNull();
  });
});
