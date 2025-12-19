import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="container">
        <div className="navbar-content">
          <h1>Consultancy Services</h1>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/admin">Admin</Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;