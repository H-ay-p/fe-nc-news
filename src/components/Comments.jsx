import { useEffect, useState } from "react";
import { getComments } from "../api";
import { useParams } from "react-router-dom";

export default function Comments() {
  const [isLoading, setIsLoading] = useState(false);
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

  if (isLoading) {
    return <p>loading</p>;
  }

  return (
    <>
      <ul>
        {comments.map((comment) => {
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
      </ul>
    </>
  );
}
