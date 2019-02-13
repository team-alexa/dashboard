import React, { Component } from 'react';
import Sidebar from './Sidebar';
import LogoHeader from './LogoHeader';
import Content from './Content';
import '../css/MainApp.css';

class App extends Component {
  constructor(props) {
    super(props)

    this.toggleSidebar = this.toggleSidebar.bind(this)

    this.state = {
      sidebarVisible: "open"
    }
  }

  toggleSidebar() {
    this.setState({sidebarVisible: "close"})
  }

  render() {
    return (
      <div className="app" onClick={this.toggleSidebar}>
        <Sidebar visible={this.state.sidebarVisible}/>
        <LogoHeader />
        <Content />
      </div>
    );
  }
}

export default App;
