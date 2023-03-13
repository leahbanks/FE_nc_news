import { postComment } from "../utils/api";
import { useContext, useState } from "react";
import { UserContext } from "../context/userContext";
import { Link } from "react-router-dom";

export default function AddComment({
  setComments,
  article_id,
  setLoadingComments,
}) {
  const { loggedInUser } = useContext(UserContext);
  const [posting, setPosting] = useState(false);
  const [posted, setPosted] = useState(false);
  const [commentBody, setCommentBody] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setPosting(true);
    if (loggedInUser === undefined) {
      setPosting(false);
      return "you must be logged in to post a comment!";
    } else {
      postComment(article_id, { username: loggedInUser, body: commentBody })
        .then((postedComment) => {
          setComments((currComments) => {
            return [postedComment, ...currComments];
          });
          setPosted(true);
          setPosting(false);
          setLoadingComments(false);
        })
        .catch((err) => {
          "Something went wrong - please try again!";
        });
    }
  };

  if (posting) {
    return "Posting...";
  }

  return (
    <section className="add-comment">
      <div>
        {!posted ? (
          <form className="button-container" onSubmit={(e) => handleSubmit(e)}>
            {loggedInUser ? (
              <textarea
                id="comment-body"
                placeholder="type your comment here"
                onChange={(e) => setCommentBody(e.target.value)}
                value={commentBody}
                className="comment-body"
              ></textarea>  
            ) : null}
            {loggedInUser ? (
              <button
                type="submit"
                className="button-addcomment"
                disabled={commentBody.length === 0}
              >
                Add Comment
              </button>
            ) : (
              <Link
                to="/users"
                style={{ textDecoration: "none" }}
                className="button-addcomment"
              >
                Log in to post a comment
              </Link>
            )}
          </form>
        ) : (
          <p>Comment posted!</p>
        )}
      </div>
    </section>
  );
}
