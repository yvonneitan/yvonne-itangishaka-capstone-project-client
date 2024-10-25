import React from "react";
import "./Header.scss";
import { useNavigate, useLocation } from "react-router-dom";
import { handleNav } from "../../utils/utils";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const isLoginPage = location.pathname === "/";

  return (
    <header className="header">
      {isLoginPage ? (
        <p className="header__logo">AcTrack</p>
      ) : (
        <p
          className="header__logo"
          onClick={() => handleNav(navigate, "/home")}
        >
          AcTrack
        </p>
      )}
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
