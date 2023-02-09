import ArticleCard from "./ArticleCard";
import { useEffect, useState } from "react";
import { fetchArticles } from "../utils/api";
import { format } from "date-fns";

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
      {articles.map((article) => {
        const date = new Date(article.created_at);
        const formattedDate = format(date, "E do LLL y");
        return <ArticleCard {...article} formattedDate={formattedDate} key={article.article_id} />;
      })}
    </div>
  );
}
