import { useState } from "react";
import { patchArticleVotes } from "../utils/api";

function VotePanel({ article_id, initialVotes }) {
  const [votes, setVotes] = useState(initialVotes);
  const [hasVoted, setHasVoted] = useState(0);
  const [error, setError] = useState(null);

  const updateVote = (change) => {
    setVotes((curr) => curr + change);
    setHasVoted((curr) => curr + change);

    patchArticleVotes(article_id, change)
      .catch(() => {
        setVotes((curr) => curr - change);
        setHasVoted((curr) => curr - change);
        setError("Vote failed. Please try again.");
      });
  };

  return (
    <div className="vote-panel">
      <p><strong>Votes:</strong> {votes}</p>
      <button onClick={() => updateVote(1)} disabled={hasVoted === 1}>👍</button>
      <button onClick={() => updateVote(-1)} disabled={hasVoted === -1}>👎</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default VotePanel;