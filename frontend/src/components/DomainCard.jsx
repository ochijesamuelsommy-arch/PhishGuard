function DomainCard({ info }) {
  if (!info) {
    return null;
  }

  return (
    <div className="result">
      <h2>🌍 Domain Intelligence</h2>

      <p>
        <strong>Domain:</strong> {info.domain}
      </p>

      <p>
        <strong>Protocol:</strong>{" "}
        {info.https ? "HTTPS 🔒" : "HTTP ⚠️"}
      </p>

      <p>
        <strong>Hostname:</strong> {info.hostname}
      </p>

      <p>
        <strong>Port:</strong> {info.port}
      </p>

      <p>
        <strong>Path:</strong> {info.path}
      </p>
    </div>
  );
}

export default DomainCard;