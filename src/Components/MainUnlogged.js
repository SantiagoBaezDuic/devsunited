import React from "react";
import { Link } from "react-router-dom";

export default function Unlogged() {
    return(
    <div className="App">
      <header className="App-header">
        <div className="logos-container">
          <img width="500px" src="./img/Logo.svg" alt="" />
          <img width="500px" src="./img/Logotexto.svg" alt="" />
        </div>
        <div className="home-login-container">
          <h2 className="press-start title">Welcome to <br/>Devs United!</h2>
          <p className="press-start subtext">The place to share with your fellow developers.</p>
          <Link class="register-link" to="/register"><button className="login-btn">SIGN IN</button></Link>
          <Link class="register-link" to="/login"><button className="login-btn">LOG IN</button></Link>
          <span className="press-start little">or</span>
          <img className="google-login" width="200px" src="./img/btn_google_signin_dark_normal_web.png" alt="" />
          <span className="copyright">© 2021 Devs United - <span className="highlight">BETA</span></span>
          <Link to="/welcome">Logged</Link>
          <Link to="/logintest">TEST</Link>
        </div>
      </header>
    </div>
    )
}