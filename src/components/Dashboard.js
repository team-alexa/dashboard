import React, { Component } from 'react';
import Sidebar from './Sidebar';
import LogoHeader from './LogoHeader';
import Content from './Content';
import { Context } from '../Store';
import { Auth } from 'aws-amplify';
import '../css/Dashboard.css';

class Dashboard extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    Auth.currentAuthenticatedUser()
      .then(user => this.context.loadUserData(user))
    this.context.loadTeachers()
    this.context.loadStudents()
  }

  render() {
    this.context.setPageId(this.props.match.params.id)
    this.context.setPage(this.props.match.params.page)
    return (
      this.context.page == "login" ? null :
      <div className="app">
        <Sidebar/>
        <LogoHeader/>
        <Content/>
      </div>
    );
  }
}

Dashboard.contextType = Context;
export default Dashboard;
