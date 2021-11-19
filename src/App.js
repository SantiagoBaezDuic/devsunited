import './App.css';
import './styles.css';
import Welcome from "./MainPage.js";
import Login from "./MainLogin.js";
import Profile from './Profile.js';
import Feed from './Feed';
import {Route, Routes} from "react-router-dom";

function App() {

  return (
    <>
    <Routes>
      <Route path="/feed" element={<Feed />} />
      <Route exact path="/" element={<Login />} />
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
    </>
  );
}

export default App;