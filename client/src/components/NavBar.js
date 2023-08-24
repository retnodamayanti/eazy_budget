import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({ onLogout }) => {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/expense">Expense</Link></li>
        <li><button onClick={onLogout}>Logout</button></li>
      </ul>
    </nav>
  );
};

export default NavBar;
