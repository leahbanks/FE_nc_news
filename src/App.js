import "./App.css";
import Header from "./components/Header";
import ArticleList from "./components/ArticleList";
import Article from "./components/Article";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";

function App() {
  const [article, setArticle] = useState({});

  return (
    <div className="App">
      <Header />
      <Routes>
        {" "}
        <Route
          path="/articles/:topic"
          element={
            <ArticleList
            />
          }
        ></Route>
        <Route
          path="/"
          element={<ArticleList article={article} setArticle={setArticle} />}
        ></Route>
        <Route
          path="/articles/:article_id"
          element={<Article article={article} setArticle={setArticle} />}
        ></Route>
      </Routes>
      <br></br>
    </div>
  );
}

export default App;
