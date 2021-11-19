import React from "react";
import { Link } from "react-router-dom";
import { colors } from "./config";

export default function Welcome() {

 const focusCube = (e) => {
    colors.map((object) => {
        return (document.getElementById(object.id).style.border= "none");
    })
    document.getElementById(e.target.id).style.border= "3px solid white";
 }

    return (<>
    <div className="App">
      <header className="App-header">
        <div className="logos-container">
          <img width="500px" src="./img/Logo.svg" alt="" />
          <img width="500px" src="./img/Logotexto.svg" alt="" />
        </div>
        <div className="home-login-container">
          <h2 className="press-start title">Welcome <br/><span className="name">Name!</span></h2>
          <input className="username-input" type="text" placeholder="Type your username" />
          <p className="press-start sub-subtext">Select your favorite color</p>
          <div className="cubes-container">
              {colors.map((object) => {
                  return (
                      <div key={object.id} id={object.id} className={"color-cube " + object.id} onClick={focusCube} />
                      )
              })}
          </div>
          <button className="continue press-start">Continue</button>
          <span className="copyright">© 2021 Devs United - <span className="highlight">BETA</span></span>
          <Link to="/">Login</Link>
          <Link to="/profile">Perfil</Link>
          <Link to="/feed">Feed</Link>
        </div>
      </header>
    </div>
        </>
    )
}