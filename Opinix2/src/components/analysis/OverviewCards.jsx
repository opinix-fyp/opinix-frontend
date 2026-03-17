function normalizeSentiment(sentiment) {
  if (!sentiment) return "UNSURE";

  const value = sentiment.toUpperCase();

  if (value === "GOOD" || value === "POSITIVE") return "GOOD";
  if (value === "OKAY" || value === "NEUTRAL") return "OKAY";
  if (value === "BAD" || value === "NEGATIVE") return "BAD";
  return "UNSURE";
}

function OverviewCards({ analysisResult }) {
  if (!analysisResult || !analysisResult.results?.length) {
    return (
      <div className="overview-cards">
        <div className="overview-card">
          <h4>Analyzed Answers</h4>
          <p>0</p>
        </div>
        <div className="overview-card">
          <h4>Good</h4>
          <p>0%</p>
        </div>
        <div className="overview-card">
          <h4>Bad</h4>
          <p>0%</p>
        </div>
        <div className="overview-card">
          <h4>Avg Confidence</h4>
          <p>0.00</p>
        </div>
      </div>
    );
  }

  const results = analysisResult.results;
  const total = results.length;

  const normalized = results.map((item) => normalizeSentiment(item.sentiment));

  const goodCount = normalized.filter((item) => item === "GOOD").length;
  const badCount = normalized.filter((item) => item === "BAD").length;

  const averageScore =
    results.reduce((sum, item) => sum + Number(item.score || 0), 0) / total;

  const goodPercentage = ((goodCount / total) * 100).toFixed(1);
  const badPercentage = ((badCount / total) * 100).toFixed(1);

  return (
    <div className="overview-cards">
      <div className="overview-card">
        <h4>Analyzed Answers</h4>
        <p>{total}</p>
      </div>

      <div className="overview-card good">
        <h4>Good</h4>
        <p>{goodPercentage}%</p>
      </div>

      <div className="overview-card bad">
        <h4>Bad</h4>
        <p>{badPercentage}%</p>
      </div>

      <div className="overview-card">
        <h4>Avg Confidence</h4>
        <p>{averageScore.toFixed(2)}</p>
      </div>
    </div>
  );
}

export default OverviewCards;