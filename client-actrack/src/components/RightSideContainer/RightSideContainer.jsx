import React from 'react'
import menuIcon from "../../assets/icons/menu.svg"
import "./RightSideContainer.scss"
function RightSideContainer() {
  return (
    <div className="container">
      <p  className="container__title">Today</p>   
      <img src={menuIcon} className="contaner__menu" alt="Menu Icon" />
    </div>
  )
}

export default RightSideContainer
