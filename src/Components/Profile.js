import React, { useState, useContext } from "react";
import { postContext } from "../Context/postContext";
import { Link, useNavigate } from "react-router-dom";
import "../CSS/Profile.css";
import { signOut } from "../Services/Auth";
import { userContext } from "../Context/UserContext";

export default function Profile() {
  const { posts, convertTime, handleDelete, globalHandleLike } =
    useContext(postContext);
  const { user, favColor, photo, userColor, bgColor, username } =
    useContext(userContext);

  const [showPosts, setShowPosts] = useState(true);

  const navigate = useNavigate();

  //Manejo del booleano que decide si se muestran los tweets propios o los faveados

  const handlePosts = () => {
    setShowPosts(true);
  };

  const handleFavs = () => {
    setShowPosts(false);
  };

  //Filtrado de tweets

  //Propios

  let ownPosts = posts.filter((object) => {
    return object.uid === user.uid;
  });

  //Faveados

  let likedPosts = posts.filter((object) => {
    return object.likedBy.find((element) => element === user.uid) !== undefined;
  });

  //Signout

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  //Manejo del like

  const localHandleLike = (tweet) => {
    globalHandleLike(tweet);
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
              <div onClick={handleSignOut} className="logout-button">
                <span className="press-start logout-text">LOGOUT</span>
                <img height="20px" src="./img/logout.svg" alt="" />
              </div>
            </Link>
          </div>
        </div>
      </header>
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
      <div className="feed">
        {showPosts
          ? ownPosts.map((object) => {
              return (
                <div key={object.id} className="post-card">
                  <div className="post-pfp-container">
                    <img
                      className={"profilepic " + favColor}
                      height="45px"
                      src={photo !== null ? photo : "./img/ornacia.png"}
                      alt=""
                    />
                  </div>
                  <div className="post-text-container">
                    <div className="post-username">
                      <span className={"username-container " + bgColor}>
                        {object.username && object.username !== ""
                          ? object.username
                          : object.user}
                      </span>
                      <span className="post-time">
                        - {convertTime(object.time)}
                      </span>
                    </div>
                    <div>{object.text}</div>
                    <div className="post-footer">
                      <div className="post-likes">
                        {object.likedBy.find(
                          (object) => object === user.uid
                        ) === undefined ? (
                          <img
                            onClick={() => {
                              localHandleLike(object);
                            }}
                            className="like-hollow-icon"
                            height="17px"
                            src="./img/Like-hollow.svg"
                            alt=""
                          />
                        ) : (
                          <img
                            onClick={() => {
                              localHandleLike(object);
                            }}
                            className="like-hollow-icon"
                            height="17px"
                            src="./img/Like-full.svg"
                            alt=""
                          />
                        )}
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
          : likedPosts.map((object) => {
              return (
                <div key={object.id} className="post-card">
                  <div className="post-pfp-container">
                    <img
                      className={"profilepic " + favColor}
                      height="45px"
                      src={
                        object.uid === user.uid
                          ? photo !== null
                            ? photo
                            : "./img/ornacia.png"
                          : "./img/ornacia.png"
                      }
                      alt=""
                    />
                  </div>
                  <div className="post-text-container">
                    <div className="post-username">
                      <span className={"username-container " + bgColor}>
                        {object.username && object.username !== ""
                          ? object.username
                          : object.user}
                      </span>
                      <span className="post-time">
                        - {convertTime(object.time)}
                      </span>
                    </div>
                    <div>{object.text}</div>
                    <div className="post-footer">
                      <div className="post-likes">
                        {object.likedBy.find(
                          (object) => object === user.uid
                        ) === undefined ? (
                          <img
                            onClick={() => {
                              localHandleLike(object);
                            }}
                            className="like-hollow-icon"
                            height="17px"
                            src="./img/Like-hollow.svg"
                            alt=""
                          />
                        ) : (
                          <img
                            onClick={() => {
                              localHandleLike(object);
                            }}
                            className="like-hollow-icon"
                            height="17px"
                            src="./img/Like-full.svg"
                            alt=""
                          />
                        )}
                        <span className="likes-amount">{object.likes}</span>
                      </div>
                      {object.uid === user.uid ? (
                        <div
                          className="delete-button"
                          onClick={() => handleDelete(object.id)}
                        >
                          Borrar
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })}
      </div>
    </>
  );
}
