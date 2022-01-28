import { useContext } from "react";
import { userContext } from "../Context/UserContext";
import { postContext } from "../Context/postContext";

export default function TweetCard({ object }) {
  const { user, photo, favColor, bgColor } = useContext(userContext);
  const { convertTime, setToDelete, globalHandleLike, setConfirm } =
    useContext(postContext);

  //Manejo del like

  const localHandleLike = (tweet) => {
    globalHandleLike(tweet);
  };

  //Manejo del tweet delete
  const handleDeleteButton = (id) => {
    setConfirm(true);
    setToDelete(id);
    console.log(id);
  };

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
          <span className="post-time">- {convertTime(object.time)}</span>
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
              onClick={() => handleDeleteButton(object.id)}
            >
              Borrar
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
