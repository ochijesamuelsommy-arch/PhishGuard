import GlassCard from "../ui/GlassCard";
import SectionHeader from "../ui/SectionHeader";

function AIAnalysisCard({ info }) {
  if (!info) return null;

  return (
    <GlassCard>
      <SectionHeader
        icon="🤖"
        title="AI Security Verdict"
      />

      <div
        style={{
          lineHeight: "1.8",
          color: "#e2e8f0",
        }}
      >
        <h3>📋 Summary</h3>
        <p>{info.summary}</p>

        <h3 style={{ marginTop: "20px" }}>
          💡 Recommendation
        </h3>
        <p>{info.recommendation}</p>
      </div>
    </GlassCard>
  );
}

export default AIAnalysisCard;