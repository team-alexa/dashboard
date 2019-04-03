import React, { Component } from 'react';
import {Context} from '../Store'
import '../css/Content.css';

import Home from './Home'
import AdminPage from './AdminPage'
import StudentProfile from './StudentProfile'
import Students from './Students'
import Logs from './Logs'
import Error from './Error'
import LogPage from'./LogPage'
import AccountPage from './AccountPage'

class Content extends Component {
  constructor(props) {
    super(props);

    this.toastRef = React.createRef()
    this.updated = false
    this.state = {
      toastLeft: "0px"
    }
  }

  getComponent() {
    if (this.context.pageId) {
      switch(this.context.page) {
        case "students": return <StudentProfile id={this.context.pageId} />
        case "logs": return <LogPage id={this.context.pageId}  />
      }
    } else {
      switch(this.context.page) {
        case "": return <Home />
        case "home": return <Home />
        case "students": return <Students />
        case "logs": return <Logs />
        case "adminpanel": return <AdminPage />
        case "myaccount": return <AccountPage />
        default: return <Error />
      }
    }
  }

  componentDidUpdate() {
    if (!this.updated) {
      var left = 125 // accounting for sidebar offset and padding
      left -= this.toastRef.current.offsetWidth/2
      this.setState({toastLeft: `calc(50% + ${left}px)`})
    }
    this.updated = !this.updated
  }

  render() {
    return (
      <div className={this.context.sidebarClass + " content"}>
        <div className={"toast " + (this.context.toast.visible ? "enabled " : "disabled ") + this.context.toast.color}
          style={{left: this.state.toastLeft}}
          ref={this.toastRef}>
          <h2>{this.context.toast.message}</h2>
          <span onClick={() => this.context.setToast({visible: false})}>x</span>
        </div>
        {this.getComponent()}
      </div>
    );
  }
}

Content.contextType = Context;
export default Content;
