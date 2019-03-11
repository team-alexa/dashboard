import React, { Component } from 'react';
import '../css/LogoHeader.css';
import logo from '../img/main_logo.png'
import {DataConsumer} from '../Store'

class LogoHeader extends Component {
  render() {
    return (
      <DataConsumer>
        {store =>
          <div className={store.sidebarClass + " logo-header"}>
            <img src={logo}></img>
            <div className={"loader " + (store.contentLoading ? "enabled" : "disabled")}></div>
          </div>
        }
      </DataConsumer>
    )
  }
}

export default LogoHeader;
