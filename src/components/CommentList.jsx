import AddComment from "./AddComment";
import { getComments } from "../utils/api";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import CommentCard from "./CommentCard";
import { UserContext } from "../context/userContext";
import { format } from "date-fns";

export default function CommentList() {
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true);
  const { article_id } = useParams();
  const { loggedInUser } = useContext(UserContext);

  useEffect(() => {
    setLoadingComments(true)
    getComments(article_id).then((comments) => setComments(comments));
    setLoadingComments(false);
  }, [article_id, loggedInUser]);

  if (loadingComments) {
    return "Loading...";
  }

  return (
    <section className="commentsSection">
      <h3>{comments.length} Comments</h3>
      {comments.length === 0 ? <p>No comments found</p> : ""}
      <AddComment
        setComments={setComments}
        comments={comments}
        article_id={article_id}
        loadingComments={loadingComments}
        setLoadingComments={setLoadingComments}
      />
      <section className="commentsContainer">
        {comments.map((comment) => {
          const date = new Date(comment.created_at);
          const formattedDate = format(date, "HH:MM E do LLL y");
          return (
            <CommentCard
              comments={comments}
              setComments={setComments}
              comment={comment}
              key={comment.comment_id}
              formattedDate={formattedDate}
            />
          );
        })}
      </section>
    </section>
  );
}
