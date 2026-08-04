import { motion } from "framer-motion";

import GlassCard from "../ui/GlassCard";
import SectionHeader from "../ui/SectionHeader";
import StatusBadge from "../ui/StatusBadge";
import MetricCard from "../ui/MetricCard";

function SSLCard({ info }) {
  if (!info) return null;

  const valid =
    info.status === true ||
    info.status === "Valid" ||
    info.status === "VALID";

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{ marginTop: "25px" }}
    >
      <GlassCard>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "20px",
            marginBottom: "25px",
          }}
        >
          <SectionHeader
            icon="🔒"
            title="SSL Certificate"
          />

          <StatusBadge
            status={info.status}
            successText="VALID"
            dangerText="INVALID"
          />
        </div>

        <div
          style={{
            marginBottom: "25px",
            padding: "20px",
            borderRadius: "18px",
            background: valid
              ? "rgba(34,197,94,.08)"
              : "rgba(239,68,68,.08)",
            border: `1px solid ${
              valid
                ? "rgba(34,197,94,.18)"
                : "rgba(239,68,68,.18)"
            }`,
          }}
        >
          <h3
            style={{
              color: valid ? "#22c55e" : "#ef4444",
              fontSize: "22px",
              marginBottom: "10px",
            }}
          >
            {valid
              ? "🟢 Certificate Verified"
              : "🔴 Certificate Invalid"}
          </h3>

          <p
            style={{
              color: "#94a3b8",
              lineHeight: "1.7",
              margin: 0,
            }}
          >
            {valid
              ? "The website is using a valid SSL certificate and an encrypted HTTPS connection."
              : "The SSL certificate could not be verified. Proceed with caution."}
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "18px",
          }}
        >
          <MetricCard
            icon="👤"
            title="Issued To"
            value={info.issued_to}
          />

          <MetricCard
            icon="🏢"
            title="Issuer"
            value={info.issuer}
          />

          <MetricCard
            icon="📅"
            title="Valid From"
            value={info.valid_from}
          />

          <MetricCard
            icon="⏳"
            title="Expires"
            value={info.valid_to}
          />

          <MetricCard
            icon="🛡️"
            title="Days Remaining"
            value={`${info.days_remaining} Days`}
          />
        </div>
      </GlassCard>
    </motion.div>
  );
}

export default SSLCard;