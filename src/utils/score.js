export function creditLevel(score) {
  if (score >= 95) return "优秀";
  if (score >= 85) return "良好";
  if (score >= 70) return "正常";
  return "需提升";
}

export function percent(current, target) {
  if (!target) return 0;
  return Math.min(100, Math.round((current / target) * 100));
}
