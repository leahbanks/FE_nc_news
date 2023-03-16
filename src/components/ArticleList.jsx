import ArticleCard from "./ArticleCard";
import { useEffect, useState } from "react";
import { fetchArticles } from "../utils/api";
import { format } from "date-fns";
import { useSearchParams } from "react-router-dom";

export default function ArticleList() {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  let [search, setSearch] = useSearchParams();
  const topic = search.get("topic");
  const sort_by = search.get("sort_by");

  useEffect(() => {
    fetchArticles(topic, sort_by).then((articles) => {
      setArticles(articles);
      setLoading(false);
    });
  }, [topic, sort_by]);

  const handleChange = (event) => {
    event.preventDefault();
    setSearch({
      sort_by: event.target.value,
      ...(topic ? { topic } : null),
    });
  };

  return loading ? (
    <section className="loading-animation"></section>
  ) : (
    <section>
      <select
        className="filter"
        onChange={(event) => {
          handleChange(event);
        }}
        name="filter"
        id="filter"
      >
        <option value="created_at">Most Recent</option>
        <option value="comment_count">Most Comments</option>
        <option value="votes">Most Votes</option>
      </select>
      {articles.map((article) => {
        const date = new Date(article.created_at);
        const formattedDate = format(date, "E do LLL y");
        return (
          <ArticleCard
            {...article}
            formattedDate={formattedDate}
            key={article.article_id}
          />
        );
      })}
    </section>
  );
}
