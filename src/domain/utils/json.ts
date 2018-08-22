export function fromJson<T>(json: string) {
  return JSON.parse(json) as T;
}
