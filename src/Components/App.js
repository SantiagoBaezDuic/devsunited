import "../CSS/App.css";
import "../CSS/styles.css";
import Welcome from "./MainPage.js";
import Unlogged from "./MainUnlogged.js";
import Profile from "./Profile.js";
import Feed from "./Feed";
import Register from "./Register";
import Login from "./Login";
import { useContext, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { userContext } from "../Context/UserContext";

function App() {
  const { user } = useContext(userContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <>
      <Routes>
        <Route path="/feed" element={<Feed />} />
        <Route exact path="/" element={<Unlogged />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
