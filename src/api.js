import axios from "axios";

const news = axios.create({
  baseURL: "https://nc-news-3wsj.onrender.com/api",
});

export const getArticles = () => {
  return news.get("/articles").then(({ data: articles }) => {
    return articles;
  });
};

export const getArticleById = (article_id) => {
  return news.get(`/articles/${article_id}`).then(({ data: article }) => {
    return article;
  });
};
