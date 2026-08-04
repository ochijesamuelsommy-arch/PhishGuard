import { motion } from "framer-motion";

function GlassCard({ children }) {
  return (
    <motion.div
      whileHover={{
        y: -4,
      }}
      transition={{
        duration: 0.25,
      }}
      style={{
        marginTop: "25px",
        background:
          "linear-gradient(180deg, rgba(15,23,42,.88), rgba(2,6,23,.92))",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(56,189,248,.12)",
        borderRadius: "24px",
        padding: "30px",
        overflow: "hidden",
        position: "relative",
        boxShadow:
          "0 15px 45px rgba(0,0,0,.35)",
      }}
    >
      {/* Top Glow */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background:
            "linear-gradient(90deg,#38bdf8,#2563eb,#38bdf8)",
          opacity: 0.85,
        }}
      />

      {children}
    </motion.div>
  );
}

export default GlassCard;