import { useEffect, useState } from "react";
import { getComments, postComment } from "../api";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export default function Comments() {
  const [isLoading, setIsLoading] = useState(false);
  const [failOrSuccess, setFailOrSuccess] = useState("");
  const [comments, setComments] = useState([
    {
      article_id: 6,
      author: "cooljmessy",
      body: "Eius dolor qui ut eligendi. Vero et animi consequatur placeat repudiandae ex dolores qui magni. Omnis magnam rerum molestiae. Nihil rerum ipsa error quibusdam. Qui temporibus quia quia. Natus necessitatibus numquam deserunt quisquam distinctio soluta consequatur.",
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
      .catch(console.log);
  }, []);

  const { user } = useContext(UserContext);

  let commentInput = { username: user.username, body: "" };

  function handleSubmit(e) {
    e.preventDefault();
    const randomId = Math.floor(Math.random() * 114527);
    let newComment = {
      article_id: article_id,
      author: user.username,
      body: commentInput.body,
      comment_id: randomId,
      created_at: "now",
      votes: 0,
    };
    setComments((comments) => {
      return [newComment, ...comments];
    });
    postComment(article_id, commentInput)
      .then(() => {
        setFailOrSuccess("Your comment has been posted!");
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
            commentInput.body = e.target.value;
          }}
        ></textarea>

        <input
          className="submit"
          type="submit"
          value="Post new comment"
        ></input>
        {/* <button type="submit">Post new comment</button> */}
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
          return (
            <li key={comment.comment_id} className="commentCard">
              <p>{comment.author}</p>
              <p>{comment.body}</p>
              <p>{dateToShow}</p>
              <p>{comment.votes} ❤️</p>
            </li>
          );
        })}
      </ul>
    </>
  );
}
