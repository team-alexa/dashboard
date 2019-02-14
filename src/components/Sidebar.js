import React, { Component } from 'react';
import '../css/Sidebar.css';
import SidebarButton from "./SidebarButton";

class Sidebar extends Component {
    
  render() {
    return (
      <div className={this.props.visible + " sidebar"}>
        <h1 style={{"textAlign":"right", "fontSize":"20pt"}}> Hello, <br/> Person! </h1>
        <button className="toggle-sidebar-button" onClick={this.props.toggleSide}>&#9776;</button>
        <SidebarButton name="Home" link="" active={true}/>
        <SidebarButton name="Students" link="students" active={false}/>
        <SidebarButton name="Logs" link="logs" active={false}/>
        <SidebarButton name="My Account" link="myaccount" active={false}/>
        <SidebarButton name="Admin Panel" link="adminpanel" active={false}/>
        <SidebarButton name="Log Out" link=""/>
      </div>
    );
  }
}

export default Sidebar;
