function ArticleCard({ article }) {
  const { title, author, created_at, topic } = article;

  return (
    <article className="article-card">
      <h2>{title}</h2>
      <p>
        by {author} | {new Date(created_at).toLocaleDateString()} | Topic: {topic}
      </p>
    </article>
  );
}

export default ArticleCard;