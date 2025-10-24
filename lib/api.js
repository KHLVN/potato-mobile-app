// app/lib/api.js
export const API_BASE = "http://172.20.10.2:5000";

export async function fetchRecords() {
  const res = await fetch(`${API_BASE}/records`);
  if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
  return res.json();
}

/**
 * Given a record, return a usable image URL for <Image />
 * Priority:
 * 1) record.image_url (if your Flask returns this)
 * 2) Build from /images/<filename> if image_path exists
 * 3) null (let caller show a placeholder)
 */
export function getImageUrlFromRecord(rec) {
  if (rec?.image_url) return rec.image_url;

  if (rec?.image_path) {
    const parts = rec.image_path.split("/");
    const filename = parts[parts.length - 1];
    // Assumes you expose /images/<filename> in Flask (recommended)
    return `${API_BASE}/images/${filename}`;
  }

  return null;
}
