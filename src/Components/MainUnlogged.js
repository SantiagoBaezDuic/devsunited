import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../CSS/Login.css";
import "../CSS/MainUnlogged.css";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { auth } from "../Services/firebase";

export default function Unlogged() {

  //manejo de estado logeado (not developed yet)
  
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      console.log(user.displayName)
      const uid = user.uid;
      return user
      // ...
    } else {
      // User is signed out
      // ...
      console.log("user signed out")
    }
  });

  //Manejo del login con google (popup)

  const loginRedirect = () => {
    window.location.replace("/welcome");
  }

  const provider = new GoogleAuthProvider();

  const googleLogin = () => signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    loginRedirect();
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });

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
          <Link className="register-link" to="/register"><button className="login-btn">SIGN IN</button></Link>
          <Link className="register-link" to="/login"><button className="login-btn">LOG IN</button></Link>
          <span className="press-start little">or</span>
          <img onClick={googleLogin} className="google-login" width="200px" src="./img/btn_google_signin_dark_normal_web.png" alt="" />
          <span className="copyright">© 2021 Devs United - <span className="highlight">BETA</span></span>
          <Link to="/welcome">Logged</Link>
          <Link to="/logintest">TEST</Link>
        </div>
      </header>
    </div>
    )
}