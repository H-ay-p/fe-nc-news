import { deleteComment, getComments } from "../api";
import { useParams } from "react-router-dom";

export default function DeleteButton({ comment, comments, setComments }) {
  const { article_id } = useParams();
  function handleDelete(e) {
    e.target.disabled = true;
    e.target.textContent = "Deleting...";
    deleteComment(comment.comment_id).then(() => {
      getComments(article_id)
        .then((response) => {
          setComments(response);
        })
        .catch(console.log);
    });
  }
  return (
    <button id="delete" onClick={handleDelete}>
      Delete
    </button>
  );
}
