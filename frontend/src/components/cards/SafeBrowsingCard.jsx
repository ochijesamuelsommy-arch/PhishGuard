import GlassCard from "../ui/GlassCard";
import SectionHeader from "../ui/SectionHeader";
import StatusBadge from "../ui/StatusBadge";

function SafeBrowsingCard({ info }) {
  if (!info) return null;

  const dangerous = !info.safe;

  return (
    <GlassCard>
      <SectionHeader
        icon="🛡️"
        title="Google Safe Browsing"
      />

      <StatusBadge
        status={!dangerous}
        successText="SAFE"
        dangerText="DANGEROUS"
      />

      <div style={{ marginTop: "20px" }}>
        {dangerous ? (
          <>
            {info.matches?.map((match, index) => (
              <div
                key={index}
                style={{
                  marginBottom: "18px",
                  padding: "15px",
                  background: "#1e293b",
                  borderRadius: "12px",
                }}
              >
                <p><strong>Threat:</strong> {match.threatType}</p>
                <p><strong>Platform:</strong> {match.platformType}</p>
                <p><strong>Entry:</strong> {match.threatEntryType}</p>
              </div>
            ))}
          </>
        ) : (
          <>
            <p>✅ No threats detected.</p>
            <p>Google Safe Browsing reports this website as safe.</p>
          </>
        )}
      </div>
    </GlassCard>
  );
}

export default SafeBrowsingCard;