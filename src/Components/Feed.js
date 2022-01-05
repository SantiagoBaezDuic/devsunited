import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import "../CSS/post-card.css";
import "../CSS/Feed.css";
import { postData, setDocument, updateData } from "../Services/operations";
import useInput from "../Hooks/useInput";
import { options } from "../Context/config";
import { postContext } from "../Context/postContext";
import { addUserToFirestore } from "../Services/Auth";

export default function Feed() {
  const { posts } = useContext(postContext);

  //Manejo del estado del tuit input y la barra

  const [tweet, handleTweet] = useInput();

  const POST_LENGTH = 200;

  //Posteo del tuit a la base de datos

  const postTweet = async () => {
    const dataToPost = {
      // user: userData.displayName,
      text: tweet,
      time: new Date().getTime(),
      likes: 0,
      // userid: userID
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
    await updateData("tuits", tweet.id, { likes: tweet.likes + 1 });
  };

  return (
    <>
      <header>
        <div className="feed-header">
          <div className="header-container">
            <div className="icon-container">
              <Link to="/profile">
                <img
                  className="profilepic"
                  height="25px"
                  src="./img/ornacia.png"
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
                height="50px"
                className="profilepic"
                src="./img/ornacia.png"
                alt=""
              />
            </Link>
          </div>
          <div className="tweeter-input-container">
            <textarea
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
                  <div className="post-likes">
                    <img
                      onClick={() => {
                        handleLike(object);
                      }}
                      className="like-hollow-icon"
                      height="17px"
                      src="./img/Like-hollow.svg"
                      alt=""
                    />
                    <span className="likes-amount">{object.likes}</span>
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
