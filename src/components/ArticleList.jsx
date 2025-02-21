import { useEffect, useState } from "react";
import { getArticles } from "../api";
import { useSearchParams, Link } from "react-router-dom";

export default function ArticleList() {
  const [articles, setArticles] = useState([
    {
      article_id: "1",
      title: "test_article",
      created_at: "hereisastringbecauseIneedone",
      topic: "testTopic",
    },
  ]);
  const [searchParams, setSearchParams] = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const topicQuery = searchParams.get("topic");
  const sortQuery = searchParams.get("sort_by") || "created_at";
  const orderQuery = searchParams.get("order") || "desc";

  useEffect(() => {
    setIsLoading(true);
    getArticles(sortQuery, orderQuery, topicQuery)
      .then((response) => {
        setArticles(response);
        setIsLoading(false);
      })
      .catch(console.log);
  }, [sortQuery, orderQuery, topicQuery]);

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
                <p className="articleInfo">
                  Topic:{" "}
                  {article.topic.charAt(0).toUpperCase() +
                    article.topic.slice(1)}
                </p>
                <p className="articleInfo">
                  Date: {article.created_at.slice(0, 10)}
                </p>
                <p className="articleInfo">Votes: {article.votes}</p>
                <p className="articleInfo">{article.comment_count} comments</p>
              </section>
              <img className="thumbnail" src={article.article_img_url}></img>
            </li>
          );
        })}
      </ul>
    </>
  );
}
