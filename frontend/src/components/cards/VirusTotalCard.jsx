import GlassCard from "../ui/GlassCard";
import SectionHeader from "../ui/SectionHeader";
import MetricCard from "../ui/MetricCard";

function VirusTotalCard({ info }) {
  if (!info) return null;

  return (
    <GlassCard>
      <SectionHeader
        icon="🌐"
        title="VirusTotal Intelligence"
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: "18px",
        }}
      >
        <MetricCard
          title="Harmless"
          value={info.harmless}
          color="#16c784"
        />

        <MetricCard
          title="Malicious"
          value={info.malicious}
          color="#ff4d4f"
        />

        <MetricCard
          title="Suspicious"
          value={info.suspicious}
          color="#f5a623"
        />

        <MetricCard
          title="Undetected"
          value={info.undetected}
          color="#8c8c8c"
        />
      </div>
    </GlassCard>
  );
}

export default VirusTotalCard;