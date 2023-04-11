import "./App.css";
import Header from "./components/Header/Header";
import ArticleList from "./components/ArticleList/ArticleList";
import Article from "./components/Article/Article";
import LogIn from "./components/LogIn/LogIn"
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
          path="/articles"
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
          <Route
          path="/users" 
          element={<LogIn/>}
        ></Route>
      </Routes>
      <br></br>
      
    </div>
    
  );
}



export default App;
