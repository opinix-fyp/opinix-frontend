import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

function normalizeSentiment(sentiment) {
  if (!sentiment) return "UNSURE";

  const value = sentiment.toUpperCase();

  if (value === "GOOD" || value === "POSITIVE") return "GOOD";
  if (value === "OKAY" || value === "NEUTRAL") return "OKAY";
  if (value === "BAD" || value === "NEGATIVE") return "BAD";
  return "UNSURE";
}

function SentimentChart({ analysisResult }) {
  if (!analysisResult || !analysisResult.results?.length) {
    return (
      <div>
        <h3>Sentiment Distribution</h3>
        <p>Waiting for analysis results...</p>
      </div>
    );
  }

  const counts = {
    GOOD: 0,
    OKAY: 0,
    BAD: 0,
    UNSURE: 0,
  };

  analysisResult.results.forEach((item) => {
    const normalized = normalizeSentiment(item.sentiment);
    counts[normalized]++;
  });

  const data = [
    { name: "Good", value: counts.GOOD },
    { name: "Okay", value: counts.OKAY },
    { name: "Bad", value: counts.BAD },
    { name: "Unsure", value: counts.UNSURE },
  ];

  const colors = {
    Good: "#4cd97b",
    Okay: "#ffd166",
    Bad: "#ff6b6b",
    Unsure: "#8b8b8b",
  };

  return (
    <div>
      <h3>Sentiment Distribution</h3>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="name" stroke="#aaa" />
          <YAxis stroke="#aaa" allowDecimals={false} />
          <Tooltip />

          <Bar dataKey="value" radius={[6, 6, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={index} fill={colors[entry.name]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SentimentChart;