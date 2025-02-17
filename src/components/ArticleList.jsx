import { useEffect, useState } from "react";
import { getArticles } from "../api";

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
        console.log(response);
        setArticles(response);
      })
      .catch(console.log);
  }, []);

  return (
    <ul>
      {articles.map((article) => {
        return (
          <li key={article.article_id} className="articleCard">
            <div className="info">
              <h4>{article.title}</h4>
              <p>Topic: {article.topic}</p>
              <p>{article.comment_count} comments</p>
            </div>

            <img className="thumbnail" src={article.article_img_url}></img>
          </li>
        );
      })}
    </ul>
  );
}

// article_id
// :
// 3
// article_img_url
// :
// "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700"
// author
// :
// "icellusedkars"
// comment_count
// :
// 2
// created_at
// :
// "2020-11-03T09:12:00.000Z"
// title
// :
// "Eight pug gifs that remind me of mitch"
// topic
// :
// "mitch"
