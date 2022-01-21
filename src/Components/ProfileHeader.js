import { Link, useNavigate } from "react-router-dom";
import { signOut } from "../Services/Auth";

export default function ProfileHeader() {
  //Signout

  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <header>
      <div className="feed-header">
        <div className="header-container">
          <div className="back-container">
            <Link to="/feed">
              <img height="25px" src="./img/back.svg" alt="" />
            </Link>
            <span className="press-start">FEED</span>
          </div>
          <Link to="/">
            <div onClick={handleSignOut} className="logout-button">
              <span className="press-start logout-text">LOGOUT</span>
              <img height="20px" src="./img/logout.svg" alt="" />
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
