//these are just placeholders because harish is still not done..

function SentimentChart({ analysisResult }) {
  return (
    <div>
      <h3>Sentiment Distribution</h3>

      {!analysisResult ? (
        <p>Waiting for harish...</p>
      ) : (
        <p>This chart was promised to us 2000 years ago.</p>
      )}
    </div>
  );
}

export default SentimentChart;