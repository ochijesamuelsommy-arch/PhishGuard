const API_BASE = "http://127.0.0.1:8000";

export async function scanLocal(url) {
  const response = await fetch(
    `${API_BASE}/scan?url=${encodeURIComponent(url)}`
  );

  if (!response.ok) {
    throw new Error("Local scan failed.");
  }

  return response.json();
}

export async function scanVirusTotal(url) {
  const response = await fetch(
    `${API_BASE}/virustotal?url=${encodeURIComponent(url)}`
  );

  if (!response.ok) {
    throw new Error("VirusTotal scan failed.");
  }

  return response.json();
}