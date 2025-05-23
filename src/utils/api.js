import axios from "axios";

const api = axios.create({
  baseURL: "https://nc-news-udp6.onrender.com/api"
});

export const patchArticleVotes = (article_id, inc_votes) => {
  return api.patch(`/articles/${article_id}`, { inc_votes });
};