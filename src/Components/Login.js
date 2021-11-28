import React from "react";
import { Link } from "react-router-dom";
import "../CSS/Login.css";

export default function Login() {
    return(
    <div className="App">
      <header className="App-header">
        <div className="logos-container">
          <img width="500px" src="./img/Logo.svg" alt="" />
          <img width="500px" src="./img/Logotexto.svg" alt="" />
        </div>
        <div className="home-login-container">
          <h2 className="press-start title">Log in to your<br/>Account</h2>
          <p className="press-start subtext">Using your email and password.</p>
          <input className="username-input register-inputs" type="email" placeholder="yourname@email.com" />
          <input className="username-input register-inputs" type="password" placeholder="password" />
          <Link class="register-link" to="/welcome"><button className="login-btn">SIGN IN</button></Link>
          <span className="copyright">© 2021 Devs United - <span className="highlight">BETA</span></span>
          <Link to="/welcome">Logged</Link>
          <Link to="/">Unlogged</Link>
        </div>
      </header>
    </div>
    )
}