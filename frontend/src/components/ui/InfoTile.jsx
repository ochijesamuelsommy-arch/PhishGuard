import { motion } from "framer-motion";

function InfoTile({
  icon,
  title,
  value,
}) {
  return (
    <motion.div
      whileHover={{
        y: -4,
        scale: 1.02,
      }}
      transition={{
        duration: 0.2,
      }}
      style={{
        background:
          "linear-gradient(180deg, rgba(30,41,59,.95), rgba(15,23,42,.95))",
        border: "1px solid rgba(56,189,248,.12)",
        borderRadius: "18px",
        padding: "20px",
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 8px 20px rgba(0,0,0,.20)",
      }}
    >
      {/* Top Accent */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "3px",
          background:
            "linear-gradient(90deg,#38bdf8,#2563eb)",
        }}
      />

      <div
        style={{
          fontSize: "30px",
          marginBottom: "14px",
        }}
      >
        {icon}
      </div>

      <div
        style={{
          color: "#38bdf8",
          fontSize: "14px",
          fontWeight: "600",
          textTransform: "uppercase",
          letterSpacing: "0.8px",
        }}
      >
        {title}
      </div>

      <div
        style={{
          marginTop: "12px",
          fontSize: "18px",
          fontWeight: "600",
          color: "#ffffff",
          lineHeight: "1.6",
          wordBreak: "break-word",
        }}
      >
        {value || "Unknown"}
      </div>
    </motion.div>
  );
}

export default InfoTile;