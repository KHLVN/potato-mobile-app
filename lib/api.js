// app/lib/api.js

let API_BASE = "http://raspberrypi.local:5000"; // fallback

/**
 * Detect the current Raspberry Pi IP automatically.
 */
export async function detectAPI() {
  try {
    const res = await fetch(`${API_BASE}/ip`);
    const json = await res.json();

    if (json?.ip) {
      API_BASE = `http://${json.ip}:5000`;
      console.log("✅ Connected to Raspberry Pi at", API_BASE);
    } else {
      console.warn("⚠️ Could not detect IP, using fallback:", API_BASE);
    }
  } catch (err) {
    console.error("❌ Failed to detect API automatically:", err.message);
  }
}

/**
 * Return the current base URL (for debugging or dynamic fetches).
 */
export function getAPIBase() {
  return API_BASE;
}

/**
 * Fetch classification records.
 */
export async function fetchRecords() {
  const res = await fetch(`${API_BASE}/records`);
  if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
  return res.json();
}

/**
 * Build image URL from record.
 */
export function getImageUrlFromRecord(rec) {
  if (rec?.image_url) return rec.image_url;
  if (rec?.image_path) {
    const filename = rec.image_path.split("/").pop();
    return `${API_BASE}/images/${filename}`;
  }
  return null;
}

/**
 * Trigger classification remotely (if you add Flask /classify route)
 */
export async function triggerClassification() {
  const res = await fetch(`${API_BASE}/classify`, { method: "POST" });
  if (!res.ok) throw new Error(`Failed to trigger classification: ${res.status}`);
  return res.json();
}
