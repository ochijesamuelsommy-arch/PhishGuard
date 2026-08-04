function Header() {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "25px",
        paddingBottom: "15px",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div
        style={{
          fontSize: "22px",
          fontWeight: "700",
          color: "#38bdf8",
        }}
      >
        🛡️ PhishGuard
      </div>

      <div
        style={{
          color: "#94a3b8",
          fontSize: "14px",
          fontWeight: "500",
          letterSpacing: "1px",
        }}
      >
        v1.0 RC1
      </div>
    </header>
  );
}

export default Header;