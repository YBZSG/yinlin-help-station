import { useMemo } from "react";

export function useFilteredList(items, { query = "", category = "全部", type = "全部", keys = [] }) {
  return useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return items.filter((item) => {
      const categoryMatch = category === "全部" || item.category === category || item.material === category || item.type === category || item.urgency === category;
      const typeMatch = type === "全部" || item.type === type || item.status === type;
      const queryMatch =
        !normalized ||
        keys.some((key) => String(item[key] || "").toLowerCase().includes(normalized));
      return categoryMatch && typeMatch && queryMatch;
    });
  }, [items, query, category, type, keys]);
}
