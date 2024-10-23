import React from 'react'
import menuIcon from "../../assets/icons/menu.svg"
import downIcon from "../../assets/icons/arrow_down.svg"
import "./RightSideContainer.scss"
function RightSideContainer() {
  return (
    <div className="container">
      <img src={downIcon} className="contaner__menu" alt="Menu Icon" />

      <p  className="container__title">Today</p>   
      <img src={menuIcon} className="contaner__menu" alt="Menu Icon" />
    </div>
  )
}

export default RightSideContainer
