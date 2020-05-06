import React from 'react';
import {Navbar} from './styles';
import { Link } from 'react-router-dom';
 
const NavbarReact = (props) => {

  return (
    <Navbar>
      <div className="logo">Logo</div>

      <ul className="nav-links">
        <li>
          <Link to="/" className="link">Home</Link>
        </li>
        <li>
          <Link to="/cabinetmoderator" className="link">cabinet</Link>
        </li>
        <li>
          <Link to="/" className="link" onClick={()=> props.handleLogout()} >Logout</Link>
        </li>
      </ul>
    </Navbar>
) }

export default NavbarReact;