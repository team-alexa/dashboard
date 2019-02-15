import React, { Component } from 'react';
import '../css/Sidebar.css';
import SidebarButton from "./SidebarButton";

class Sidebar extends Component {
    
  render() {
    return (
      <div className={this.props.visible + " sidebar"}>
        <h1> Hello, <br/> Megan! </h1>
        <button className="toggle-sidebar-button" onClick={this.props.toggleSide}>&#9776;</button>
        <SidebarButton name="Home" link="" active={this.props.page == "home"}/>
        <SidebarButton name="Students" link="students" active={this.props.page == "students"}/>
        <SidebarButton name="Logs" link="logs" active={this.props.page == "logs"}/>
        <SidebarButton name="My Account" link="myaccount" active={this.props.page == "myaccount"}/>
        <SidebarButton name="Admin Panel" link="adminpanel" active={this.props.page == "adminpanel"}/>
        <SidebarButton name="Log Out" link=""/>
      </div>
    );
  }
}

export default Sidebar;
