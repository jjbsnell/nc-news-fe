import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CommentBlock from "./CommentBlock";
import VotePanel from "./VotePanel";

function ArticlePage() {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    fetch(`https://nc-news-udp6.onrender.com/api/articles/${article_id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch article");
        return res.json();
      })
      .then((data) => {
        setArticle(data.article);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, [article_id]);

  if (isLoading) return <p>Loading article...</p>;
  if (error) return <p>Error: {error}</p>;

  const { title, author, created_at, topic, body, votes } = article;

  return (
    <article className="article-page">
      <h2>{title}</h2>
      <p>
        by {author} | {new Date(created_at).toLocaleDateString()} | Topic: {topic}
      </p>
      <p>{body}</p>

      <VotePanel article_id={article_id} initialVotes={votes} />

      <button onClick={() => setShowComments(!showComments)}>
        {showComments ? "Hide Comments" : "View Comments"}
      </button>

      {showComments && <CommentBlock />}
    </article>
  );
}

export default ArticlePage;