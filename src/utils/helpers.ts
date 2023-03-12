// TODO: adjust items to show coordinates
export function getItems(count = 100000) {
  return new Array(count).fill(0).map((_, i) => `Item ${i}`);
}
