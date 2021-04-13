import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/menu.css';

const Menu = () => (
  <div className="menu-container">
    <div className='divs-menu first'>
      <Link to={`/characters`} className='text-menu'>

        <p>Characters</p>

      </Link>
    </div>
    <div className='divs-menu'>
      <Link to={`/comics`} className='text-menu'>

        <p>Comics</p>

      </Link>
    </div>
    <div className='divs-menu'>
      <Link to={`/favorite`} className='text-menu'>

        <p>Favorite</p>

      </Link>
    </div>
    <div className='divs-menu'>
      <Link to={`/profile`} className='text-menu'>

        <p>Profile</p>

      </Link>
    </div>
    <div onClick={() => localStorage.clear()} className='divs-menu'>
      <Link to={`/`} className='text-menu'>

        <p>Log Out</p>

      </Link>
    </div>
    </div>

);

export default Menu;