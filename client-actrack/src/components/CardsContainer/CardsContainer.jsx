import React from 'react'

export default function CardsContainer() {
  return (
  
        <div className="header__profile">
        <p
          className={`header__profile-icon ${isActive("/") ? "active" : ""}`}
          onClick={() => handleNav(navigate, "/")}
        >
          Yvonne
        </p>
      </div>
  )
}
