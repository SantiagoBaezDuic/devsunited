import React, { useState, useContext, useEffect } from "react";
import { postContext } from "../Context/postContext";
import { Link } from "react-router-dom";
import "../CSS/Profile.css";
import { signOut } from "../Services/Auth";
import { userContext } from "../Context/UserContext";
import { options } from "../Context/config";
import {
  deleteTweet,
  getData,
  getDataByID,
  updateData,
} from "../Services/operations";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Services/firebase";

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

  let likedPosts = posts.filter((object) => {
    return object.likedBy.find((element) => element === user.uid) !== undefined;
  });

  const convertTime = (unix) => {
    const readableDate = new Date(unix).toLocaleString("es-AR", options);
    return readableDate;
  };

  const handleDelete = (id) => {
    deleteTweet("tuits", id);
  };

  // Manejo de Likes

  const handleLike = async (tweet) => {
    const uid = user.uid;

    //Referencia del doc del tuit

    const docRef = await getDataByID("tuits", tweet.id);

    //Referencia del doc del usuario

    const userRef = await getDataByID("userData", uid);

    //Chequea si el tuit está likeado por el usuario logeado

    if (docRef.likedBy.find((object) => object === uid) === undefined) {
      //Caso negativo agrega el usuario al tuit y viceversa

      await updateData("tuits", tweet.id, {
        likes: tweet.likes + 1,
        likedBy: [...docRef.likedBy, uid],
      });
      await updateData("userData", uid, {
        likedTweets: [...userRef.likedTweets, tweet.id],
      });
    } else {
      //Filtrado de las listas para borrar el tuit y el usuario

      const filteredLikes = docRef.likedBy.filter((object) => {
        return object !== uid;
      });
      const filteredUser = userRef.likedTweets.filter((object) => {
        return object !== tweet.id;
      });
      //Caso positivo borra el usuario del tuit y viceversa

      await updateData("tuits", tweet.id, {
        likes: tweet.likes - 1,
        likedBy: filteredLikes,
      });
      await updateData("userData", uid, {
        likedTweets: filteredUser,
      });
    }
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
        {showPosts
          ? ownPosts.map((object) => {
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
                        {object.likedBy.find(
                          (object) => object === user.uid
                        ) === undefined ? (
                          <img
                            onClick={() => {
                              handleLike(object);
                            }}
                            className="like-hollow-icon"
                            height="17px"
                            src="./img/Like-hollow.svg"
                            alt=""
                          />
                        ) : (
                          <img
                            onClick={() => {
                              handleLike(object);
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
                        {object.likedBy.find(
                          (object) => object === user.uid
                        ) === undefined ? (
                          <img
                            onClick={() => {
                              handleLike(object);
                            }}
                            className="like-hollow-icon"
                            height="17px"
                            src="./img/Like-hollow.svg"
                            alt=""
                          />
                        ) : (
                          <img
                            onClick={() => {
                              handleLike(object);
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
            })}
        <Link to="/">Login</Link>
      </div>
    </>
  );
}
