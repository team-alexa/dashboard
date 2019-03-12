import React, { Component } from 'react';
import '../css/Sidebar.css';
import SidebarButton from "./SidebarButton";
import { Context } from "../Store";

class Sidebar extends Component {
    
  render() {
    return (
      <div className={this.context.sidebarClass + " sidebar"}>
        <h1> Hello, <br/><span>{this.context.currentUser}</span></h1>
        <button className="toggle-sidebar-button" onClick={this.context.toggleSidebar}>&#9776;</button>
        <SidebarButton name="Home" link="" active={this.context.page == "home"}/>
        <SidebarButton name="Students" link="students" active={this.context.page == "students"}/>
        <SidebarButton name="Logs" link="logs" active={this.context.page == "logs"}/>
        <SidebarButton name="My Account" link="myaccount" active={this.context.page == "myaccount"}/>
        <SidebarButton name="Admin Panel" link="adminpanel" active={this.context.page == "adminpanel"}/>
        <SidebarButton name="Help" link="help" active={this.context.page == "help"}/>
        <SidebarButton name="Log Out" link="login"/>
      </div>
    );
  }
}

Sidebar.contextType = Context;
export default Sidebar;
