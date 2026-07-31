import StatusBadge from "./StatusBadge";
import RiskMeter from "./RiskMeter";

function ResultCard({ result }) {
  return (
    <div className="result">
      <StatusBadge status={result.status} />

      <RiskMeter
        score={result.overall_risk_score}
        status={result.status}
      />

      <p>
        <strong>Confidence:</strong> {result.confidence}
      </p>

      <p style={{ marginTop: "10px" }}>
        <strong>Message:</strong> {result.message}
      </p>

      <hr />

      <h3>🔎 Local Scan</h3>

      <p style={{ marginTop: "10px" }}>
        <strong>Score:</strong> {result.local_scan.score}
      </p>

      <ul>
        {result.local_scan.reasons.length > 0 ? (
          result.local_scan.reasons.map((reason, index) => (
            <li key={index}>{reason}</li>
          ))
        ) : (
          <li>✅ No suspicious indicators found.</li>
        )}
      </ul>
    </div>
  );
}

export default ResultCard;