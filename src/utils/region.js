export const regions = ["全部社区", "南苑", "北苑"];

export function normalizeRegion(region) {
  // 兼容旧数据：南区/北区 → 南苑/北苑
  if (region === "南区") return "南苑";
  if (region === "北区") return "北苑";
  if (region === "全部校区") return "全部社区";
  return regions.includes(region) ? region : "全部社区";
}

export function matchesRegion(item, region) {
  const normalized = normalizeRegion(region);
  if (!normalized || normalized === "全部社区") return true;
  const keywords = normalized === "南苑" ? ["南苑", "南区"] : ["北苑", "北区"];
  const text = [item.area, item.place, item.location, item.description, item.title, item.name]
    .filter(Boolean)
    .join(" ");
  return keywords.some((keyword) => text.includes(keyword));
}

export function filterByRegion(list, region) {
  return list.filter((item) => matchesRegion(item, region));
}
