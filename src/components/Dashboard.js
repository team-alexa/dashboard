import React, { Component } from 'react';
import Sidebar from './Sidebar';
import LogoHeader from './LogoHeader';
import Content from './Content';
import{Context} from '../Store'
import { Auth } from 'aws-amplify';
import { withRouter } from "react-router";
import '../css/Dashboard.css';

class Dashboard extends Component {
  componentDidMount() {
    Auth.currentAuthenticatedUser()
      .then(user => this.context.loadUserData(user))
    this.context.loadStudents()
    this.context.loadTeachers()
    if (this.context.logs.length === 0) {
      this.context.loadMoreLogs()
    }
  }

  render() {
    return (
      this.context.page === "login" ? null :
      <div className="app">
        <Sidebar/>
        <LogoHeader/>
        <Content/>
      </div>
    );
  }
}

const WrappedClass =withRouter(Dashboard);
WrappedClass.WrappedComponent.contextType = Context;
export default WrappedClass;