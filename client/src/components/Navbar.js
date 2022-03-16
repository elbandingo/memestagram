import React from "react";

const NavBar = ()=> {
    return (
    <nav>
    <div className="nav-wrapper black">
      <a href="/" className="brand-logo">Logo</a>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li><a href="/login">Login</a></li>
        <li><a href="/signup">sign up</a></li>
        <li><a href="/profile">My Profile</a></li>
      </ul>
    </div>
  </nav>
    )
}

export default NavBar