import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';

function Header() {
  //expanded is a state to toggle the open & close the navbar in narrow screens
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <Navbar bg="light" expand="lg" expanded={expanded} className="header">
        <img className="App-logo" src='8093f109675f4f7aac6b62f930ac0291 (6).png' alt='pic' />
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(expanded ? false : "expanded")} />
        <Navbar.Collapse className="navbar-nav mr-auto navbar-collapse collapse" id="basic-navbar-nav">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink to='/home' className='navbar-brand nav-link' data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show" onClick={() => setExpanded(false)}>Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to='/rafflePicker' className='navbar-brand nav-link' data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show" onClick={() => setExpanded(false)}>Raffles</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to='/weather' className='navbar-brand nav-link' data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show" onClick={() => setExpanded(false)}> Weather</NavLink>
            </li>
          </ul>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}

export default Header
