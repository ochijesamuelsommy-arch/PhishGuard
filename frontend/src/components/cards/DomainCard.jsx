import { motion } from "framer-motion";

import GlassCard from "../ui/GlassCard";
import SectionHeader from "../ui/SectionHeader";
import InfoTile from "../ui/InfoTile";

function DomainCard({ info }) {
  if (!info) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{ marginTop: "25px" }}
    >
      <GlassCard>
        <SectionHeader
          icon="🌍"
          title="Domain Intelligence"
        />

        <div
          style={{
            marginBottom: "25px",
            padding: "18px",
            borderRadius: "16px",
            background: "rgba(15,23,42,.65)",
            border: "1px solid rgba(56,189,248,.12)",
          }}
        >
          <div
            style={{
              fontSize: "24px",
              fontWeight: "700",
              color: "#ffffff",
              marginBottom: "8px",
            }}
          >
            {info.domain}
          </div>

          <div
            style={{
              color: "#94a3b8",
              lineHeight: "1.7",
            }}
          >
            Technical intelligence collected from DNS lookup,
            IP geolocation, and network information.
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",
            gap: "18px",
          }}
        >
          <InfoTile
            icon="🌐"
            title="Domain"
            value={info.domain}
          />

          <InfoTile
            icon="🖥️"
            title="IP Address"
            value={info.ip_address}
          />

          <InfoTile
            icon="🌍"
            title="Country"
            value={info.country}
          />

          <InfoTile
            icon="🏙️"
            title="City"
            value={info.city}
          />

          <InfoTile
            icon="🏢"
            title="Organization"
            value={info.organization}
          />

          <InfoTile
            icon="🛰️"
            title="ASN"
            value={info.asn}
          />

          <InfoTile
            icon="🔒"
            title="Protocol"
            value={info.protocol}
          />

          <InfoTile
            icon="🏷️"
            title="Hostname"
            value={info.hostname}
          />

          <InfoTile
            icon="🚪"
            title="Port"
            value={info.port}
          />

          <InfoTile
            icon="📁"
            title="Path"
            value={info.path}
          />

          <InfoTile
            icon="🛡️"
            title="Secure Connection"
            value={info.https ? "Yes" : "No"}
          />
        </div>
      </GlassCard>
    </motion.div>
  );
}

export default DomainCard;