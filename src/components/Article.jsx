import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CommentList from "./CommentList";
import ArticleVotes from "./ArticleVotes";
import { getArticleById, getUsers } from "../utils/api";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

export default function Article(props) {
  const { article, setArticle } = props;
  const [articleLoading, setArticleLoading] = useState(true);
  const [articleAuthor, setArticleAuthor] = useState({});
  const { article_id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([getArticleById(article_id), getUsers()]).then(
      ([articleResponse, userResponse]) => {
        const date = new Date(articleResponse.created_at);
        const formattedDate = format(date, "HH:MM 'on' E do LLL y");
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
  }, [
    article_id,
    setArticleLoading,
    setArticle,
    article.created_at,
    setArticleAuthor,
  ]);

  const handleClickScroll = () => {
    const element = document.getElementById("comment-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleVoteClickScroll = () => {
    const element = document.getElementById("vote-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleClick = () => {
    navigate(`/articles/?topic=${article.topic}`);
  };

  return articleLoading ? (
    <section className="loading-animation"></section>
  ) : (
    <div>
      <section className="Article">
        <h2>{article.title}</h2>
        <h4>
          {article.formattedDate} in
          <button className="topic-nav-button" onClick={handleClick}>
            <u>
              {article.topic.charAt(0).toUpperCase() +
                article.topic.slice(1, article.topic.length)}
            </u>
          </button>{" "}
          <button className="comment-scroll-button" onClick={handleClickScroll}>
            💬 <u>{article.comment_count} comments</u>
          </button>{" "}
          {""}👍 {article.votes} {article.votes === 0 || article.votes > 1 ? "people" : "person"}
          <button
            className="vote-scroll-button"
            onClick={handleVoteClickScroll}
          >
            <u>enjoyed this article</u>
          </button>
        </h4>
        <h5 className="Article">
          {" "}
          <img
            className="userAvatar"
            src={articleAuthor.avatar_url}
            alt={`${articleAuthor.username}'s Avatar`}
          />{" "}
          Written by {articleAuthor.username}
        </h5>
        <img
          className="articleImg"
          src={article.article_img_url}
          alt={article.title}
        />
        <p className="articleBody" id="body">
          {article.body}
        </p>
      </section>
      <div id="vote-section">
        <ArticleVotes article={article} setArticle={setArticle} />
      </div>
      <div id="comment-section">
        <CommentList article={article} articleAuthor={articleAuthor} />
      </div>
    </div>
  );
}
