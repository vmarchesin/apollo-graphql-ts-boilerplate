export function getFirst<T>(arr: T[]): T | null {
  return arr.length ? arr[0] : null;
}

export function getLast<T>(arr: T[]): T | null {
  return arr.length ? arr[arr.length - 1] : null;
}
