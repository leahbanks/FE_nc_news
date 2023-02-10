import { postComment } from "../utils/api";
import { useContext, useState } from "react";
import { UserContext } from "../context/userContext";

export default function AddComment({ setComments, comments, article_id }) {
  const { loggedInUser } = useContext(UserContext);
  const [posting, setPosting] = useState(false);
  const [posted, setPosted] = useState(false);
  const [commentBody, setCommentBody] = useState("");
  const [newComment, setNewComment] = useState({
    comment_id: comments.length + 1,
    body: commentBody,
    article_id: article_id,
    author: "grumpy19",
    votes: 0,
    created_at: new Date(),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setPosting(true)
    setComments([newComment, ...comments]);
    postComment(article_id, { username: "grumpy19", body: commentBody })
      .then((postedComment) => {
        setComments((currComments) => {
          return [postedComment, ...currComments];
        });
        setCommentBody("");
        setPosted(true);
        setPosting(false);
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
          <form className="button-container" onSubmit={handleSubmit}>
            <textarea
              id="comment-body"
              onChange={(e) => setCommentBody(e.target.value)}
              value={commentBody}
            ></textarea>
            <button type="submit" className="button-addcomment">
              {posted ? <p>Comment submitted! </p> : <p>Add Comment</p>}
            </button>
          </form>
        ) : (
          <p>Comment posted!</p>
        )}
      </div>
    </section>
  );
}
