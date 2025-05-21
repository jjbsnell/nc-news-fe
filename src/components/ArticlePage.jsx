import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function ArticlePage() {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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

  const { title, author, body, created_at, topic } = article;

  return (
    <article className="article-page">
      <h2>{title}</h2>
      <p>
        by {author} | {new Date(created_at).toLocaleDateString()} | Topic: {topic}
      </p>
      <p>{body}</p>
    </article>
  );
}

export default ArticlePage;