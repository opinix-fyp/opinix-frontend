function normalizeSentiment(sentiment) {
  if (!sentiment) return "UNSURE";

  const value = sentiment.toUpperCase();

  if (value === "GOOD" || value === "POSITIVE") return "GOOD";
  if (value === "OKAY" || value === "NEUTRAL") return "OKAY";
  if (value === "BAD" || value === "NEGATIVE") return "BAD";
  return "UNSURE";
}

function SentimentByQuestion({ analysisResult, selectedPoll }) {
  if (!analysisResult || !analysisResult.results?.length || !selectedPoll) {
    return (
      <div>
        <h3>Sentiment by Question</h3>
        <p>Waiting for analysis results...</p>
      </div>
    );
  }

  const questionMap = {};

  analysisResult.results.forEach((item) => {
    const normalizedSentiment = normalizeSentiment(item.sentiment);

    if (!questionMap[item.questionId]) {
      let questionLabel = "Unknown Question";

      selectedPoll.responses?.forEach((response) => {
        response.answers?.forEach((answer) => {
          if (
            answer.questionId === item.questionId &&
            answer.questionLabel
          ) {
            questionLabel = answer.questionLabel;
          }
        });
      });

      questionMap[item.questionId] = {
        questionId: item.questionId,
        questionLabel,
        GOOD: 0,
        OKAY: 0,
        BAD: 0,
        UNSURE: 0,
        total: 0,
      };
    }

    questionMap[item.questionId][normalizedSentiment]++;
    questionMap[item.questionId].total++;
  });

  const questionData = Object.values(questionMap);

  return (
    <div>
      <h3>Sentiment by Question</h3>

      <div className="question-sentiment-list">
        {questionData.map((question) => {
          const dominantSentiment =
            question.GOOD >= question.OKAY &&
            question.GOOD >= question.BAD &&
            question.GOOD >= question.UNSURE
              ? "GOOD"
              : question.OKAY >= question.BAD &&
                question.OKAY >= question.UNSURE
              ? "OKAY"
              : question.BAD >= question.UNSURE
              ? "BAD"
              : "UNSURE";

          return (
            <div
              key={question.questionId}
              className="question-sentiment-card"
            >
              <div className="question-sentiment-header">
                <h4>{question.questionLabel}</h4>
                <span className={`question-dominant ${dominantSentiment.toLowerCase()}`}>
                  {dominantSentiment}
                </span>
              </div>

              <div className="question-sentiment-stats">
                <span className="good">Good: {question.GOOD}</span>
                <span className="okay">Okay: {question.OKAY}</span>
                <span className="bad">Bad: {question.BAD}</span>
                <span className="unsure">Unsure: {question.UNSURE}</span>
              </div>

              <div className="question-sentiment-bar">
                <div
                  className="bar good"
                  style={{ width: `${(question.GOOD / question.total) * 100}%` }}
                ></div>
                <div
                  className="bar okay"
                  style={{ width: `${(question.OKAY / question.total) * 100}%` }}
                ></div>
                <div
                  className="bar bad"
                  style={{ width: `${(question.BAD / question.total) * 100}%` }}
                ></div>
                <div
                  className="bar unsure"
                  style={{ width: `${(question.UNSURE / question.total) * 100}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SentimentByQuestion;