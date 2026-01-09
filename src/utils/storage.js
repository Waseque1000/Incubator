const KEY = "team_updates_v1";

export function getUpdates() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveUpdate(data) {
  const all = getUpdates();
  const updated = [data, ...all]; // ✅ always add new row
  localStorage.setItem(KEY, JSON.stringify(updated));
  return updated;
}

export function clearUpdates() {
  localStorage.removeItem(KEY);
}
