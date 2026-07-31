function StatusBadge({ status }) {
  const getStatusClass = () => {
    switch (status) {
      case "SAFE":
        return "safe";
      case "SUSPICIOUS":
        return "suspicious";
      case "DANGEROUS":
        return "dangerous";
      default:
        return "";
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <span className={`status-badge ${getStatusClass()}`}>
        {status}
      </span>
    </div>
  );
}

export default StatusBadge;