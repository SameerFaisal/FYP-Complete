import React from "react";
import '../App.css';
import { Link } from "react-router-dom";




export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light mainnavbar">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">PRO-VISION</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
      <ul className="nav navbar-nav navbar-right">
        <li className="nav-item">
          <Link className="nav-link" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/about">About</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link " to="#">Services</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="#">Blog</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="#">News</Link>
        </li>
        <li className="nav-item profilenav">
        <img class="rounded-circle profile"  src="https://mdbootstrap.com/img/Photos/Avatars/img%20(30).jpg" data-holder-rendered="true"/>
        </li>
        <li className="nav-item profilenav">
          <div className="row">
            <Link to="/"className="nav-link profilelink">Hamdan Majid</Link>
          </div>
          <div className="row">
            <Link to="/" className="nav-link profilelink text-primary">Emp ID: 9480968</Link>
          </div>
        </li>
        
      </ul>
    </div>
  </div>
</nav>
  
  );
}
