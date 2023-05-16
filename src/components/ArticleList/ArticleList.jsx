import ArticleCard from "../ArticleCard/ArticleCard";
import { useEffect, useState } from "react";
import { fetchArticles } from "../../utils/api";
import { format } from "date-fns";
import { useSearchParams } from "react-router-dom";
import "./ArticleList.css";
import {AiOutlineArrowUp} from "react-icons/ai";

export default function ArticleList() {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  let [search, setSearch] = useSearchParams();
  const topic = search.get("topic");
  const sort_by = search.get("sort_by");

  const articlesPerPage = 6;

  const [next, setNext] = useState(articlesPerPage);

  const handleMoreArticles = () => {
    setNext(next + articlesPerPage);
  };

  const handleClickScroll = () => {
    const element = document.getElementById("filter");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }

  useEffect(() => {
    fetchArticles(topic, sort_by).then((articles) => {
      setArticles(articles);
      setLoading(false);
    });
  }, [topic, sort_by]);

  const handleChange = (event) => {
    setLoading(true);
    event.preventDefault();
    setSearch({
      sort_by: event.target.value,
      ...(topic ? { topic } : null),
    });
    setLoading(false);
  };

  return loading ? (
    <section className="loading-animation"></section>
  ) : (
    <div className="main-container">
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

      {topic ? (
        <h2 className="article-list-caption">
          Latest articles in{" "}
          {topic.charAt(0).toUpperCase() + topic.slice(1, topic.length)}{" "}
          {topic === "football" ? "⚽" : null}{" "}
          {topic === "cooking" ? "🍲" : null} {topic === "coding" ? "💻" : null}
        </h2>
      ) : (
        <h2 className="article-list-caption">All articles 📰</h2>
      )}
      <section className="article-list-container">
        <ul className="article-list">
          {articles &&
            articles.slice(0, next).map((article) => {
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

          {next < articles.length ? (
            <button onClick={handleMoreArticles} className="loadmore-btn">
              Load more
            </button>
          ) : (
            <button onClick={handleClickScroll} className="loadmore-btn">Back to top <AiOutlineArrowUp/></button>
          )}
        </ul>
      </section>
    </div>
  );
}
