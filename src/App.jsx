import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import ArticleList from "./components/ArticleList";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<ArticleList />} />
      </Routes>
    </div>
  );
}

export default App;