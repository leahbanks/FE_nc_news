import { useNavigate, Link } from "react-router-dom";

export default function ArticleCard(props) {
  const {
    title,
    body,
    article_id,
    author,
    topic,
    comment_count,
    votes,
    formattedDate,
  } = props;

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/articles/${article_id}`);
  };

  return (
    <section>
      <ul
        key={article_id}
        style={{ listStyle: "none" }}
        className="ArticleList"
      >
        <li>
          <h4 className="article-info">
            {formattedDate.slice(3, formattedDate.length)} |{" "}
            {topic.charAt(0).toUpperCase() + topic.slice(1, topic.length)}
          </h4>
          <Link
            to={`/articles/${article_id}`}
            style={{ textDecoration: "none" }}
          >
            <h2>{title}</h2>
          </Link>
          <h4 className="article-info">
            By {author} | 💬 {comment_count} | 👍 {votes}
          </h4>
          <p className="articlePreview">{body.substr(0, 190) + "..."}</p>
        </li>
        <button onClick={() => handleClick()}>Read More</button>
      </ul>
    </section>
  );
}
