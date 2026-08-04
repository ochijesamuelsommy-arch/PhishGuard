import { motion } from "framer-motion";

function ShieldLogo() {
  return (
    <motion.svg
      width="140"
      height="140"
      viewBox="0 0 120 120"
      animate={{
        y: [0, -8, 0],
        rotate: [-2, 2, -2],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{
        filter: "drop-shadow(0 0 20px #38bdf8)",
      }}
    >
      <defs>
        <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>
      </defs>

      <path
        d="M60 10
           L100 25
           L95 65
           C92 88 75 102 60 110
           C45 102 28 88 25 65
           L20 25
           Z"
        fill="url(#shieldGradient)"
        stroke="#93c5fd"
        strokeWidth="3"
      />

      <motion.path
        d="M42 60 L55 73 L82 45"
        fill="none"
        stroke="white"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={{
          pathLength: [0, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 1,
        }}
      />
    </motion.svg>
  );
}

export default ShieldLogo;