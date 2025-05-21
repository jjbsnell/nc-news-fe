import { Link } from "react-router-dom";

function ArticleCard({ article }) {
  const { article_id, title, author, created_at, topic } = article;

  return (
    <article className="article-card">
      <Link to={`/articles/${article_id}`}>
        <h2>{title}</h2>
      </Link>
      <p>
        by {author} | {new Date(created_at).toLocaleDateString()} | Topic: {topic}
      </p>
    </article>
  );
}

export default ArticleCard;