import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CommentList from "./CommentList";
import { getArticleById, getUsers } from "../utils/api";

export default function Article(props) {
  const { article, setArticle } = props;
  const [articleLoading, setArticleLoading] = useState(true)
  const [articleAuthor, setArticleAuthor] = useState({});
  const { article_id } = useParams();

  useEffect(() => {
    Promise.all([getArticleById(article_id), getUsers()]).then(
      ([articleResponse, userResponse]) => {
        setArticle(articleResponse);
        userResponse.forEach((user) => {
          if (user.username === articleResponse.author) {
            setArticleAuthor(user);
            setArticleLoading(false);
          }
        });
      }
    );
  }, [article_id, setArticleLoading, setArticle]);

  if (articleLoading) {
    return "Loading...";
  }

  return (
    <section>
      <h4>
         {article['topic'].charAt(0).toUpperCase() +
          article['topic'].slice(1, article['topic'].length)}{" "}
        | {article['created_at'].slice(0, 10)} 
      </h4>
      <h2>{article.title}</h2>
      <h4>
        {" "}
        <img
          className="userAvatar"
          src={articleAuthor.avatar_url}
          alt={`${articleAuthor.username}'s Avatar`}
        />
        <br></br> By {articleAuthor.username}
      </h4>
      <img
        className="Article"
        src={article.article_img_url}
        alt={article.title}
      />
      <p className="Article">{article.body}</p>
      <CommentList article={article} />
    </section>
  );
}
