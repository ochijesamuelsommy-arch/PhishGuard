import { useState } from "react";
import "./App.css";

import Header from "./components/layout/Header";
import Hero from "./components/layout/Hero";
import SearchBar from "./components/layout/SearchBar";

import ResultCard from "./components/cards/ResultCard";
import DomainCard from "./components/cards/DomainCard";
import SSLCard from "./components/cards/SSLCard";
import WhoisCard from "./components/cards/WhoisCard";
import VirusTotalCard from "./components/cards/VirusTotalCard";
import SafeBrowsingCard from "./components/cards/SafeBrowsingCard";
import AIAnalysisCard from "./components/cards/AIAnalysisCard";

import RiskGauge from "./components/ui/RiskGauge";
import DownloadReportButton from "./components/ui/DownloadReportButton";
import LoadingTracker from "./components/ui/LoadingTracker";

import {
  scanLocal,
  scanDomain,
  scanSSL,
  scanWhois,
  scanVirusTotal,
  scanSafeBrowsing,
} from "./services/api";

function App() {
  const [url, setUrl] = useState("");

  // Loading
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  // Scan Results
  const [localResult, setLocalResult] = useState(null);
  const [domainInfo, setDomainInfo] = useState(null);
  const [sslInfo, setSSLInfo] = useState(null);
  const [whoisInfo, setWhoisInfo] = useState(null);
  const [virusTotal, setVirusTotal] = useState(null);
  const [safeBrowsing, setSafeBrowsing] = useState(null);

  // Scan History
  const [history, setHistory] = useState([]);

  async function scanWebsite() {
      if (!url.trim()) {
  alert("Please enter a website URL.");
  return;
}

    setLoading(true);
    setProgress(0);

    // Clear previous scan
    setLocalResult(null);
    setDomainInfo(null);
    setSSLInfo(null);
    setWhoisInfo(null);
    setVirusTotal(null);
    setSafeBrowsing(null);

    try {
      // ==========================
      // Local Scan
      // ==========================

      const local = await scanLocal(url);

      setLocalResult(local);
      setProgress(15);

      setHistory((previous) => [
        {
          url,
          status: local.status,
          risk: local.overall_risk_score,
          time: new Date().toLocaleTimeString(),
        },
        ...previous,
      ]);

      // ==========================
      // Background Intelligence
      // ==========================

      const requests = await Promise.allSettled([
        scanDomain(url),
        scanSSL(url),
        scanWhois(url),
        scanVirusTotal(url),
        scanSafeBrowsing(url),
      ]);

      if (requests[0].status === "fulfilled") {
        setDomainInfo(requests[0].value);
        setProgress(30);
      }

      if (requests[1].status === "fulfilled") {
        setSSLInfo(requests[1].value);
        setProgress(45);
      }

      if (requests[2].status === "fulfilled") {
        setWhoisInfo(requests[2].value);
        setProgress(60);
      }

      if (requests[3].status === "fulfilled") {
        setVirusTotal(requests[3].value);
        setProgress(80);
      }

      if (requests[4].status === "fulfilled") {
        setSafeBrowsing(requests[4].value);
        setProgress(100);
      }
    } catch (error) {
      console.error(error);
      alert("Could not connect to the backend.");
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }

    return (
    <div className="app">
      <div className="card">

        <Header />

        <Hero />

        <SearchBar
          url={url}
          setUrl={setUrl}
          loading={loading}
          scanWebsite={scanWebsite}
        />

        {/* ============================= */}
        {/* Loading Tracker */}
        {/* ============================= */}

        {loading && (
          <LoadingTracker progress={progress} />
        )}

        {/* ============================= */}
        {/* Results */}
        {/* ============================= */}

        {localResult && (
          <>

            {/* ============================= */}
            {/* Overall Security */}
            {/* ============================= */}

            <section style={{ marginTop: "40px" }}>
              <h2
                style={{
                  color: "#38bdf8",
                  marginBottom: "20px",
                  borderBottom: "1px solid #334155",
                  paddingBottom: "10px",
                }}
              >
                🛡️ Overall Security
              </h2>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "2fr 1fr",
                  gap: "20px",
                  alignItems: "start",
                }}
              >
                <ResultCard result={localResult} />

                <RiskGauge
                  score={localResult.overall_risk_score}
                />
              </div>

              {localResult.ai_analysis && (
                <div style={{ marginTop: "25px" }}>
                  <AIAnalysisCard
                    info={localResult.ai_analysis}
                  />
                </div>
              )}
            </section>

            {/* ============================= */}
            {/* Technical Intelligence */}
            {/* ============================= */}

            <section style={{ marginTop: "50px" }}>
              <h2
                style={{
                  color: "#38bdf8",
                  marginBottom: "20px",
                  borderBottom: "1px solid #334155",
                  paddingBottom: "10px",
                }}
              >
                🌍 Technical Intelligence
              </h2>

              {domainInfo && (
                <DomainCard info={domainInfo} />
              )}

              {sslInfo && (
                <SSLCard info={sslInfo} />
              )}

              {whoisInfo && (
                <WhoisCard info={whoisInfo} />
              )}
            </section>

                        {/* ============================= */}
            {/* Threat Intelligence */}
            {/* ============================= */}

            <section style={{ marginTop: "50px" }}>
              <h2
                style={{
                  color: "#38bdf8",
                  marginBottom: "20px",
                  borderBottom: "1px solid #334155",
                  paddingBottom: "10px",
                }}
              >
                🛰️ Threat Intelligence
              </h2>

              {virusTotal && (
                <VirusTotalCard info={virusTotal} />
              )}

              {safeBrowsing && (
                <SafeBrowsingCard info={safeBrowsing} />
              )}
            </section>

            {/* ============================= */}
            {/* Download Report */}
            {/* ============================= */}

            <div style={{ marginTop: "45px" }}>
              <DownloadReportButton
                result={{
                  ...localResult,
                  url,
                }}
                virusTotal={virusTotal}
                safeBrowsing={safeBrowsing}
              />
            </div>

            {/* ============================= */}
            {/* Scan History */}
            {/* ============================= */}

            {history.length > 0 && (
              <section style={{ marginTop: "60px" }}>
                <h2
                  style={{
                    color: "#38bdf8",
                    marginBottom: "20px",
                    borderBottom: "1px solid #334155",
                    paddingBottom: "10px",
                  }}
                >
                  📜 Scan History
                </h2>

                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    overflow: "hidden",
                  }}
                >
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
              </section>
            )}

          </>
        )}

      </div>
    </div>
  );
}

export default App;
