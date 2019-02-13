import React, { Component } from 'react';
import '../css/LogoHeader.css';
import logo from '../img/main_logo.png'

class LogoHeader extends Component {
  render() {
    return (
      <div className="logo-header">
        <img src={logo}></img>
      </div>
    );
  }
}

export default LogoHeader;
