import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function CommentBlock() {
  const { article_id } = useParams();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsPosting(true);
    setError(null);

    fetch(`https://nc-news-udp6.onrender.com/api/articles/${article_id}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "grumpy19", // your hardcoded user
        body: newComment
      })
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to post comment");
        return res.json();
      })
      .then((data) => {
        setComments((curr) => [data.comment, ...curr]);
        setNewComment("");
      })
      .catch(() => {
        setError("Failed to post comment. Please try again.");
      })
      .finally(() => setIsPosting(false));
  };

  if (isLoading) return <p>Loading comments...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className="comment-block">
      <h3>Comments</h3>

      <form onSubmit={handleSubmit} className="comment-form">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          rows="3"
          disabled={isPosting}
        />
        <button type="submit" disabled={isPosting || !newComment.trim()}>
          {isPosting ? "Posting..." : "Post Comment"}
        </button>
      </form>

      <ul>
        {comments.map((comment) => (
          <li key={comment.comment_id} className="comment-card">
            <p>
              <strong>{comment.author}</strong> —{" "}
              {new Date(comment.created_at).toLocaleDateString()}
            </p>
            <p>{comment.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default CommentBlock;