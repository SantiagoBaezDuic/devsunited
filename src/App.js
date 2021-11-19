import './App.css';
import './styles.css';
import Welcome from "./MainPage.js";
import Login from "./MainLogin.js";
import {Route, Routes} from "react-router-dom";

function App() {

  return (
    <>
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route path="/welcome" element={<Welcome />} />
    </Routes>
    </>
  );
}

export default App;