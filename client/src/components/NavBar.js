import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({ onLogout }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top shadow-sm" id="mainNav">
      <div className="container px-5">
        <Link className="navbar-brand fw-bold" to="/dashboard">Eazy Budget</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          Menu
          <i className="bi-list"></i>
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav ms-auto me-4 my-3 my-lg-0">
            <li className="nav-item"><Link className="nav-link me-lg-3" to="/dashboard">Dashboard</Link></li>
          </ul>
          <button className="btn btn-primary rounded-pill px-3 mb-2 mb-lg-0" onClick={onLogout}>
            <span className="d-flex align-items-center">
              <i className="bi-chat-text-fill me-2"></i>
              <span className="small">Logout</span>
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

