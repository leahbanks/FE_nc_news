import axios from "axios";

export const newsApi = axios.create({
  baseURL: "https://nc-news-81lq.onrender.com/api",
});

export const fetchArticles = () => {
  return newsApi.get("/articles").then(({ data }) => {
    return data.articles;
  });
};

export const getArticleById = (article_id) => {
  return newsApi.get(`/articles/${article_id}`).then(({ data }) => {
    return data.article;
  });
};

export const getUsers = () => {
  return newsApi.get("/users").then(({ data }) => {
    return data;
  });
};

export const getTopics = () => {
  return newsApi.get("/topics").then(({ data }) => {
    return data.topics;
  });
};

export const getComments = (article_id) => {
  return newsApi.get(`/articles/${article_id}/comments`).then(({ data }) => {
    return data;
  });
};

export const patchArticleVotes = (article_id, num) => {
  const voteIncrease = {
    inc_votes: num,
  };
  return newsApi
    .patch(`articles/${article_id}`, voteIncrease)
    .then(({ data }) => {
      return data.updatedVotes;
    });
};

export const postComment = (article_id, newComment) => {
  return newsApi
    .post(`/articles/${article_id}/comments`, newComment)
    .then(({ data }) => {
      return data.postedComment;
    });
};
