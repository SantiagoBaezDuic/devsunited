import React from "react";
import { Link } from "react-router-dom";

export default function Feed() {
    return (
        <>
            <header>
                <div className="feed-header">
                    <div className="header-container">
                        <img className="profilepic" height="25px" src="./img/ornacia.png" alt="" />
                        <img height="27px" src="./img/Logo.svg" alt="" />
                        <img height="19px" src="./img/Logotexto.svg" alt="" />
                    </div>
                </div>
            </header>
            <body>
                <div className="tweeter-general-container">
                    <div className="tweeter-container">
                        <div className="tweeter-first">
                            <img height="50px" className="profilepic" src="./img/ornacia.png" alt="" />
                            <input type="text" className="tweeter-input" placeholder="What's happening" />
                        </div>
                        <div className="subtext-container">
                            <div className="bar"></div>
                            <div className="tweeter-subtext">
                                <span className="sub-subtext white">17</span>
                                <span className="highlight">200 max.</span>
                            </div>
                        </div>
                        <div className="post-button-container">
                            <button className="post-button">POST</button>
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