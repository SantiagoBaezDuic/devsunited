import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { auth } from "../Services/firebase";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { registerUser } from "../Services/operations";

export default function Register() {
  //Seteo de los estados del email y la contraseña

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //POST de los datos para la creación del usuario

  const handleRegister = () => {
    // registerUser(email, password);
  };

  //Manejo de los estados del email y la contraseña

  const handleUser = (e) => {
    setEmail(e.target.value);
  };

  const handlePass = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="logos-container">
          <img width="500px" src="./img/Logo.svg" alt="" />
          <img width="500px" src="./img/Logotexto.svg" alt="" />
        </div>
        <div className="home-login-container">
          <h2 className="press-start title">
            Create your <br />
            Account
          </h2>
          <p className="press-start subtext">Using your email and password.</p>
          <input
            value={email}
            onChange={handleUser}
            className="username-input register-inputs"
            type="email"
            placeholder="yourname@email.com"
          />
          <input
            value={password}
            onChange={handlePass}
            className="username-input register-inputs"
            type="password"
            placeholder="password"
          />
          <button onClick={handleRegister} className="login-btn">
            SIGN UP
          </button>
          <span className="copyright">
            © 2021 Devs United - <span className="highlight">BETA</span>
          </span>
          {/* <Link to="/welcome">Logged</Link>
          <Link to="/">Unlogged</Link> */}
        </div>
      </header>
    </div>
  );
}
