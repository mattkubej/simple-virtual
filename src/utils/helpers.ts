export function getItems(count = 100000) {
  return new Array(count).fill(0).map((_, i) => `Item ${i}`);
}

export function range(start: number, end: number) {
  return Array.from({ length: end - start }, (_, index) => index + start);
}
