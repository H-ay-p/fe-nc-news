import axios from "axios";
import { useParams } from "react-router";

const news = axios.create({
  baseURL: "https://nc-news-3wsj.onrender.com/api/",
});

export const getArticles = (topicQuery) => {
  let query = "";
  if (topicQuery === null) {
    query = "articles";
  } else {
    query = `articles?topic=${topicQuery}`;
  }
  return news.get(query).then(({ data: articles }) => {
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

export const addVote = (article_id) => {
  return news
    .patch(`articles/${article_id}`, { incVotes: 1 })
    .then((response) => {
      console.log(response);
    });
};

export const removeVote = (article_id) => {
  return news
    .patch(`articles/${article_id}`, { incVotes: -1 })
    .then((response) => {
      console.log(response);
    });
};

export const postComment = (article_id, comment) => {
  return news
    .post(`articles/${article_id}/comments`, comment)
    .then(({ data }) => {
      return data;
    });
};

export const deleteComment = (comment_id) => {
  return news.delete(`comments/${comment_id}`).then((response) => {});
};

export const getTopics = () => {
  return news.get(`topics`).then(({ data }) => {
    return data;
  });
};
