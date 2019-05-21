export function contains<T>(array: T[] | undefined, item: T): boolean {
  return !!array && array.indexOf(item) >= 0;
}

export function first<T>(array: T[]): T {
  if (!array || array.length === 0)
    throw new Error("Expected a non-empty array " + array);
  return array[0];
}

export function except<T>(items: T[] | undefined, item: T): T[] {
  if (!items) return [];
  return items.filter(i => i !== item);
}

