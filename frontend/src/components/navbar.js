import React, { useState, useEffect } from 'react';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
    <div className="container-fluid">
      <h6 className="navbar-brand" href="#">
        MyPortfolio
      </h6>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="/">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="#">
              About
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="#">
              Contact
            </a>
          </li>
        </ul>
        <form className="d-flex form-center" role="search">
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-outline-success btn-sm me-2" type="submit" style={{ fontSize: '14px', padding: '6px 10px', width: '35px' }}>
            &#128269;
          </button>
        </form>

      </div>
    </div>
  </nav>
  );
}

export default Navbar;
