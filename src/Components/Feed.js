import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import "../CSS/post-card.css";
import "../CSS/Feed.css";
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "../Services/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { postData } from "../Services/operations"; 
import useInput from "../Hooks/useInput";

export default function Feed() {

    const {posts, postFetch, userData, setUserData} = useContext(AppContext);

    //Manejo del estado del tuit input y la barra

    const [tweet, handleTweet] = useInput();

    const POST_LENGTH = 200;

    //Captura del user que esta logeado

    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          setUserData(user);
          // ...
        } else {
          // User is signed out
          // ...
        }
      });

      //Posteo del tuit a la base de datos

      const postTweet = async () => {
        await postData("tuits", {
            user: userData.displayName,
            text: tweet,
            time: new Date().getTime(),
            likes: 0
        })
      }

    return (
        <>
            <header>
                <div className="feed-header">
                    <div className="header-container">
                        <div className="icon-container">
                            <Link to="/profile">
                                <img className="profilepic" height="25px" src="./img/ornacia.png" alt="" />
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
                            <img height="50px" className="profilepic" src="./img/ornacia.png" alt="" />
                        </Link>
                    </div>
                    <div className="tweeter-input-container">
                        <textarea onChange={handleTweet} maxLength="200" value={tweet} type="text" className="tweeter-input" placeholder="What's happening?" />
                        <div className="bar" style={{
                            width: `${(tweet.length / POST_LENGTH) * 100}%`,
                            transition: "ease-in-out all 0.3s"
                            }} />
                        <div className="tweeter-subtext">
                            <span className="sub-subtext white">{tweet.length}</span>
                            <span className="highlight">200 max.</span>
                        </div>
                        <div className="post-button-container">
                            <button onClick={postTweet} className="post-button">POST</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="feed">
                {postFetch ? posts.map((object) => {
                    return (
                        <div key={object.id} className="post-card">
                             <div className="post-pfp-container">
                                <img className="profilepic" height="45px" src="./img/ornacia.png" alt="" />
                            </div>
                            <div className="post-text-container">
                                <div className="post-username">
                                    <span className="username-container">
                                        {object.email}
                                    </span>
                                    <span className="post-time">
                                        - 5 jun.
                                    </span>
                                </div>
                                <div>
                                    {object.body}
                                </div>
                                <div className="post-likes">
                                    <img className="like-hollow-icon" height="17px" src="./img/Like-hollow.svg" alt="" />
                                    <span className="likes-amount">100</span>
                                </div>
                            </div>
                        </div>
                    )
                }) : <p className="press-start loading">Posts are loading...</p>}
                <Link to="/">Login</Link>
            </div>
        </>
    )
}