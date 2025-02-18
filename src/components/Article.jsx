import { useEffect, useState } from "react";
import { getArticleById } from "../api";
import { useParams } from "react-router-dom";
import Comments from "./Comments";

export default function Article() {
  const [article, setArticle] = useState("1");

  const { article_id } = useParams();

  useEffect(() => {
    getArticleById(article_id)
      .then((response) => {
        setArticle(response);
      })
      .catch(console.log);
  }, []);

  return (
    <>
      <section className="articleMain">
        <h1>{article.title}</h1>
        <img src={article.article_img_url}></img>
        <h2>Author: {article.author}</h2>
        <p>{article.body}</p>
      </section>
      <Comments />
    </>
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
