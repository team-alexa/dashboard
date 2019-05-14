import React, { Component } from 'react';
import '../css/Sidebar.css';
import SidebarButton from "./SidebarButton";
import { Context } from "../Store";
import { withRouter } from "react-router";
//import AuthPiece from "aws-amplify-react/dist/Auth";

class Sidebar extends Component {
    
  render() {
    console.log(this.props.location)
    const pathname = this.props.location ? this.props.location.pathname : "/"
    return (
      <div className={this.context.sidebarClass + " sidebar"}>
        <h1> Hello, <br/><span>{this.context.currentUser.firstName}</span></h1>
        <button className="toggle-sidebar-button" onClick={this.context.toggleSidebar}>&#9776;</button>
        <SidebarButton name="Home" link="" active={this.props.location.pathname === "/home" || this.props.location.pathname === "/"}/>
        <SidebarButton name="Students" link="students" active={this.props.location.pathname === "/students"}/>
        <SidebarButton name="Logs" link="logs" active={this.props.location.pathname === "/logs"}/>
        <SidebarButton name="My Account" link="account" active={this.props.location.pathname === "/account"}/>
        {this.context.currentUser.role === "admin" ? <SidebarButton name="Admin Panel" link="adminpanel" active={this.props.location.pathname === "/adminpanel"} /> : null}
        <SidebarButton name="Help" link="help" active={this.props.location.pathname === "/help"}/>
        <button className="logout-button" onClick={this.context.logOut}>Log Out</button>
        
      </div>
    );
  }
}

const WrappedClass = withRouter(Sidebar);
WrappedClass.WrappedComponent.contextType = Context;
export default WrappedClass;