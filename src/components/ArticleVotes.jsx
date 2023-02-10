import { useState } from "react";
import { patchArticleVotes } from "../utils/api";

export default function ArticleVotes({ article, setArticle }) {
  const [voted, setVoted] = useState(false);
  const [error, setError] = useState("");

  const updateVotes = (e) => {
    let num = 0;
    if (e.target.value === "increase") {
      num = 1;
    } else if (e.target.value === "decrease") {
      num = -1;
    }
    setError("");
    setArticle((currArticle) => {
      currArticle.votes += num;
      return { ...currArticle };
    });
    setVoted(true);
    patchArticleVotes(article.article_id, num).catch((err) => {
      setArticle((currArticle) => {
        currArticle.votes -= num;
        return { ...currArticle };
      });
      setError("Something has gone wrong - please try again!");
      setVoted(false);
    });
  };

  return (
    <section className="articleVote">
      <div>
        {!voted ? (
          <div>
            <p>
              Enjoyed this article?{" "}
              <button onClick={updateVotes} value={"increase"}>
                👍
              </button>{" "}
              <button onClick={updateVotes} value={"decrease"}>
                👎
              </button>
            </p>
          </div>
        ) : (
          <p> Vote submitted! </p>
        )}
      </div>
      <p>{error}</p>
    </section>
  );
}
