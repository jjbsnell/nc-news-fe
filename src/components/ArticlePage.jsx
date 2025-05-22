import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ErrorCard from "./ErrorCard";
import CommentBlock from "./CommentBlock";

function ArticlePage() {
  const { article_id } = useParams();

  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [votes, setVotes] = useState(0);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    fetch(`https://nc-news-udp6.onrender.com/api/articles/${article_id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Article not found");
        return res.json();
      })
      .then((data) => {
        setArticle(data.article);
        setVotes(data.article.votes);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, [article_id]);

  function handleVote(change) {
    setVotes((curr) => curr + change);

    fetch(`https://nc-news-udp6.onrender.com/api/articles/${article_id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ inc_votes: change }),
    }).catch(() => {
      setVotes((curr) => curr - change); 
      setError("Vote failed. Please try again.");
    });
  }

  if (isLoading) return <p>Loading article...</p>;
  if (error) return <ErrorCard message={error} />;

  return (
    <article className="article-page">
      <h2>{article.title}</h2>
      <p>
        by {article.author} | {new Date(article.created_at).toLocaleDateString()} | Topic: {article.topic}
      </p>
      <p>{article.body}</p>

      <div className="vote-controls">
        <button onClick={() => handleVote(1)}>+1</button>
        <span>{votes}</span>
        <button onClick={() => handleVote(-1)}>-1</button>
      </div>

      <button onClick={() => setShowComments((curr) => !curr)}>
        {showComments ? "Hide Comments" : "Show Comments"}
      </button>

      {showComments && <CommentBlock article_id={article_id} />}
    </article>
  );
}

export default ArticlePage;