import { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";
import TopicList from "./TopicList";
import { useSearchParams } from "react-router-dom";

function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();
  const sort_by = searchParams.get("sort_by") || "created_at";
  const order = searchParams.get("order") || "desc";

  useEffect(() => {
    fetch(`https://nc-news-udp6.onrender.com/api/articles?sort_by=${sort_by}&order=${order}`)
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

      <div className="sort-controls">
        <label>Sort by: </label>
        <select
          value={sort_by}
          onChange={(e) => setSearchParams({ sort_by: e.target.value, order })}
        >
          <option value="created_at">Date</option>
          <option value="comment_count">Comments</option>
          <option value="votes">Votes</option>
        </select>

        <label>Order: </label>
        <select
          value={order}
          onChange={(e) => setSearchParams({ sort_by, order: e.target.value })}
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>

      <section className="article-list">
        {articles.map((article) => (
          <ArticleCard key={article.article_id} article={article} />
        ))}
      </section>
    </>
  );
}

export default ArticleList;