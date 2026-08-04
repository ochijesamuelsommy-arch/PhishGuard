const API_BASE = "http://127.0.0.1:8000";

async function fetchData(endpoint, url, errorMessage) {
  const response = await fetch(
    `${API_BASE}/${endpoint}?url=${encodeURIComponent(url)}`
  );

  if (!response.ok) {
    throw new Error(errorMessage);
  }

  return response.json();
}

export const scanLocal = (url) =>
  fetchData("scan", url, "Local scan failed.");

export const scanDomain = (url) =>
  fetchData("domain", url, "Domain lookup failed.");

export const scanSSL = (url) =>
  fetchData("ssl", url, "SSL lookup failed.");

export const scanWhois = (url) =>
  fetchData("whois", url, "WHOIS lookup failed.");

export const scanVirusTotal = (url) =>
  fetchData("virustotal", url, "VirusTotal lookup failed.");

export const scanSafeBrowsing = (url) =>
  fetchData("safebrowsing", url, "Google Safe Browsing lookup failed.");