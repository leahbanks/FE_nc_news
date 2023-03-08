import ArticleCard from "./ArticleCard";
import { useEffect, useState } from "react";
import { fetchArticles } from "../utils/api";
import { format } from "date-fns";
import { useParams } from "react-router-dom";

export default function ArticleList() {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState("?sort_by=created_at");
  const { topic } = useParams();

  useEffect(() => {
    fetchArticles(topic, query).then((articles) => setArticles(articles));
    setLoading(false);
  }, [articles, setLoading, topic, query]);

  const handleChange = (event) => {
    event.preventDefault();
    setQuery(event.target.value);
  }

  if (loading) {
    return "Loading...";
  }

  return (
    <div >
      <form id="filter-articles" className="filter-articles">
          <select className="filter"onChange={handleChange} id="filter" value={query}>
            <option value="?sort_by=created_at">Most Recent</option>
            <option value="?sort_by=comment_count">Most Comments</option>
            <option value="?sort_by=votes">Most Votes</option>
          </select>
        </form>
      {articles.map((article) => {
        const date = new Date(article.created_at);
        const formattedDate = format(date, "E do LLL y");
        return <ArticleCard {...article} formattedDate={formattedDate} key={article.article_id} />;
      })}
    </div>
  );
}