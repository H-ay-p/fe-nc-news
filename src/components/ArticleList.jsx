import { useEffect, useState } from "react";
import { getArticles } from "../api";
import { Link } from "react-router-dom";

export default function ArticleList({ user }) {
  const [articles, setArticles] = useState([
    {
      article_id: "1",
      title: "test_article",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getArticles()
      .then((response) => {
        setArticles(response);
        setIsLoading(false);
      })
      .catch(console.log);
  }, []);

  if (isLoading) {
    return <p>loading</p>;
  }

  return (
    <>
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
    </>
  );
}
