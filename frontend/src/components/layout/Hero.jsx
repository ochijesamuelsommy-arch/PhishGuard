import { motion } from "framer-motion";
import ShieldLogo from "../ShieldLogo";

function Hero() {
  return (
    <section
      style={{
        textAlign: "center",
        marginBottom: "60px",
        padding: "20px 0 10px",
      }}
    >
      <ShieldLogo />

      <motion.h1
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          fontSize: "58px",
          fontWeight: "800",
          letterSpacing: "4px",
          color: "#ffffff",
          marginTop: "20px",
          marginBottom: "12px",
        }}
      >
        PHISHGUARD
      </motion.h1>

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        style={{
          color: "#38bdf8",
          fontSize: "24px",
          fontWeight: "600",
          marginBottom: "25px",
        }}
      >
        AI-Powered Threat Intelligence Platform
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        style={{
          maxWidth: "760px",
          margin: "0 auto",
          color: "#cbd5e1",
          fontSize: "18px",
          lineHeight: "1.8",
        }}
      >
        Analyze suspicious websites using AI-powered phishing detection,
        SSL certificate inspection, RDAP WHOIS intelligence,
        VirusTotal reputation analysis, and Google Safe Browsing—
        all from one unified security dashboard.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.8 }}
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "14px",
          marginTop: "30px",
        }}
      >
        {[
          "🛡️ AI Detection",
          "🌐 VirusTotal",
          "🔒 SSL Intelligence",
          "🛰️ RDAP WHOIS",
          "🛡️ Safe Browsing",
        ].map((item) => (
          <div
            key={item}
            style={{
              background: "rgba(15,23,42,.75)",
              border: "1px solid rgba(56,189,248,.2)",
              borderRadius: "30px",
              padding: "10px 18px",
              color: "#38bdf8",
              fontWeight: "600",
              backdropFilter: "blur(12px)",
            }}
          >
            {item}
          </div>
        ))}
      </motion.div>
    </section>
  );
}

export default Hero;