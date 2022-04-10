export function toBase64(str: string) {
  if (!str) return str;
  const buffer = Buffer.from(String(str));
  return buffer.toString('base64');
}

export function fromBase64(str: string) {
  if (!str) return str;
  const buffer = Buffer.from(String(str), 'base64');
  return buffer.toString('utf-8');
}
