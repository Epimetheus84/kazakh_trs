import React from 'react';
import {Navbar} from './styles';
import { Link } from 'react-router-dom';
 
const NavbarReact = () => (
 
    <Navbar>
      <div className="logo">Logo</div>

      <ul className="nav-links">
        <li>
          <Link to="/" className="link">Home</Link>
        </li>
        <li>
          <Link to="/cabinet" className="link">cabinet</Link>
        </li>
        <li>
          <Link to="/" className="link">Logout</Link>
        </li>
      </ul>
    </Navbar>
)

export default NavbarReact;