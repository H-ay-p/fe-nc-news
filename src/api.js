import axios from "axios";
import { useParams } from "react-router";

const news = axios.create({
  baseURL: "https://nc-news-3wsj.onrender.com/api/",
});

export const getArticles = () => {
  return news.get("articles").then(({ data: articles }) => {
    return articles;
  });
};

export const getArticleById = (article_id) => {
  return news.get(`articles/${article_id}`).then(({ data: article }) => {
    return article;
  });
};

export const getComments = (article_id) => {
  return news.get(`articles/${article_id}/comments/`).then(({ data }) => {
    return data;
  });
};
