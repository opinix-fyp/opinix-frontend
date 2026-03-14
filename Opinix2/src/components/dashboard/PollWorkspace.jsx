import SentimentChart from "../analysis/SentimentChart";
import AISummary from "../analysis/AISummary";
import ResponseList from "../analysis/ResponseList";

function PollWorkspace({ selectedPoll, analysisResult }) {
  return (
    <div className="poll-workspace">
      <h2>{selectedPoll?.title}</h2>

      <div className="analysis-grid">
        <div className="analysis-card">
          <SentimentChart analysisResult={analysisResult} />
        </div>

        <div className="analysis-card">
          <AISummary analysisResult={analysisResult} />
        </div>
      </div>

      <div className="analysis-card responses-section">
        <ResponseList
          analysisResult={analysisResult}
          selectedPoll={selectedPoll}
        />
      </div>
    </div>
  );
}

export default PollWorkspace;