import { Link } from "react-router-dom";
import "./ArticleCard.css";

export default function ArticleCard(props) {
  const {
    title,
    article_id,
    author,
    topic,
    comment_count,
    votes,
    formattedDate,
    article_img_url,
  } = props;
 
  return (
    <li className="article-card">
      <Link
        to={`/articles/${article_id}`}
        style={{ textDecoration: "none" }}
        className="card-title"
      >
        <img
          className="article-card-img"
          src={article_img_url}
          alt={`${title}`}
        />
      </Link>

      <div className="card-info">
        <Link
          to={`/articles/${article_id}`}
          style={{ textDecoration: "none" }}
          className="card-title"
        >
          <h3 className="title">{title}</h3>
        </Link>
        <div className="card-details">
          <h5>{formattedDate.slice(3, formattedDate.length)}</h5>
          <h5>{author}</h5>
          <h5>{topic}</h5>
          <h5> 💬 {comment_count} </h5>
          <h5> 👍 {votes}</h5>
        </div>
      </div>
    </li>
  );
}
