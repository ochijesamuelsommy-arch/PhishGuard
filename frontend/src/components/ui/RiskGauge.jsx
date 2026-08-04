import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function RiskGauge({ score }) {
  const risk = Math.min(Math.max(score, 0), 100);

  let color = "#22c55e";
  let label = "LOW RISK";

  if (risk >= 30) {
    color = "#f59e0b";
    label = "MEDIUM RISK";
  }

  if (risk >= 70) {
    color = "#ef4444";
    label = "HIGH RISK";
  }

  return (
    <div
      style={{
        width: 180,
        margin: "20px auto",
        textAlign: "center",
      }}
    >
      <CircularProgressbar
        value={risk}
        text={`${risk}%`}
        styles={buildStyles({
          pathColor: color,
          trailColor: "#334155",
          textColor: "#ffffff",
          textSize: "16px",
        })}
      />

      <div
        style={{
          marginTop: "18px",
          display: "inline-block",
          padding: "8px 18px",
          borderRadius: "999px",
          background: color,
          color: "white",
          fontWeight: "bold",
          fontSize: "14px",
          boxShadow: `0 0 15px ${color}55`,
        }}
      >
        {label}
      </div>
    </div>
  );
}

export default RiskGauge;