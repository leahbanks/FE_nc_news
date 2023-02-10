import { postComment } from "../utils/api";
import { useContext, useState } from "react";
import { UserContext } from "../context/userContext";
import { setDayWithOptions } from "date-fns/fp";

export default function AddComment({
  setComments,
  comments,
  article_id,
  loadingComments,
  setLoadingComments,
}) {
  const { loggedInUser} = useContext(UserContext);
  const [posting, setPosting] = useState(false);
  const [posted, setPosted] = useState(false);
  const [commentBody, setCommentBody] = useState("");
  console.log(loggedInUser)

  const handleSubmit = (e) => {
    e.preventDefault();
    setPosting(true);
    postComment(article_id, { username: loggedInUser.username, body: commentBody })
      .then((postedComment) => {
          setComments((currComments) => {
            const updatedComments = [postedComment, ...currComments]
                return updatedComments;
          });
        setPosted(true);
        setPosting(false);
        setLoadingComments(false)
      })
      .catch((err) => {
        "Something went wrong - please try again!";
      });
  };

  if (posting) {
    return "Posting...";
  }

  return (
    <section className="add-comment">
      <div>
        {!posted ? (
          <form className="button-container" onSubmit={(e) => handleSubmit(e)}>
            <textarea
              id="comment-body"
              placeholder="type your comment here"
              onChange={(e) => setCommentBody(e.target.value)}
              value={commentBody}
            ></textarea>
            <button
              type="submit"
              className="button-addcomment"
              disabled={commentBody.length === 0}
            >
              Add Comment
            </button>
          </form>
        ) : (
          <p>Comment posted!</p>
        )}
      </div>
    </section>
  );
}
