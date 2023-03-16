import { useContext, useState } from "react";
import { UserContext } from "../context/userContext";
import { deleteCommentByCommentId } from "../utils/api";

export default function CommentCard({
  comment,
  formattedDate,
  comments,
  setComments,
}) {
  const { loggedInUser } = useContext(UserContext);
  const [deletedComments, setDeletedComments] = useState([]);

  const handleDelete = (comment_id) => {
    if (deletedComments.includes(comment_id)) {
      alert("Please wait - this comment is being deleted");
      return;
    }

    const updatedComments = comments.filter(
      (comment) => comment.comment_id !== comment_id
    );

    setDeletedComments([...deletedComments, comment_id]);

    deleteCommentByCommentId(comment_id).then(() => {
      setDeletedComments(deletedComments.filter((id) => id !== comment_id));
      setComments(updatedComments);
      alert("Your comment has now been deleted");
    });
  };

  return (
    <div className="commentCard">
    <article className="delete-comment">
    <p className="posted-date">
        Posted at {formattedDate} by {comment.author === loggedInUser ? <b>you</b> : <b>{comment.author}</b>}
      </p>
    {comment.author === loggedInUser ? (
      <button className="delete-button"
        onClick={() => {
          handleDelete(comment.comment_id);
        }}
      >
        🗑️ 
      </button>
    ) : null}
     </article>
     <article>
      <p className="comment-text">{comment.body}</p>
      <br></br>
      <button className="comment-vote">⬆️</button> {comment.votes}{" "}
      <button className="comment-vote">⬇️</button>
    </article>
    </div>
  );
}
