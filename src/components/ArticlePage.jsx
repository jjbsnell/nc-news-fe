import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ErrorCard from "./ErrorCard";
import CommentBlock from "./CommentBlock";
import VotePanel from "./VotePanel";

function ArticlePage() {
  const { article_id } = useParams();

  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
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
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, [article_id]);

  if (isLoading) return <p>Loading article...</p>;
  if (error) return <ErrorCard message={error} />;

  return (
    <article className="article-page">
      <h2>{article.title}</h2>
      <p>
        by {article.author} | {new Date(article.created_at).toLocaleDateString()} | Topic: {article.topic}
      </p>
      <p>{article.body}</p>

      <VotePanel article_id={article_id} initialVotes={article.votes} />

      <button onClick={() => setShowComments((curr) => !curr)}>
        {showComments ? "Hide Comments" : "Show Comments"}
      </button>

      {showComments && <CommentBlock article_id={article_id} />}
    </article>
  );
}

export default ArticlePage;