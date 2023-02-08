import "./App.css";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import ArticleList from "./components/ArticleList";
import Article from "./components/Article";
import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import {getTopics} from "./utils/api";

function App() {
  const [loading, setLoading] = useState(true);
  const [article, setArticle] = useState({});
  const [topics, setTopics] = useState("");

  useEffect(() => {
    getTopics().then((topics) => setTopics(topics));
    setLoading(false);
  }, [topics, setLoading]);

  if (loading) {
    return "Loading...";
  }

  return (
    <div className="App">
      <Header />
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <ArticleList
              article={article}
              setArticle={setArticle}
            />
          }
        ></Route>
        <Route
          path="/articles/:article_id"
          element={
            <Article
              article={article}
              setArticle={setArticle}
            />
          }
        ></Route>
      </Routes>
      <br></br>
    </div>
  );
}

export default App;
