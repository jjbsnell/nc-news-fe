import { useState } from "react";

function VotePanel({ article_id, initialVotes }) {
  const [votes, setVotes] = useState(initialVotes);
  const [hasVoted, setHasVoted] = useState(0); // +1, -1, or 0
  const [error, setError] = useState(null);

  const updateVote = (change) => {
    setVotes((curr) => curr + change);
    setHasVoted((curr) => curr + change);

    fetch(`https://nc-news-udp6.onrender.com/api/articles/${article_id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ inc_votes: change })
    })
      .then((res) => {
        if (!res.ok) throw new Error("Vote failed");
        return res.json();
      })
      .catch(() => {
        setVotes((curr) => curr - change);
        setHasVoted((curr) => curr - change);
        setError("Vote failed. Please try again.");
      });
  };

  return (
    <div className="vote-panel">
      <p><strong>Votes:</strong> {votes}</p>
      <button
        onClick={() => updateVote(1)}
        disabled={hasVoted === 1}
      >
        👍
      </button>
      <button
        onClick={() => updateVote(-1)}
        disabled={hasVoted === -1}
      >
        👎
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default VotePanel;