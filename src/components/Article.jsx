import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CommentList from "./CommentList";
import ArticleVotes from "./ArticleVotes";
import { getArticleById, getUsers } from "../utils/api";
import { format } from "date-fns";

export default function Article(props) {
  const { article, setArticle } = props;
  const [articleLoading, setArticleLoading] = useState(true);
  const [articleAuthor, setArticleAuthor] = useState({});
  const { article_id } = useParams();

  useEffect(() => {
    Promise.all([getArticleById(article_id), getUsers()]).then(
      ([articleResponse, userResponse]) => {
        const date = new Date(articleResponse.created_at);
        const formattedDate = format(date, "HH:MM E do LLL y");
        const newArticle = { ...articleResponse, formattedDate };
        setArticle(newArticle);
        userResponse.forEach((user) => {
          if (user.username === newArticle.author) {
            setArticleAuthor(user);
            setArticleLoading(false);
          }
        });
      }
    );
  }, [article_id, setArticleLoading, setArticle, article.created_at]);

  if (articleLoading) {
    return "Loading...";
  }

  return (
    <section>
      <section className="Article">
      <h2>{article.title}</h2>
      <h4 className="Article">
        
        {article.topic.charAt(0).toUpperCase() +
          article.topic.slice(1, article.topic.length)}{" "}
        | {article.formattedDate} | 💬 {article.comment_count} | 👍{" "}
        {article.votes}
      </h4>
      <h5 className="Article">
        {" "}
        <img
          className="userAvatar"
          src={articleAuthor.avatar_url}
          alt={`${articleAuthor.username}'s Avatar`}
        /> by {articleAuthor.username}
      </h5>
      <img
        className="articleImg"
        src={article.article_img_url}
        alt={article.title}
      />
      <p className="articleBody">{article.body}</p>
      </section>
      <ArticleVotes article={article} setArticle={setArticle}/>
      
      <CommentList article={article} articleAuthor={articleAuthor} />
    </section>
  );
}
