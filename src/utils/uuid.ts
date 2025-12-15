/* eslint-disable no-bitwise */
/**
 * Generate a random UUID (v4)
 * @returns A UUID string in the format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
 */
export function randomUUID(): string {
  // Use crypto.randomUUID if available (browser/Node.js 19+)
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  // Fallback implementation for React Native
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
