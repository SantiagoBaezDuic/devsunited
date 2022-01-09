import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import "../CSS/post-card.css";
import "../CSS/Feed.css";
import {
  deleteTweet,
  getDataByID,
  postData,
  updateData,
} from "../Services/operations";
import useInput from "../Hooks/useInput";
import { options } from "../Context/config";
import { postContext } from "../Context/postContext";
import { userContext } from "../Context/UserContext";

export default function Feed() {
  const { posts } = useContext(postContext);
  const { user, favColor, photo, bgColor } = useContext(userContext);

  //Manejo del estado del tuit input y la barra

  const [tweet, handleTweet] = useInput();

  const POST_LENGTH = 200;

  //Posteo del tuit a la base de datos

  const postTweet = async () => {
    const dataToPost = {
      user: user.displayName,
      text: tweet,
      time: new Date().getTime(),
      likes: 0,
      uid: user.uid,
      likedBy: [],
    };
    await postData("tuits", dataToPost);
  };

  //Conversor de unix a fecha

  const convertTime = (unix) => {
    const readableDate = new Date(unix).toLocaleString("es-AR", options);
    return readableDate;
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

  const handleDelete = (id) => {
    deleteTweet("tuits", id);
  };

  return (
    <>
      <header>
        <div className="feed-header">
          <div className="header-container">
            <div className="icon-container">
              <Link to="/profile">
                <img
                  id="pic-border"
                  className={"profilepic" + " " + favColor}
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
              <img height="19px" src="./img/Logotexto.svg" alt="" />
            </div>
          </div>
        </div>
      </header>
      <div className="tweeter-general-container">
        <div className="tweeter-container">
          <div className="tweeter-pfp-container">
            <Link className="profilepic-link" to="/profile">
              <img
                id="pic-border"
                height="50px"
                className={"profilepic" + " " + favColor}
                src={photo !== null ? photo : "./img/ornacia.png"}
                alt=""
              />
            </Link>
          </div>
          <div className="tweeter-input-container">
            <textarea
              id="textArea"
              onChange={handleTweet}
              maxLength="200"
              value={tweet}
              type="text"
              className="tweeter-input"
              placeholder="What's happening?"
            />
            <div
              className="bar"
              style={{
                width: `${(tweet.length / POST_LENGTH) * 100}%`,
                transition: "ease-in-out all 0.3s",
              }}
            />
            <div className="tweeter-subtext">
              <span className="sub-subtext white">{tweet.length}</span>
              <span className="highlight">200 max.</span>
            </div>
            <div className="post-button-container">
              <button onClick={postTweet} className="post-button">
                POST
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="feed">
        {posts.length > 0 ? (
          posts.map((object) => {
            return (
              <div key={object.id} className="post-card">
                <div className="post-pfp-container">
                  <img
                    id="pic-border"
                    className={"profilepic" + " " + favColor}
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
                    <span className={"username-container" + " " + bgColor}>
                      {object.user}
                    </span>
                    <span className="post-time">
                      - {convertTime(object.time)}
                    </span>
                  </div>
                  <div>{object.text}</div>
                  <div className="post-footer">
                    <div className="post-likes">
                      {object.likedBy.find((object) => object === user.uid) ===
                      undefined ? (
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
          })
        ) : (
          <p className="press-start loading">Posts are loading...</p>
        )}
        <Link to="/">Login</Link>
      </div>
    </>
  );
}
