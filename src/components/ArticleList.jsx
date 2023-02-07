import ArticleCard from "./ArticleCard";
import { useEffect, useState } from "react";
import { fetchArticles } from "../api";

export default function ArticleList() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles().then((articles) => setArticles(articles));
  }, [articles]);

  return (
    <div>
      {articles.map((article) => (
        <ArticleCard {...article} key={article.article_id} />
      ))}
    </div>
  );
}
