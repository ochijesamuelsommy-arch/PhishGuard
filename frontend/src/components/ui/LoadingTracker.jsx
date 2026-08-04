import { motion } from "framer-motion";

const steps = [
  "Local Analysis",
  "Domain Intelligence",
  "SSL Certificate",
  "WHOIS Lookup",
  "VirusTotal",
  "Google Safe Browsing",
];

function LoadingTracker({ progress = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="result"
    >
      <h2 style={{ marginBottom: 25 }}>
        🔍 Scanning Website...
      </h2>

      <div
        style={{
          height: 12,
          background: "#1e293b",
          borderRadius: 999,
          overflow: "hidden",
          marginBottom: 30,
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4 }}
          style={{
            height: "100%",
            background:
              "linear-gradient(90deg,#2563eb,#38bdf8)",
          }}
        />
      </div>

      {steps.map((step, index) => {
        const complete =
          progress >= ((index + 1) / steps.length) * 100;

        return (
          <div
            key={step}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "12px 0",
              borderBottom:
                "1px solid rgba(255,255,255,.05)",
            }}
          >
            <span>{step}</span>

            <span>
              {complete ? "✅" : "⏳"}
            </span>
          </div>
        );
      })}
    </motion.div>
  );
}

export default LoadingTracker;