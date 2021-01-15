export default function requireConfig(required: string[]): void {
  const missing = required.filter((k) => typeof process.env[k] === 'undefined');
  if (missing.length > 0) {
    throw new Error(`Required envrionment variables were not provided: ${missing.join(', ')}`);
  }
}
