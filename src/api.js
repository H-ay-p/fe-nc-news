import axios from "axios";

const news = axios.create({
  baseURL: "https://nc-news-3wsj.onrender.com/api",
});

export const getArticles = () => {
  return news.get("/articles").then(({ data: articles }) => {
    return articles;
  });
};
