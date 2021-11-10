import './App.css';
import './styles.css';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCM5nAp1qOb9F3YZZveuZAwdVK_jGV5OxU",
  authDomain: "devsunited-77341.firebaseapp.com",
  projectId: "devsunited-77341",
  storageBucket: "devsunited-77341.appspot.com",
  messagingSenderId: "496568895859",
  appId: "1:496568895859:web:67ffc577ba3e3d99925d06",
  measurementId: "G-SY7W0Y73NV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="logos-container">
          <img width="500px" src="./img/Logo.svg" alt="" />
          <img width="500px" src="./img/Logotexto.svg" alt="" />
        </div>
        <div className="home-login-container">
          <h2 className="press-start title">Welcome to <br/>Devs United!</h2>
          <p className="press-start subtext">The place to share with your fellow developers.</p>
          <button className="login-btn">SIGN IN</button>
          <button className="login-btn">LOG IN</button>
          <span className="press-start little">or</span>
          <img className="google-login" width="200px" src="./img/btn_google_signin_dark_normal_web.png" alt="" />
        </div>
      </header>
    </div>
  );
}

export default App;