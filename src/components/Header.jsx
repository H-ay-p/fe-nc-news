import header from "../assets/ncnews.png";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const gotToNewPage = () => {
    navigate("/");
  };

  return (
    <img
      className="header"
      onClick={gotToNewPage}
      src={header}
      alt="Image of the text 'NC News'"
    ></img>
  );
}
