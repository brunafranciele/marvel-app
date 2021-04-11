import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => (
  <div>
    <Link to={`/characters`}>
      <div>
      <p>Characters</p>
      </div>
    </Link>
    <Link to={`/comics`}>
      <div>
      <p>Comics</p>
      </div>
    </Link>
    <Link to={`/favorite`}>
      <div>
      <p>Favorite</p>
      </div>
    </Link>
    <Link to={`/`}>
      <div onClick={() => localStorage.clear()}>
      <p>Log Out</p>
      </div>
    </Link>
  </div>

);

export default Menu;