export default function ArticleCard(props) {
  const { title, body, article_id, author, topic, comment_count, votes } =
    props;
  return (
    <ul key={article_id} style={{ listStyle: "none" }} className="ArticleList">
      <li>
        <h4>
          {author} |{" "}
          {topic.charAt(0).toUpperCase() + topic.slice(1, topic.length)} |{" "}
          {comment_count} Comments | {votes} Votes
        </h4>
        <h2>{title}</h2>
        {body.substr(0, 150) + "..."}
      </li>
      <button onClick={() => console.log(body)}>Read More</button>
    </ul>
  );
}
