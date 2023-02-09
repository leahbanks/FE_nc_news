import { useState } from "react";
import { patchArticleVotes } from "../utils/api";

export default function ArticleVotes({ article, setArticle }) {
  const [voted, setVoted] = useState(false);

  const updateVotes = (event) => {
    let num = 0;
    if (event.target.value === "increase") {
    num = 1;
    } else {
        num = -1;
    }
    setArticle((currArticle) => {
        currArticle.votes += num;
        return {...currArticle};
    })
    setVoted(true)
    patchArticleVotes(article.article_id, num).then((response) => {
        return response;
    })
  }


//   const increaseVotes = () => {
//     setVotes((currVotes) => currVotes + 1);
//     patchArticleVotes(article.article_id, 1);
//   };

//   const decreaseVotes = () => {
//     setVotes((currVotes) => currVotes - 1);
//     patchArticleVotes(article.article_id, -1);
//   };

  return (
    <div className="articleVote">
        {!voted ? (
            <>
           <p>Enjoyed this article?</p>
           <button onClick={updateVotes}
           value={"increase"}
      >👍</button>
       <button onClick={updateVotes}
        value={"decrease"}>
        👎
      </button>
      </>
        ) : (
            <p> Thanks for your feedback! </p>
        )}
    </div>
  );
}
