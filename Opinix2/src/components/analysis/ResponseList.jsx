function ResponseList({ analysisResult, selectedPoll }) {
  if (!analysisResult || !selectedPoll) {
    return (
      <div>
        <h3>Responses</h3>
        <p>Waiting for analysis results...</p>
      </div>
    );
  }

  const enrichedResults = analysisResult.results?.map((item) => {
    let rowIndex = null;
    let questionLabel = "Unknown Question";

    const matchingResponse = selectedPoll.responses?.find(
      (response) => response.id === item.responseId
    );

    if (matchingResponse) {
      rowIndex = matchingResponse.rowIndex;

      const matchingAnswer = matchingResponse.answers?.find(
        (answer) => answer.questionId === item.questionId
      );

      if (matchingAnswer?.questionLabel) {
        questionLabel = matchingAnswer.questionLabel;
      }
    }

    return {
      ...item,
      rowIndex,
      questionLabel,
    };
  });

  return (
    <div>
      <h3>Responses</h3>

      {enrichedResults?.map((item, index) => (
        <div
          key={`${item.responseId}-${item.questionId}-${index}`}
          className="response-item"
        >
          <div className="response-meta">
            <span>Row {item.rowIndex ?? "?"}</span>
          </div>

          <div className="response-question">
            Question: {item.questionLabel}
          </div>

          <div className="response-text">
            "{item.text}"
          </div>

          <div className={`response-sentiment ${item.sentiment?.toLowerCase()}`}>
            {item.sentiment} • score {Number(item.score).toFixed(2)}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ResponseList;