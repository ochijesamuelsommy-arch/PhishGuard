import { motion } from "framer-motion";

function SearchBar({
  url,
  setUrl,
  loading,
  scanWebsite,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 40,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.8,
      }}
      style={{
        marginTop: "40px",
        marginBottom: "50px",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "15px",
          alignItems: "center",
          flexWrap: "wrap",
          background: "rgba(15,23,42,.75)",
          backdropFilter: "blur(18px)",
          border: "1px solid rgba(56,189,248,.18)",
          borderRadius: "20px",
          padding: "20px",
          boxShadow: "0 15px 40px rgba(0,0,0,.25)",
        }}
      >
        <input
          type="text"
          placeholder="🔗 Enter a website URL to analyze..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              scanWebsite();
            }
          }}
          style={{
            flex: 1,
            minWidth: "300px",
          }}
        />

        <motion.button
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{
            scale: 0.95,
          }}
          onClick={scanWebsite}
          disabled={loading}
          style={{
            minWidth: "190px",
          }}
        >
          {loading ? (
            "⏳ Scanning..."
          ) : (
            "🛡️ Scan Website"
          )}
        </motion.button>
      </div>

      <motion.p
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 0.8,
        }}
        style={{
          textAlign: "center",
          color: "#94a3b8",
          marginTop: "15px",
          fontSize: "14px",
        }}
      >
        Powered by AI • Google Safe Browsing • VirusTotal • SSL Intelligence
      </motion.p>
    </motion.div>
  );
}

export default SearchBar;