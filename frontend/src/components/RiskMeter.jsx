function RiskMeter({ score, status }) {
  const color =
    status === "SAFE"
      ? "#16a34a"
      : status === "SUSPICIOUS"
      ? "#eab308"
      : "#dc2626";

  return (
    <>
      <h3 style={{ textAlign: "center", marginTop: "15px" }}>
        Risk Score: {score}/100
      </h3>

      <div className="progress">
        <div
          className="progress-fill"
          style={{
            width: `${score}%`,
            backgroundColor: color,
          }}
        ></div>
      </div>
    </>
  );
}

export default RiskMeter;