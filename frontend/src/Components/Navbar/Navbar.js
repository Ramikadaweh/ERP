import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { color } from '@mui/system';
export default function Navbar() {
  const [toggleMenu, setToggleMenu] = useState(false)
  useEffect(() => {

    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    }

    window.addEventListener('resize', changeWidth)
    return () => {
      window.removeEventListener('resize', changeWidth)
    }
  }, [])

  const toggleNav = () => {
    setToggleMenu(!toggleMenu)
  }
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)
  return (
    <nav>
      {(toggleMenu || screenWidth > 664) && (

        <ul className="list">
          <li className="items"><NavLink exact to='/home-page' activeClassName="active" style={{ textDecoration: 'none', color: 'white' }}>Home</NavLink> </li>
          <li className="items"><NavLink exact to='/employees' activeClassName="active" style={{ textDecoration: 'none', color: 'white' }}> Employees</NavLink> </li>
          <li className="items"><NavLink exact to='/teams' activeClassName="active" style={{ textDecoration: 'none', color: 'white' }}>Teams</NavLink> </li>
          <li className="items"><NavLink exact to='/projects' activeClassName="active" style={{ textDecoration: 'none', color: 'white' }}>Projects</NavLink> </li>
          <li className="items"><NavLink exact to='/reports' activeClassName="active" style={{ textDecoration: 'none', color: 'white' }}>Reports</NavLink> </li>
          <li className="items"><NavLink exact to='/kpis' activeClassName="active" style={{ textDecoration: 'none', color: 'white' }}>KPIs</NavLink> </li>
        </ul>
      )}

      <GiHamburgerMenu onClick={toggleNav} className="btn" />


    </nav>
  )
}