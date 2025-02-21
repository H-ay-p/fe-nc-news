import header from "../assets/ncnews.png";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export default function Header() {
  const navigate = useNavigate();
  const gotToNewPage = () => {
    navigate("/articles");
  };

  const user = useContext(UserContext);

  return (
    <>
      <img
        className="header"
        onClick={gotToNewPage}
        src={header}
        alt="Image of the text 'NC News'"
      ></img>
      <p>Logged in as {user.user}</p>
    </>
  );
}
