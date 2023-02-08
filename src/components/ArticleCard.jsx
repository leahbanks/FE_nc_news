import { useNavigate } from "react-router-dom";

export default function ArticleCard(props) {
  const {
    title,
    body,
    article_id,
    author,
    topic,
    comment_count,
    votes,
    created_at,
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
          <h4>
            {author} |{" "}
            {topic.charAt(0).toUpperCase() + topic.slice(1, topic.length)} |{" "}
            {comment_count} Comments | {votes} Votes | {created_at.slice(0, 10)}
          </h4>
          <h2>{title}</h2>
          {body.substr(0, 150) + "..."}
        </li>
        <button onClick={() => handleClick()}>Read More</button>
      </ul>
    </section>
  );
}
