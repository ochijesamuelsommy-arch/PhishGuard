import { motion } from "framer-motion";

function ResultCard({ result }) {
  const safe = result.status === "SAFE";

  return (
    <motion.div
      className="result"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "30px",
        }}
      >
        <div style={{ flex: 1 }}>
          <div
            style={{
              display: "inline-block",
              padding: "8px 18px",
              borderRadius: "999px",
              background: safe
                ? "rgba(34,197,94,.15)"
                : "rgba(239,68,68,.15)",
              color: safe ? "#22c55e" : "#ef4444",
              fontWeight: "700",
              marginBottom: "18px",
              border: `1px solid ${
                safe ? "rgba(34,197,94,.3)" : "rgba(239,68,68,.3)"
              }`,
            }}
          >
            {safe ? "🟢 SAFE WEBSITE" : "🔴 SUSPICIOUS WEBSITE"}
          </div>

          <h2
            style={{
              fontSize: "38px",
              color: "#ffffff",
              marginBottom: "12px",
              lineHeight: "1.2",
            }}
          >
            {safe
              ? "No Threats Detected"
              : "Potential Threat Detected"}
          </h2>

          <p
            style={{
              color: "#94a3b8",
              fontSize: "17px",
              lineHeight: "1.8",
              maxWidth: "600px",
            }}
          >
            {result.message}
          </p>
        </div>

        <motion.div
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          style={{
            width: "130px",
            height: "130px",
            borderRadius: "50%",
            background:
              "linear-gradient(135deg,#2563eb,#38bdf8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#ffffff",
            fontSize: "42px",
            fontWeight: "800",
            boxShadow: "0 0 35px rgba(56,189,248,.35)",
          }}
        >
          {100 - result.overall_risk_score}
        </motion.div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
          marginTop: "35px",
        }}
      >
        <div
          style={{
            background: "rgba(15,23,42,.8)",
            border: "1px solid rgba(56,189,248,.15)",
            borderRadius: "18px",
            padding: "22px",
          }}
        >
          <h4
            style={{
              color: "#38bdf8",
              marginBottom: "10px",
            }}
          >
            Risk Score
          </h4>

          <p
            style={{
              fontSize: "32px",
              fontWeight: "700",
              color: "#ffffff",
            }}
          >
            {result.overall_risk_score}/100
          </p>
        </div>

        <div
          style={{
            background: "rgba(15,23,42,.8)",
            border: "1px solid rgba(56,189,248,.15)",
            borderRadius: "18px",
            padding: "22px",
          }}
        >
          <h4
            style={{
              color: "#38bdf8",
              marginBottom: "10px",
            }}
          >
            Confidence
          </h4>

          <p
            style={{
              fontSize: "32px",
              fontWeight: "700",
              color: "#ffffff",
            }}
          >
            {result.confidence}
          </p>
        </div>

        <div
          style={{
            background: "rgba(15,23,42,.8)",
            border: "1px solid rgba(56,189,248,.15)",
            borderRadius: "18px",
            padding: "22px",
          }}
        >
          <h4
            style={{
              color: "#38bdf8",
              marginBottom: "10px",
            }}
          >
            Local Scan
          </h4>

          <p
            style={{
              fontSize: "32px",
              fontWeight: "700",
              color: "#ffffff",
            }}
          >
            {result.local_scan.score}/100
          </p>
        </div>
      </div>

      {result.local_scan.reasons.length > 0 && (
        <div style={{ marginTop: "35px" }}>
          <h3
            style={{
              color: "#facc15",
              marginBottom: "18px",
            }}
          >
            ⚠️ Indicators Found
          </h3>

          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
            }}
          >
            {result.local_scan.reasons.map((reason, index) => (
              <li
                key={index}
                style={{
                  background: "rgba(250,204,21,.08)",
                  border: "1px solid rgba(250,204,21,.15)",
                  borderRadius: "12px",
                  padding: "14px 18px",
                  marginBottom: "12px",
                  color: "#e2e8f0",
                }}
              >
                • {reason}
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
}

export default ResultCard;