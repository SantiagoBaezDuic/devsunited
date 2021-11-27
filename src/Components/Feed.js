import React, { useState } from "react";
import { Link } from "react-router-dom";
import { posts } from "../Context/AppContext";
import { useContext } from "react";
import { AppContext } from "../Context/AppContext";
// import { db } from "./firebase";
// import { collection, addDoc, doc, setDoc } from "firebase/firestore";

export default function Feed() {

    const {posts, postFetch} = useContext(AppContext);

    const [tweet, setTweet] = useState("");

    const handleTweet = (e) => {
        setTweet(e.target.value);
        
        const twLenght = e.target.value.length;

        const percentage = ((twLenght / 2) * 92) / 100;

        document.getElementById("bar").style.width = percentage.toString() + "%";
       
    }

    // const testTweets = doc(db, `test-tweets/1`);

    // function writeTweet() {
    //     const tweetData = {
    //         user: "randomuser",
    //         text: "este es un tuit de prueba"
    //     }
    //     setDoc(testTweets, tweetData);
    // }

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
            <body>
                <div className="tweeter-general-container">
                    <div className="tweeter-container">
                        <div className="tweeter-first">
                            <Link className="profilepic-link" to="/profile">
                                <img height="50px" className="profilepic" src="./img/ornacia.png" alt="" />
                            </Link>
                            <textarea onChange={handleTweet} maxLength="200" type="text" className="tweeter-input" placeholder="What's happening?" />
                        </div>
                        <div className="subtext-container">
                            <div id="bar" className="bar"></div>
                            <div className="tweeter-subtext">
                                <span className="sub-subtext white">{tweet.length}</span>
                                <span className="highlight">200 max.</span>
                            </div>
                        </div>
                        <div className="post-button-container">
                            <button className="post-button">POST</button>
                        </div>
                    </div>
                </div>
                <div className="feed">
                    {postFetch ? posts.map((object) => {
                        return (
                            <div className="post">
                                {object.name}
                            </div>
                        )
                    }) : <p className="press-start loading">Posts are loading...</p>}
                    <Link to="/">Login</Link>
                </div>
            </body>
        </>
    )
}