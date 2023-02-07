import axios from "axios";

export const newsApi = axios.create({
  baseURL: "https://nc-news-81lq.onrender.com/api",
});

export const fetchArticles = () => {
    return newsApi.get('/articles').then(({ data }) => {
        return data.articles;
  })
};
