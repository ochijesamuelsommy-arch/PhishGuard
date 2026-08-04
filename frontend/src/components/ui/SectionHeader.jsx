import { motion } from "framer-motion";

function SectionHeader({ icon, title }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -15 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "14px",
        marginBottom: "24px",
      }}
    >
      <div
        style={{
          width: "50px",
          height: "50px",
          borderRadius: "14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "24px",
          background:
            "linear-gradient(135deg,#2563eb,#38bdf8)",
          boxShadow: "0 8px 20px rgba(37,99,235,.35)",
          flexShrink: 0,
        }}
      >
        {icon}
      </div>

      <div>
        <h2
          style={{
            margin: 0,
            color: "#ffffff",
            fontSize: "26px",
            fontWeight: "700",
            letterSpacing: ".3px",
          }}
        >
          {title}
        </h2>

        <div
          style={{
            marginTop: "6px",
            width: "70px",
            height: "3px",
            borderRadius: "999px",
            background:
              "linear-gradient(90deg,#38bdf8,#2563eb)",
          }}
        />
      </div>
    </motion.div>
  );
}

export default SectionHeader;