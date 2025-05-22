import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";

function TopicPage() {
  const { topic_slug } = useParams();
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://nc-news-udp6.onrender.com/api/articles?topic=${topic_slug}`)
      .then((res) => {
        if (!res.ok) throw new Error("Topic not found");
        return res.json();
      })
      .then((data) => {
        setArticles(data.articles);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, [topic_slug]);

  if (isLoading) return <p>Loading articles...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className="article-list">
      <h2>Articles about "{topic_slug}"</h2>
      {articles.map((article) => (
        <ArticleCard key={article.article_id} article={article} />
      ))}
    </section>
  );
}

export default TopicPage;