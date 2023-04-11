import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CommentList from "../CommentList/CommentList";
import ArticleVotes from "../ArticleVotes/ArticleVotes";
import { getArticleById, getUsers } from "../../utils/api";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import "./Article.css";
import { AiOutlineArrowRight } from "react-icons/ai";

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
      <section className="article">
        <h4>Published at {article.formattedDate}</h4>
        <h2>{article.title}</h2>
        <h4>
          <button className="comment-scroll-button" onClick={handleClickScroll}>
            💬 <u>{article.comment_count} comments</u>
          </button>{" "}
          {""}👍 {article.votes}{" "}
          {article.votes === 0 || article.votes > 1 ? "people " : "person "}
          <button
            className="vote-scroll-button"
            onClick={handleVoteClickScroll}
          >
            <u> enjoyed this article</u>
          </button>
        </h4>
        <h5 className="article">
          {" "}
          <img
            className="user-avatar"
            src={articleAuthor.avatar_url}
            alt={`${articleAuthor.username}'s Avatar`}
          />{" "}
          Written by {articleAuthor.username}
        </h5>
        <img
          className="article-img"
          src={article.article_img_url}
          alt={article.title}
        />
        <p className="article-body" id="body">
          {article.body}
        </p>
        <button className="more-articles" onClick={handleClick}>
          More articles in {article.topic}{" "}
          <AiOutlineArrowRight className="arrow" />
        </button>
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
