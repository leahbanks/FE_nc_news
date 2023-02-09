import { useState } from "react";
import { patchArticleVotes } from "../utils/api";

export default function ArticleVotes({ article, setArticle }) {
  const [voted, setVoted] = useState(false);

  const updateVotes = (e) => {
    let num = 0;
    if (e.target.value === "increase") {
      num = 1;
    } else if (e.target.value === "decrease") {
      num = -1;
    }
    setArticle((currArticle) => {
      currArticle.votes += num;
      return { ...currArticle };
    });
    setVoted(true);
    patchArticleVotes(article.article_id, num).then((response) => {
      return response;
    });
  };

  return (
    <section className="articleVote">
      {!voted ? 
      ( <div>
          <p>Enjoyed this article?</p>
          <button onClick={updateVotes} value={"increase"}>👍</button>
          <button onClick={updateVotes} value={"decrease"}>👎</button>
        </div> ) : ( <p> Thanks for your feedback! </p>)}
    </section>
  );
}
