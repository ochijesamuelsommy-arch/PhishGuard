import { motion } from "framer-motion";

function StatusBadge({
  status,
  successText = "SAFE",
  dangerText = "DANGER",
}) {
  const safe =
    status === "SAFE" ||
    status === "Valid" ||
    status === true;

  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.85,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        duration: 0.35,
      }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        padding: "10px 18px",
        borderRadius: "999px",
        fontWeight: "700",
        fontSize: "14px",
        letterSpacing: ".5px",
        border: `1px solid ${
          safe
            ? "rgba(34,197,94,.35)"
            : "rgba(239,68,68,.35)"
        }`,
        background: safe
          ? "rgba(34,197,94,.12)"
          : "rgba(239,68,68,.12)",
        color: safe
          ? "#22c55e"
          : "#ef4444",
        boxShadow: safe
          ? "0 0 18px rgba(34,197,94,.18)"
          : "0 0 18px rgba(239,68,68,.18)",
      }}
    >
      <span
        style={{
          fontSize: "16px",
        }}
      >
        {safe ? "🟢" : "🔴"}
      </span>

      <span>
        {safe ? successText : dangerText}
      </span>
    </motion.div>
  );
}

export default StatusBadge;