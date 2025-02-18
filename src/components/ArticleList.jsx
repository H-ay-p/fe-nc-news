import { useEffect, useState } from "react";
import { getArticles } from "../api";
import { Link } from "react-router-dom";

export default function ArticleList() {
  const [articles, setArticles] = useState([
    {
      article_id: "1",
      title: "test_article",
    },
  ]);

  useEffect(() => {
    getArticles()
      .then((response) => {
        setArticles(response);
      })
      .catch(console.log);
  }, []);

  return (
    <ul>
      {articles.map((article) => {
        return (
          <li key={article.article_id} className="articleCard">
            <section className="info">
              <Link to={`${article.article_id}`}>{article.title}</Link>
              <p>Topic: {article.topic}</p>
              <p>{article.comment_count} comments</p>
            </section>
            <img className="thumbnail" src={article.article_img_url}></img>
          </li>
        );
      })}
    </ul>
  );
}
