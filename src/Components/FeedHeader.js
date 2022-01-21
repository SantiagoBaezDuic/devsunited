import { Link } from "react-router-dom";
import { useContext } from "react";
import { userContext } from "../Context/UserContext";

export default function FeedHeader() {
  const { favColor, photo } = useContext(userContext);

  return (
    <header>
      <div className="feed-header">
        <div className="header-container">
          <div className="icon-container">
            <Link to="/profile">
              <img
                id="pfp"
                className={"profilepic " + favColor}
                height="25px"
                src={photo !== null ? photo : "./img/ornacia.png"}
                alt=""
              />
            </Link>
          </div>
          <div className="icon-container">
            <img height="27px" src="./img/Logo.svg" alt="" />
          </div>
          <div className="icon-container">
            <img
              id="large-icon"
              height="19px"
              src="./img/Logotexto.svg"
              alt=""
            />
          </div>
        </div>
      </div>
    </header>
  );
}
