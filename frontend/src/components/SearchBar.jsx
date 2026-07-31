function SearchBar({
  url,
  setUrl,
  loading,
  scanWebsite
}) {
  return (
    <>
      <input
        type="text"
        placeholder="https://example.com"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <button
        onClick={scanWebsite}
        disabled={loading}
      >
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <span>Scanning...</span>
          </div>
        ) : (
          "🛡️ Scan URL"
        )}
      </button>
    </>
  );
}

export default SearchBar;