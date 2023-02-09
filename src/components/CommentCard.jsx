export default function CommentCard({ comment, formattedDate }) {
  return (
    <article className="commentCard">
      <p>
        Posted at {formattedDate}
      </p>
      <h4>{comment.author}</h4>

      <p>{comment.body}</p>
      <br></br>
      <button>⬆️</button> {comment.votes} <button>⬇️</button>
    </article>
  );
}
