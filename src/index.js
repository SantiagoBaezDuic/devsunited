import React from "react";
import ReactDOM from "react-dom";
import "./CSS/index.css";
import App from "./Components/App";
import PostProvider from "./Context/postContext";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import UserProvider from "./Context/UserContext";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <PostProvider>
          <App />
        </PostProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
