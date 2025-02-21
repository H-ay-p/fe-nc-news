import { useEffect, useState } from "react";
import { getArticles } from "../api";
import { useSearchParams, Link } from "react-router-dom";

export default function ArticleList() {
  const [articles, setArticles] = useState([
    {
      article_id: "1",
      title: "test_article",
    },
  ]);
  const [searchParams, setSearchParams] = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const topicQuery = searchParams.get("topic");

  useEffect(() => {
    setIsLoading(true);
    getArticles(topicQuery)
      .then((response) => {
        setArticles(response);
        setIsLoading(false);
      })
      .catch(console.log);
  }, [topicQuery]);

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
                <Link className="link" to={`/articles/${article.article_id}`}>
                  {article.title}
                </Link>
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
