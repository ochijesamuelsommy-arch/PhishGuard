import { motion } from "framer-motion";

import GlassCard from "../ui/GlassCard";
import SectionHeader from "../ui/SectionHeader";
import InfoTile from "../ui/InfoTile";

function WhoisCard({ info }) {
  if (!info) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <GlassCard>
        <SectionHeader
          icon="📅"
          title="WHOIS Information"
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",
            gap: "18px",
          }}
        >
          <InfoTile
            icon="🏢"
            title="Registrar"
            value={info.registrar}
          />

          <InfoTile
            icon="📅"
            title="Created"
            value={info.creation_date}
          />

          <InfoTile
            icon="⌛"
            title="Domain Age"
            value={
              info.age_days === "Unknown"
                ? "Unknown"
                : `${info.age_days} days`
            }
          />

          <InfoTile
            icon="📆"
            title="Expires"
            value={info.expiration_date}
          />
        </div>
      </GlassCard>
    </motion.div>
  );
}

export default WhoisCard;