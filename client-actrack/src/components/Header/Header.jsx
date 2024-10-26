import React from "react";
import "./Header.scss";
import { useNavigate, useLocation } from "react-router-dom";
import { handleNav } from "../../utils/utils";
import logoIcon from "../../assets/icons/actrack-logo.png";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const isLoginPage = location.pathname === "/";

  return (
    <header className="header">
      <div className="header__logo--item" onClick={() => handleNav(navigate, "/home")}>
        <img src={logoIcon} alt="logo image" className="header__logo--item-icon" />
        <p className="header__logo--item-title">AcTrack</p>
      </div>
      {!isLoginPage && (
        <div className="header__container">
          <p
            className={`header__home ${location.pathname === "/home" ? "active" : ""}`}
            onClick={() => handleNav(navigate, "/home")}
          >
            Home
          </p>
          <p
            className={`header__lists ${location.pathname === "/lists" ? "active" : ""}`}
            onClick={() => handleNav(navigate, "/lists")}
          >
            Lists
          </p>
          <p
            className={`header__completed ${location.pathname === "/completed" ? "active" : ""}`}
            onClick={() => handleNav(navigate, "/completed")}
          >
            Completed
          </p>
        </div>
      )}
      <div className="header__profile">
        <p
          className="header__profile-icon"
          onClick={() => !isLoginPage && handleNav(navigate, "/home")}
        >
          {isLoginPage ? "Sign in" : "Yvonne"}
        </p>
      </div>
    </header>
  );
}

export default Header;
