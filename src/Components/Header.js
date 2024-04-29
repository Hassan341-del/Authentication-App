import React from 'react';
import './Header.css'
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid justify-content-end">
          <a href="#" className="navbar-brand">Authentication App</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a href="#" className="nav-link active">Home</a>
              <a href="#" className="nav-link">About Us</a>
              <a href="#" className="nav-link">Services</a>
              <a href="#" className="nav-link">Contact Us</a>
              <a href="#" className="nav-link">Sign Up</a>
              <a to="#" className="nav-link">Sign In</a>
            </div>
        </div> 
        </div>
      </nav>
    </>
  );
}
