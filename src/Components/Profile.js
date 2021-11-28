import React, { useState, useContext } from "react";
import { AppContext } from "../Context/AppContext";
import {Link} from "react-router-dom";
import "../CSS/Profile.css";

export default function Profile() {

    const {posts, postFetch} = useContext(AppContext);

    const [showPosts, setShowPosts] = useState(true);

    const handlePosts = () => {
        setShowPosts(true);
    };

    const handleFavs = () => {
        setShowPosts(false);
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
                            <span className="press-start">USERNAME</span>
                        </div>
                        <Link to="/">
                            <div className="logout-button">
                                <span className="press-start logout-text">LOGOUT</span>
                                <img height="20px" src="./img/logout.svg" alt="" />
                            </div>
                        </Link>
                    </div>
                </div>
            </header>
            <body>
                <div className="profile-general-container">
                    <div className="profile-center">
                        <div className="profile-container">
                            <img height="170px" width="170px" className="profile-pic" src="./img/ornacia.png" alt="" />
                            <h1 className="press-start username">USERNAME</h1>
                        </div>
                        <div className="profile-switch-container">
                            <div className="profile-switch">
                                <div onClick={handlePosts} className={showPosts ? "switch-selected" : "switch-unselected"}>POSTS</div>
                                <div onClick={handleFavs} className={!showPosts ? "switch-selected" : "switch-unselected"}>FAVORITES</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="feed">
                {postFetch ? posts.map((object) => {
                        return (
                            <div className="post-card">
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
            </body>
        </>
    )
}