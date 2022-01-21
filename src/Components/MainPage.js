import React, { useContext } from "react";
import { colors } from "../Context/config";
import "../CSS/MainPage.css";
import { userContext } from "../Context/UserContext";
import { Link } from "react-router-dom";

export default function Welcome() {
  const { userColor, setFavColor, setUsername, updateConfig, username } =
    useContext(userContext);

  //Manejo del input de username

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  //Manejo de color seleccionado

  const focusCube = (e) => {
    setFavColor(e.target.id);

    colors.map((object) => {
      return (document.getElementById(object.id).style.border = "none");
    });
    document.getElementById(e.target.id).style.border = "3px solid white";
  };

  const handlePush = async () => {
    await updateConfig();
  };

  return (
    <>
      <div className="App">
        <header className="App-header">
          <div className="logos-container">
            <img
              className="main-logos"
              width="500px"
              src="./img/Logo.svg"
              alt=""
            />
            <img
              className="main-logos"
              width="500px"
              src="./img/Logotexto.svg"
              alt=""
            />
          </div>
          <div className="home-login-container">
            <h2 className="press-start title">
              Welcome! <br />
              <span className={"name " + userColor}>
                {username !== "" ? username : null}
              </span>
            </h2>
            <input
              onChange={handleUsername}
              className="username-input"
              type="text"
              placeholder="Type your username"
              value={username}
            />
            <p className="press-start sub-subtext">
              Select your favorite color
            </p>
            <div className="cubes-container">
              {colors.map((object) => {
                return (
                  <div
                    key={object.id}
                    id={object.id}
                    className={"color-cube " + object.id}
                    onClick={focusCube}
                  />
                );
              })}
            </div>
            <Link to="/feed">
              <button onClick={handlePush} className="continue press-start">
                Continue
              </button>
            </Link>
            <span className="copyright">
              © 2021 Devs United - <span className="highlight">BETA</span>
            </span>
          </div>
        </header>
      </div>
    </>
  );
}
