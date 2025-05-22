function ErrorCard({ message }) {
  return (
    <div className="error-card">
      <h2>Error</h2>
      <p>{message}</p>
    </div>
  );
}

export default ErrorCard;