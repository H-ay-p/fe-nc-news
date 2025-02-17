import { useEffect, useState } from "react";
import { getArticleById } from "../api";

export default function Article() {
  const [articleId, setArticleId] = useState("1");

  useEffect(() => {
    getArticleById(articleId)
      .then((response) => {
        setArticleId(response);
      })
      .catch(console.log);
  }, []);

  return (
    <section>
      <h1>{articleId.title}</h1>
      <img src={articleId.article_img_url}></img>
      <h2>Author: {articleId.author}</h2>
      <p>{articleId.body}</p>
    </section>
  );
}

// article_id
// :
// 1
// article_img_url
// :
// "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700"
// author
// :
// "butter_bridge"
// body
// :
// "I find this existence challenging"
// comment_count
// :
// 11
// created_at
// :
// "2020-07-09T21:11:00.000Z"
// title
// :
// "Living in the shadow of a great man"
// topic
// :
// "mitch"
// votes
// :
// 100
