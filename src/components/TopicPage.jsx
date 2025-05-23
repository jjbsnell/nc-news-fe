import { useParams, useSearchParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";
import SortControls from "./SortControls";

function TopicPage() {
  const { topic_slug } = useParams();
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchParams] = useSearchParams();
  const sort_by = searchParams.get("sort_by") || "created_at";
  const order = searchParams.get("order") || "desc";

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    fetch(
      `https://nc-news-udp6.onrender.com/api/articles?topic=${topic_slug}&sort_by=${sort_by}&order=${order}`
    )
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
  }, [topic_slug, sort_by, order]);

  if (isLoading) return <p>Loading articles...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div style={{ marginBottom: "1rem" }}>
        <Link to="/">
          <button>← Back to Home</button>
        </Link>
      </div>

      <SortControls />

      <section className="article-list">
        <h2>Articles about "{topic_slug}"</h2>
        {articles.map((article) => (
          <ArticleCard key={article.article_id} article={article} />
        ))}
      </section>
    </>
  );
}

export default TopicPage;