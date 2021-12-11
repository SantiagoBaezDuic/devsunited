import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../CSS/Login.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Services/firebase";


export default function Login() {

const [email, setEmail] = useState("");

const [password, setPassword] = useState("");

const [error, setError] = useState("");

const SignIn = () => {
  setError("");
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    window.location.replace("/welcome");
    // ...
  })
  .catch((error) => {
    const errorMessage = error.message;
    setError(errorMessage);
  });
}

  const handleEmail = (e) => {
    setEmail(e.target.value);
    console.log("El email es " + email);
  }

  const handlePassword = (e) => {
    setPassword(e.target.value);
    console.log("La password es " + password);
  }

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
          <input onChange={handleEmail} className="username-input register-inputs" type="email" placeholder="yourname@email.com" />
          <input onChange={handlePassword} className="username-input register-inputs" type="password" placeholder="password" />
          <button onClick={SignIn} className="login-btn">SIGN IN</button>
          {error !== "" ? <div>Ha ocurrido un error: <br/> {error}</div> : null}
          <span className="copyright">© 2021 Devs United - <span className="highlight">BETA</span></span>
          <Link to="/welcome">Logged</Link>
          <Link to="/">Unlogged</Link>
        </div>
      </header>
    </div>
    )
}