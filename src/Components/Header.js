import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'

export default function Header(props) {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid justify-content-end">
          <Link to="#" className="navbar-brand">Authentication App</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
            <div className="navbar-nav">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/about-us" className="nav-link">About Us</Link>
            <Link to="/services" className="nav-link">Services</Link>
            <Link to="/contact-us" className="nav-link">Contact Us</Link>
            <Link to="/signup" className="nav-link">Sign Up</Link>
            <Link to="/signin" className="nav-link">Sign In</Link>
            <Link className="nav-link" onClick={props.signOut}>Sign Out</Link>
            </div>
        </div> 
        </div>
      </nav>
    </>
  );
}
