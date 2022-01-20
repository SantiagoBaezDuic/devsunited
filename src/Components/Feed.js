import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import "../CSS/post-card.css";
import "../CSS/Feed.css";
import { postData } from "../Services/operations";
import { postContext } from "../Context/postContext";
import { userContext } from "../Context/UserContext";

export default function Feed() {
  const { posts, convertTime, handleDelete, globalHandleLike } =
    useContext(postContext);
  const { user, favColor, photo, bgColor, username } = useContext(userContext);

  //Manejo del estado del tuit input y la barra

  const [tweet, setTweet] = useState("");

  const POST_LENGTH = 200;

  //Posteo del tuit a la base de datos

  const postTweet = async () => {
    const dataToPost = {
      user: user.displayName,
      username: username,
      text: tweet,
      time: new Date().getTime(),
      likes: 0,
      uid: user.uid,
      likedBy: [],
    };
    await postData("tuits", dataToPost);
    setTweet("");
  };

  //Manejo del estado del tweet

  const handleTweet = (e) => {
    setTweet(e.target.value);
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
            <div className="icon-container">
              <Link to="/profile">
                <img
                  id="pic-border"
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
                className={"profilepic " + favColor}
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
                      {object.likedBy.find((object) => object === user.uid) ===
                      undefined ? (
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
          })
        ) : (
          <p className="press-start loading">Posts are loading...</p>
        )}
      </div>
    </>
  );
}
