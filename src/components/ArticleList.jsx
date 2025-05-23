import { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";
import TopicList from "./TopicList";
import SortControls from "./SortControls";
import { useSearchParams } from "react-router-dom";

function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [searchParams] = useSearchParams();
  const sort_by = searchParams.get("sort_by") || "created_at";
  const order = searchParams.get("order") || "desc";

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    fetch(
      `https://nc-news-udp6.onrender.com/api/articles?sort_by=${sort_by}&order=${order}`
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch articles");
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
  }, [sort_by, order]);

  if (isLoading) return <p>Loading articles...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <TopicList />
      <SortControls />
      <section className="article-list">
        {articles.map((article) => (
          <ArticleCard key={article.article_id} article={article} />
        ))}
      </section>
    </>
  );
}

export default ArticleList;