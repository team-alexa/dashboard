import React, { Component } from 'react';
import Sidebar from './Sidebar';
import LogoHeader from './LogoHeader';
import Content from './Content';
import { Context } from '../Store';
import '../css/Dashboard.css';

class Dashboard extends Component {
  constructor(props) {
    super(props)
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
