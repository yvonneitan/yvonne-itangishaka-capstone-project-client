import React from "react";
import "./Header.scss";
import { useNavigate } from "react-router-dom";
import { handleNav } from "../../utils/utils";

function Header() {
  const navigate = useNavigate();
  const isActive = (path) => location.pathname === path;

  return (
    <header className="header">
       <p
          className={`header__logo ${isActive('/') ? 'active' : ''}`}
          onClick={() => handleNav(navigate, '/')}>AcTrack
        </p>
     
      <div className="header__container">
        <p
          className={`header__home ${isActive("/") ? "active" : ""}`}
          onClick={() => handleNav(navigate, "/")}
        >
          Home
        </p>
        <p
          className={`header__lists ${isActive("/lists") ? "active" : ""}`}
          onClick={() => handleNav(navigate, "/lists")}
        >
          Lists
        </p>

        <p
          className={`header__completed ${
            isActive("/completed") ? "active" : ""
          }`}
          onClick={() => handleNav(navigate, "/completed")}
        >
          Completed
        </p>
      </div>

      <div className="header__profile">
        <p
          className={`header__profile-icon ${isActive("/") ? "active" : ""}`}
          onClick={() => handleNav(navigate, "/")}
        >
          Yvonne
        </p>
      </div>
    </header>
  );
}

export default Header;
