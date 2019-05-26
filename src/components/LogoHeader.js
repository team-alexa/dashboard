import React, { Component } from 'react';
import '../css/LogoHeader.css';
import logo from '../img/main_logo.png'
import { Context } from '../Store'

class LogoHeader extends Component {
  render() {
    return (
      <div className={this.context.sidebarClass + " logo-header"}>
        <img src={logo} alt=""></img>
        <div className={"loader " + (this.context.contentLoading ? "enabled" : "disabled")}></div>
      </div>
    )
  }
}

LogoHeader.contextType = Context;
export default LogoHeader;
