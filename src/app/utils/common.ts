export function getPercent(current: number, total: number) {
  if (total === 0) {
    return current >= 0 ? 100 : 0;
  }
  const percent = Math.round((current / total) * 100);
  return Math.min(100, Math.max(0, percent));
}
