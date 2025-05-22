import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function TopicList() {
  const [topics, setTopics] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://nc-news-udp6.onrender.com/api/topics")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load topics");
        return res.json();
      })
      .then((data) => {
        setTopics(data.topics);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  const handleChange = (e) => {
    const topic = e.target.value;
    if (topic !== "") {
      navigate(`/topics/${topic}`);
    }
  };

  if (error) return <p>Error loading topics: {error}</p>;

  return (
    <div className="topic-dropdown">
      <label htmlFor="topic-select"><strong>Choose a topic: </strong></label>
      <select id="topic-select" onChange={handleChange}>
        <option value="">-- Select a topic --</option>
        {topics.map((topic) => (
          <option key={topic.slug} value={topic.slug}>
            {topic.slug}
          </option>
        ))}
      </select>
    </div>
  );
}

export default TopicList;