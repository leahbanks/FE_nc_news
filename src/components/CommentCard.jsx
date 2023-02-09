export default function CommentCard({ comment }) {
  return (
    <article className="commentCard">
      <p>
        Posted on {comment.created_at.slice(0, 10)} at{" "}
        {comment.created_at.slice(11, 16)}{" "}
      </p>
      <h4>{comment.author}</h4>
      <p>{comment.body}</p>
      <br></br>
      <button>⬆️</button> {comment.votes} <button>⬇️</button>
    </article>
  );
}
