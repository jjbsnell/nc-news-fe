import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import ArticleList from "./components/ArticleList";
import ArticlePage from "./components/ArticlePage";
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
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;