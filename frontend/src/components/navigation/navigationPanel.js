import React from 'react';
import {Navbar, Header} from './styles';
import { Link } from 'react-router-dom';
import image from '../../images/logo.png';
 
const NavbarReact = (props) => {

  return (
    <Navbar style={{
        height: 120
    }}>
      <div className="logo"><img src={image} style={{
          height: 100
      }} /></div>

      <ul className="nav-links">
        <li>
          <Link to="/" className="link">&nbsp;</Link>
        </li>
        <li>
          <Link to="/cabinetmoderator" className="link">&nbsp;</Link>
        </li>
        <li>
          <Link to="/" className="link" onClick={()=> props.handleLogout()} >Выйти</Link>
        </li>
      </ul>
    </Navbar>
) }

export default NavbarReact;