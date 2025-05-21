function ArticleCard({ article }) {
  const { title, author, created_at, topic } = article;

  return (
    <li>
      <h2>{title}</h2>
      <p>
        by {author} | {new Date(created_at).toLocaleDateString()} | Topic: {topic}
      </p>
    </li>
  );
}

export default ArticleCard;