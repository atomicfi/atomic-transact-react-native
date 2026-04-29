import { utf8Base64 } from '../utils';

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
