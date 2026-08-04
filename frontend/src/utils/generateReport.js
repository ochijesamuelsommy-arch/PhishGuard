import jsPDF from "jspdf";

export default function generateReport(
  localResult,
  virusTotal,
  safeBrowsing
) {
  const doc = new jsPDF();

  let y = 20;

  doc.setFontSize(22);
  doc.text("PHISHGUARD", 20, y);

  y += 10;

  doc.setFontSize(16);
  doc.text("AI Security Assessment Report", 20, y);

  y += 15;

  doc.setFontSize(12);

  doc.text(`Website: ${localResult.url}`, 20, y);
  y += 8;

  doc.text(`Status: ${localResult.status}`, 20, y);
  y += 8;

  doc.text(
    `Risk Score: ${localResult.overall_risk_score}/100`,
    20,
    y
  );
  y += 8;

  doc.text(`Confidence: ${localResult.confidence}`, 20, y);

  y += 15;

  doc.setFontSize(15);
  doc.text("Domain Information", 20, y);

  y += 10;

  doc.setFontSize(12);

  doc.text(
    `Domain: ${localResult.domain_info?.domain || "N/A"}`,
    20,
    y
  );

  y += 8;

  doc.text(
    `IP Address: ${localResult.domain_info?.ip_address || "N/A"}`,
    20,
    y
  );

  y += 8;

  doc.text(
    `Country: ${localResult.domain_info?.country || "N/A"}`,
    20,
    y
  );

  y += 8;

  doc.text(
    `Organization: ${
      localResult.domain_info?.organization || "N/A"
    }`,
    20,
    y
  );

  y += 15;

  doc.setFontSize(15);
  doc.text("SSL Certificate", 20, y);

  y += 10;

  doc.setFontSize(12);

  doc.text(
    `Status: ${localResult.ssl_info?.status || "Unknown"}`,
    20,
    y
  );

  y += 8;

  doc.text(
    `Issuer: ${localResult.ssl_info?.issuer || "Unknown"}`,
    20,
    y
  );

  y += 8;

  doc.text(
    `Expires: ${localResult.ssl_info?.valid_to || "Unknown"}`,
    20,
    y
  );

  y += 15;

  doc.setFontSize(15);
  doc.text("Google Safe Browsing", 20, y);

  y += 10;

  doc.setFontSize(12);

  doc.text(
    safeBrowsing?.safe
      ? "No threats detected."
      : "Threats detected.",
    20,
    y
  );

  y += 15;

  doc.setFontSize(15);
  doc.text("VirusTotal", 20, y);

  y += 10;

  doc.setFontSize(12);

  if (virusTotal) {
    doc.text(`Harmless: ${virusTotal.harmless}`, 20, y);
    y += 8;

    doc.text(`Malicious: ${virusTotal.malicious}`, 20, y);
    y += 8;

    doc.text(`Suspicious: ${virusTotal.suspicious}`, 20, y);
    y += 8;

    doc.text(`Undetected: ${virusTotal.undetected}`, 20, y);
  }

  y += 15;

  doc.setFontSize(15);
  doc.text("AI Recommendation", 20, y);

  y += 10;

  doc.setFontSize(12);

  doc.text(
    localResult.ai_analysis?.recommendation || "N/A",
    20,
    y,
    {
      maxWidth: 170,
    }
  );

  doc.save("PhishGuard_Report.pdf");
}