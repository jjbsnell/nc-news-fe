import { Link } from "react-router-dom";

function ArticleCard({ article }) {
  const { article_id, title, author, created_at, topic, article_img_url } = article;

  return (
    <article className="article-card">
      <img
        src={article_img_url}
        alt={`Image for ${title}`}
        className="article-image"
      />
      <div className="article-card-content">
        <Link to={`/articles/${article_id}`}>
          <h2>{title}</h2>
        </Link>
        <p>
          by {author} | {new Date(created_at).toLocaleDateString()} | Topic: {topic}
        </p>
      </div>
    </article>
  );
}

export default ArticleCard;