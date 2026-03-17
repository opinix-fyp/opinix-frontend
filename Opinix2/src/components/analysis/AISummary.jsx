function AISummary({ analysisResult }) {
  return (
    <div>
      <h3>AI Summary</h3>

      {!analysisResult?.summary ? (
        <p>Waiting for summary...</p>
      ) : (
        <p className="ai-summary-text">{analysisResult.summary}</p>
      )}
    </div>
  );
}

export default AISummary;