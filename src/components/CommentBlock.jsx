import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function CommentBlock() {
  const { article_id } = useParams();
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://nc-news-udp6.onrender.com/api/articles/${article_id}/comments`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch comments");
        return res.json();
      })
      .then((data) => {
        setComments(data.comments);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, [article_id]);

  if (isLoading) return <p>Loading comments...</p>;
  if (error) return <p>Error: {error}</p>;
  if (comments.length === 0) return <p>No comments yet.</p>;

  return (
    <section className="comment-block">
      <h3>Comments</h3>
      <ul>
        {comments.map((comment) => (
          <li key={comment.comment_id} className="comment-card">
            <p><strong>{comment.author}</strong> — {new Date(comment.created_at).toLocaleDateString()}</p>
            <p>{comment.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default CommentBlock;