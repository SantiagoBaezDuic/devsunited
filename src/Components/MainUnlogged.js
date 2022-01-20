import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../Context/UserContext";
import "../CSS/Login.css";
import "../CSS/MainUnlogged.css";
import { signIn } from "../Services/Auth";

export default function Unlogged() {
  const { user } = useContext(userContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (user !== null) {
      navigate("/welcome");
    }
  }, [user, navigate]);

  return (
    <div className="App">
      <header className="App-header">
        <div className="logos-container">
          <img width="500px" src="./img/Logo.svg" alt="" />
          <img width="500px" src="./img/Logotexto.svg" alt="" />
        </div>
        <div className="home-login-container">
          <h2 className="press-start title">
            Welcome to <br />
            Devs United!
          </h2>
          <p className="press-start subtext">
            The place to share with your fellow developers.
          </p>
          <img
            onClick={signIn}
            className="google-login"
            width="200px"
            src="./img/btn_google_signin_dark_normal_web.png"
            alt=""
          />
          <span className="copyright">
            © 2021 Devs United - <span className="highlight">BETA</span>
          </span>
        </div>
      </header>
    </div>
  );
}
