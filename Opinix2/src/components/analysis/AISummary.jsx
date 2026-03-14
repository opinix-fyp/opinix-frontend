function SentimentChart({ analysisResult }) {
  return (
    <div>
      <h3>Sentiment Distribution</h3>

      {!analysisResult ? (
        <p>Waiting for harish ramachandra...</p>
      ) : (
        <p>2000 years...</p>
      )}
    </div>
  );
}

export default SentimentChart;