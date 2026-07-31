import { useState } from "react";
import "./App.css";

import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import ResultCard from "./components/ResultCard";
import DomainCard from "./components/DomainCard";

import { scanLocal, scanVirusTotal } from "./services/api";

function App() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const [localResult, setLocalResult] = useState(null);
  const [virusTotal, setVirusTotal] = useState(null);
  const [vtLoading, setVtLoading] = useState(false);

  const [history, setHistory] = useState([]);

  async function scanWebsite() {
    if (!url.trim()) {
      alert("Please enter a URL.");
      return;
    }

    setLoading(true);

    // Reset previous scan
    setLocalResult(null);
    setVirusTotal(null);
    setVtLoading(false);

    try {
      // Instant local scan
      const local = await scanLocal(url);

      setLocalResult(local);

      // Save scan history
      setHistory((previous) => [
        {
          url,
          status: local.status,
          risk: local.overall_risk_score,
          time: new Date().toLocaleTimeString(),
        },
        ...previous,
      ]);

      // VirusTotal runs in the background
      setVtLoading(true);

      scanVirusTotal(url)
        .then((vt) => {
          setVirusTotal(vt);
        })
        .catch(() => {
          setVirusTotal({
            error: true,
            message: "VirusTotal service unavailable.",
          });
        })
        .finally(() => {
          setVtLoading(false);
        });

    } catch (error) {
      console.error(error);
      alert("Could not connect to the backend.");
    }

    setLoading(false);
  }

  return (
    <div className="app">
      <div className="card">

        <Header />

        <SearchBar
          url={url}
          setUrl={setUrl}
          loading={loading}
          scanWebsite={scanWebsite}
        />

        {localResult && (
          <>
            <ResultCard result={localResult} />

            {localResult.domain_info && (
              <DomainCard info={localResult.domain_info} />
            )}

            <div className="result">
              <h2>🌐 VirusTotal</h2>

              {vtLoading ? (
                <p>⏳ Checking VirusTotal...</p>
              ) : virusTotal?.error ? (
                <p>{virusTotal.message}</p>
              ) : virusTotal ? (
                <>
                  <p>✅ Harmless: {virusTotal.harmless}</p>
                  <p>❌ Malicious: {virusTotal.malicious}</p>
                  <p>⚠ Suspicious: {virusTotal.suspicious}</p>
                  <p>❓ Undetected: {virusTotal.undetected}</p>
                </>
              ) : null}
            </div>
          </>
        )}

        {history.length > 0 && (
          <>
            <hr />

            <h2 style={{ textAlign: "center" }}>
              📜 Scan History
            </h2>

            <table>
              <thead>
                <tr>
                  <th>URL</th>
                  <th>Status</th>
                  <th>Risk</th>
                  <th>Time</th>
                </tr>
              </thead>

              <tbody>
                {history.map((scan, index) => (
                  <tr key={index}>
                    <td>{scan.url}</td>
                    <td>{scan.status}</td>
                    <td>{scan.risk}</td>
                    <td>{scan.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

      </div>
    </div>
  );
}

export default App;
