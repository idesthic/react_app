import React from "react";
import '../App.css';
import logo from '../images/logo.svg';

const Header = () => {
  return (
    <header className="App-header">
      <img src={logo} className="header-logo" alt="logo" />
      <h1>SpaceX</h1>
    </header>
  );
};

export default Header;
