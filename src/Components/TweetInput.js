import { useState, useContext } from "react";
import { userContext } from "../Context/UserContext";
import { Link } from "react-router-dom";
import { postData } from "../Services/operations";

export default function TweetInput() {
  const { user, favColor, photo, username } = useContext(userContext);

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

  return (
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
  );
}
