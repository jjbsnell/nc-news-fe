import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import ArticleList from "./components/ArticleList";
import ArticlePage from "./components/ArticlePage";
import TopicPage from "./components/TopicPage";
import NotFound from "./components/NotFound";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <div className="App">
        <main>
          <Routes>
            <Route path="/" element={<ArticleList />} />
            <Route path="/articles/:article_id" element={<ArticlePage />} />
            <Route path="/topics/:topic_slug" element={<TopicPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;