import { useEffect, useState } from "react";
import { getComments, postComment } from "../api";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import DeleteButton from "./DeleteButton";

export default function Comments() {
  const [isErr, setIsErr] = useState(false);
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [failOrSuccess, setFailOrSuccess] = useState("");
  const [commentBodyInput, setCommentBodyInput] = useState("");
  const [comments, setComments] = useState([
    {
      article_id: 6,
      author: "cooljmessy",
      body: "Eius dolor qui ut eligendi soluta consequatur.",
      comment_id: 74,
      created_at: "2020-11-04T21:21:00.000Z",
      votes: 3,
    },
  ]);

  const { article_id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getComments(article_id)
      .then((response) => {
        setComments(response);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsErr(true);
      });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const randomId = Math.floor(Math.random() * 114527) + Date.now;
    let newComment = {
      article_id: "",
      author: "",
      body: "Your comment is posting...",
      comment_id: "",
      created_at: "",
      votes: "",
    };
    setComments((comments) => {
      return [newComment, ...comments];
    });

    let commentToSend = { username: user, body: commentBodyInput };

    postComment(article_id, commentToSend)
      .then((response) => {
        setComments([response, ...comments]);
        setFailOrSuccess("Your comment has been posted!");
        setCommentBodyInput("");
      })
      .catch((err) => {
        console.log(err);
        setFailOrSuccess(
          "Oops, something went wrong. Please sent your comment again."
        );
      });
  }

  if (isLoading) {
    return <p>loading</p>;
  }

  if (isErr) {
    return (
      <p className="error">
        Sorry, something went wrong with the comments. Please contact us if the
        problem persists.
      </p>
    );
  }
  return (
    <>
      <form className="commentForm" onSubmit={handleSubmit}>
        <label htmlFor="commentBox"></label>
        <textarea
          id="commentBox"
          placeholder="Write your comment here..."
          cols="30"
          rows="10"
          onChange={(e) => {
            setCommentBodyInput(e.target.value);
          }}
          value={commentBodyInput}
        ></textarea>
        <button type="submit">Post new comment</button>
      </form>
      <p>{failOrSuccess}</p>
      <ul>
        {comments.map((comment) => {
          let dateToShow = "";
          if (comment.created_at != "now") {
            dateToShow = comment.created_at.slice(0, 10);
          } else {
            dateToShow = "now";
          }

          if (comment.author === user) {
            return (
              <li key={comment.comment_id} className="commentCard">
                <p>{comment.author}</p>
                <p>{comment.body}</p>
                <p>{dateToShow}</p>
                {comment.votes > -1 ? (
                  <p>{comment.votes} ❤️</p>
                ) : (
                  <p>{comment.votes} 🖤</p>
                )}
                <DeleteButton
                  comment={comment}
                  comments={comments}
                  setComments={setComments}
                />
              </li>
            );
          } else {
            return (
              <li key={comment.comment_id} className="commentCard">
                <p>{comment.author}</p>
                <p>{comment.body}</p>
                <p>{dateToShow}</p>

                {comment.votes > -1 ? (
                  <p>{comment.votes} ❤️</p>
                ) : (
                  <p>{comment.votes} 🖤</p>
                )}
              </li>
            );
          }
        })}
      </ul>
    </>
  );
}
