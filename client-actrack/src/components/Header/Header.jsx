import React from "react";
import "./Header.scss";
import { useNavigate } from "react-router-dom";
import { handleNav } from "../../utils/utils";

function Header() {
  const navigate = useNavigate(); // Get the navigate function from useNavigate hook

  return (
    <header className="header">
      <p className="header__logo" onClick={() => handleNav(navigate, "/")}>
        AcTrack
      </p>
      <div className="header__container">
        <p className="header__home" onClick={() => handleNav(navigate, "/")}>Home</p>
        <p className="header__lists" onClick={() => handleNav(navigate, "/lists")} >Lists</p>
        <p className="header__completed"onClick={() => handleNav(navigate, "/completed")}>Completed</p>
      </div>

      <div className="header__profile">
        <p className="header__profile-icon">Yvonne</p>
      </div>
    </header>
  );
}

export default Header;
