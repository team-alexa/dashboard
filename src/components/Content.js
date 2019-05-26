import React, { Component } from 'react';
import {Context} from '../Store'
import '../css/Content.css';
import { Route, Switch} from 'react-router-dom'
import Home from './Home'
import AdminPage from './AdminPage'
import StudentProfile from './StudentProfile'
import Students from './Students'
import Logs from './Logs'
import Error from './Error'
import Help from './Help'
import LogPage from'./LogPage'
import AccountPage from './AccountPage'
import ChangePassword from './ChangePasswordInApp'
import ChangEmail from './ChangeEmailInApp'
class Content extends Component {
  constructor(props) {
    super(props);

    this.toastRef = React.createRef()
    this.updated = false
    this.state = {
      toastLeft: "0px"
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
        <Switch>
          <Route path="/students/:id" component={StudentProfile} />
          <Route path="/students" component={Students} />
          <Route path="/logs/:id" component={LogPage} />
          <Route path="/logs" component={Logs} />
          <Route path="/account/:id" component={AccountPage} />
          <Route path="/account" component={AccountPage} />
          <Route path="/adminpanel" component={AdminPage} />
          <Route path="/help" component={Help} />
          <Route path="/changePass" component={ChangePassword} />
          <Route path="/changeemail" component={ChangEmail} />
          <Route path="/home" component={Home} />
          <Route exact path="/" component={Home} />
          <Route component={Error} />
        </Switch>
      </div>
    );
  }
}

Content.contextType = Context;
export default Content;
