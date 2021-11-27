import React, { useState } from "react";
import {Link} from "react-router-dom";

export default function Profile() {

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
                    <Link to="/">Login</Link>
                </div>
            </body>
        </>
    )
}