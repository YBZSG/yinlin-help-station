export const storageKeys = {
  items: "nhs_items",
  materials: "nhs_materials",
  help: "nhs_help",
  emergency: "nhs_emergency",
  volunteer: "nhs_volunteer",
  favorites: "nhs_favorites",
  applications: "nhs_applications",
  feedback: "nhs_feedback",
  notifications: "nhs_notifications",
  region: "nhs_region"
};

export function createId(prefix) {
  return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2, 8)}`;
}

export function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

export function writeStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
