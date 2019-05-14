import React, { Component } from 'react';
import '../css/Sidebar.css';
import SidebarButton from "./SidebarButton";
import { Context } from "../Store";
import { withRouter } from "react-router";
//import AuthPiece from "aws-amplify-react/dist/Auth";

class Sidebar extends Component {
    
  render() {
    return (
      <div className={this.context.sidebarClass + " sidebar"}>
        <h1> Hello, <br/><span>{this.context.currentUser.firstName}</span></h1>
        <button className="toggle-sidebar-button" onClick={this.context.toggleSidebar}>&#9776;</button>
        <SidebarButton name="Home" link="" active={this.props.match.params.page === "home" || !this.props.match.params.page}/>
        <SidebarButton name="Students" link="students" active={this.props.match.params.page === "students"}/>
        <SidebarButton name="Logs" link="logs" active={this.props.match.params.page === "logs"}/>
        <SidebarButton name="My Account" link="account" active={this.props.match.params.page === "account"}/>
        {this.context.currentUser.role === "admin" ? <SidebarButton name="Admin Panel" link="adminpanel" active={this.props.match.params.page === "adminpanel"} /> : null}
        <SidebarButton name="Help" link="help" active={this.props.match.params.page === "help"}/>
        <button className="logout-button" onClick={this.context.logOut}>Log Out</button>
        
      </div>
    );
  }
}

const WrappedClass = withRouter(Sidebar);
WrappedClass.WrappedComponent.contextType = Context;
export default WrappedClass;