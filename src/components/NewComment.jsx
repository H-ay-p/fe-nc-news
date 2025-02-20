import { useState, useContext } from "react";
import { postComment } from "../api";
import { useParams } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

export default function Comments() {
  const [isLoading, setIsLoading] = useState(false);
  const [comment, setComment] = useState([
    {
      username: "mitch",
      body: "",
    },
  ]);
  const { user } = useContext(UserContext);
  const { article_id } = useParams();

  let commentInput = { username: user.username, body: "" };

  function newComment(e) {
    console.log(e);
    e.target.disabled = true;
    postComment(article_id, commentInput)
      .then((response) => {
        setComment(response);
        e.target.disabled = false;
      })
      .catch(console.log);
  }

  if (isLoading) {
    return <p>loading</p>;
  }

  return (
    <>
      <form className="commentForm">
        <label htmlFor="commentBox"></label>
        <textarea
          id="commentBox"
          placeholder="Write your comment here..."
          cols="30"
          rows="10"
          onChange={(e) => {
            commentInput.body = e.target.value;
          }}
        ></textarea>

        <button
          onClick={(e) => {
            e.preventDefault();
            {
              newComment(e);
            }
          }}
        >
          Post new comment
        </button>
      </form>

      {/* <ul>
        {comment.map((comment) => {
          const dateToShow = comment.created_at.slice(0, 10);
          return (
            <li key={comment.comment_id} className="commentCard">
              <p>{comment.author}</p>
              <p>{comment.body}</p>
              <p>{dateToShow}</p>
              <p>{comment.votes} ❤️</p>
            </li>
          );
        })}
      </ul> */}
    </>
  );
}
