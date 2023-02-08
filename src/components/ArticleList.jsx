import ArticleCard from "./ArticleCard";
import { useEffect, useState } from "react";
import { fetchArticles } from "../utils/api";

export default function ArticleList() {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles().then((articles) => setArticles(articles));
    setLoading(false);
  }, [articles, setLoading]);

  if (loading) {
    return "Loading...";
  }

  return (
    <div>
      {articles.map((article) => (
        <ArticleCard {...article} key={article.article_id}/>
      ))}
    </div>
  );
}
