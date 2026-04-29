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
