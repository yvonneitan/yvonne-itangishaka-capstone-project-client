import React from 'react'
import './Header.scss'

function Header() {
  return (
    <header className='header'>
         <p className='header__logo'>AcTrack</p>
         <div className="header__container">
            <p className='header__home'>Home</p>
            <p className='header__lists'>Lists</p>
            <p className='header__completed'>Completed</p>
         </div>
         <div className="header__profile">
            <p className="header__profile-icon">
                Yvonne
            </p>
         </div>
      
    </header>
  )
}

export default Header
