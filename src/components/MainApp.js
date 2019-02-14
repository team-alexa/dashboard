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
      if(this.state.sidebarVisible == "close"){
          this.setState({sidebarVisible: "open"})
      }
      else{
          this.setState({sidebarVisible: "close"})
      }
  }

  render() {
    return (
      <div className="app">
        <Sidebar visible={this.state.sidebarVisible} toggleSide={this.toggleSidebar}/>
        <LogoHeader visible={this.state.sidebarVisible}/>
        <Content visible={this.state.sidebarVisible}/>
      </div>
    );
  }
}

export default App;
