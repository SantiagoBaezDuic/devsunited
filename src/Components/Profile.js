import React, { useState, useContext } from "react";
import { postContext } from "../Context/postContext";
import { Link } from "react-router-dom";
import "../CSS/Profile.css";
import { signOut } from "../Services/Auth";
import { userContext } from "../Context/UserContext";
import { options } from "../Context/config";
import { deleteTweet } from "../Services/operations";

export default function Profile() {
  const { posts } = useContext(postContext);
  const { user } = useContext(userContext);

  const [showPosts, setShowPosts] = useState(true);

  const handlePosts = () => {
    setShowPosts(true);
  };

  const handleFavs = () => {
    setShowPosts(false);
  };

  let ownPosts = posts.filter((object) => {
    return object.uid === user.uid;
  });

  const convertTime = (unix) => {
    const readableDate = new Date(unix).toLocaleString("es-AR", options);
    return readableDate;
  };

  const handleDelete = (id) => {
    deleteTweet("tuits", id);
  };

  return (
    <>
      <header>
        <div className="feed-header">
          <div className="header-container">
            <div className="back-container">
              <Link to="/feed">
                <img height="25px" src="./img/back.svg" alt="" />
              </Link>
              <span className="press-start">FEED</span>
            </div>
            <Link to="/">
              <div className="logout-button">
                <span
                  onClick={() => signOut}
                  className="press-start logout-text"
                >
                  LOGOUT
                </span>
                <img height="20px" src="./img/logout.svg" alt="" />
              </div>
            </Link>
          </div>
        </div>
      </header>
      <div className="profile-general-container">
        <div className="profile-center">
          <div className="profile-container">
            <img
              height="170px"
              width="170px"
              className="profile-pic"
              src="./img/ornacia.png"
              alt=""
            />
            <h1 className="press-start username">
              {user !== null ? user.displayName : "Username"}
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
      <div className="feed">
        {showPosts && ownPosts.length > 0 ? (
          ownPosts.map((object) => {
            return (
              <div key={object.id} className="post-card">
                <div className="post-pfp-container">
                  <img
                    className="profilepic"
                    height="45px"
                    src="./img/ornacia.png"
                    alt=""
                  />
                </div>
                <div className="post-text-container">
                  <div className="post-username">
                    <span className="username-container">{object.user}</span>
                    <span className="post-time">
                      - {convertTime(object.time)}
                    </span>
                  </div>
                  <div>{object.text}</div>
                  <div className="post-footer">
                    <div className="post-likes">
                      <img
                        className="like-hollow-icon"
                        height="17px"
                        src="./img/Like-hollow.svg"
                        alt=""
                      />
                      <span className="likes-amount">{object.likes}</span>
                    </div>
                    <div
                      className="delete-button"
                      onClick={() => handleDelete(object.id)}
                    >
                      Borrar
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="press-start loading">Posts are loading...</p>
        )}
        <Link to="/">Login</Link>
      </div>
    </>
  );
}
