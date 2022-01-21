import { useContext } from "react";
import { userContext } from "../Context/UserContext";
import { postContext } from "../Context/postContext";
import { Link } from "react-router-dom";

export default function UserDisplay() {
  const { user, favColor, photo, userColor, username } =
    useContext(userContext);

  const { showPosts, handleFavs, handlePosts } = useContext(postContext);

  return (
    <div className="profile-general-container">
      <div className="profile-center">
        <div className="profile-container">
          <Link to="/welcome">
            <img
              height="170px"
              width="170px"
              className={"profilepic " + favColor}
              src={photo !== null ? photo : "./img/ornacia.png"}
              alt=""
            />
          </Link>
          <h1 className={"press-start username " + userColor}>
            {username !== "" ? username : user}
          </h1>
        </div>
        <div className="profile-switch-container">
          <div className="profile-switch">
            <div
              onClick={handlePosts}
              className={showPosts ? "switch-selected" : "switch-unselected"}
            >
              POSTS
            </div>
            <div
              onClick={handleFavs}
              className={!showPosts ? "switch-selected" : "switch-unselected"}
            >
              FAVORITES
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
