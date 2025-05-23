import { useEffect, useState } from "react";
import { getArticleById, addVote, removeVote } from "../api";
import { useParams } from "react-router-dom";
import Comments from "./Comments";

export default function Article() {
  const [article, setArticle] = useState({
    created_at: "hereisastringbecauseIneedone",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { article_id } = useParams();
  const [votes, setVotes] = useState(0);
  const [fail, setFail] = useState("");

  useEffect(() => {
    setIsLoading(true);
    getArticleById(article_id)
      .then((response) => {
        setArticle(response);
        setIsLoading(false);
      })
      .catch(console.log);
  }, []);

  if (isLoading) {
    return <p>loading</p>;
  }

  function handlePlusVote(e) {
    setVotes((votes) => votes + 1);
    e.currentTarget.disabled = true;
    addVote(article_id, votes).catch((err) => {
      console.log(err);
      setVotes(0);
      setFail("Oops, that didn't work");
    });
  }

  function handleNegVote(e) {
    setVotes((votes) => votes - 1);
    e.currentTarget.disabled = true;
    removeVote(article_id).catch((err) => {
      console.log(err);
      setVotes(0);
      setFail("Oops, that didn't work");
    });
  }

  return (
    <>
      <section className="articleMain">
        <h1>{article.title}</h1>
        <img src={article.article_img_url}></img>
        <h2>Author: {article.author}</h2>
        <p>Date: {article.created_at.slice(0, 10)}</p>
        <p>{article.body}</p>
        <section className="votes">
          {article.votes + votes > -1 ? (
            <p>{article.votes + votes} ❤️</p>
          ) : (
            <p>{article.votes + votes} 🖤</p>
          )}
          <button className="voteBtn" onClick={handlePlusVote}>
            Like
          </button>
          <button className="voteBtn" onClick={handleNegVote}>
            Dislike
          </button>
        </section>
        <p>{fail}</p>
      </section>
      <Comments />
    </>
  );
}
