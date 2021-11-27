import '../CSS/App.css';
import '../CSS/styles.css';
import Welcome from "./MainPage.js";
import Unlogged from "./MainUnlogged.js";
import Profile from './Profile.js';
import Feed from './Feed';
import Register from './Register';
import Login from './Login';
import Logintest from "./Logintest.js"
import {Route, Routes} from "react-router-dom";

function App() {

  return (
    <>
    <Routes>
      <Route path="/feed" element={<Feed />} />
      <Route exact path="/" element={<Unlogged />} />
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/logintest" element={<Logintest />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
    </>
  );
}

export default App;