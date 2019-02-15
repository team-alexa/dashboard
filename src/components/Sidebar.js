import React, { Component } from 'react';
import '../css/Sidebar.css';
import SidebarButton from "./SidebarButton";
import {DataConsumer} from "../Store";

class Sidebar extends Component {
    
  render() {
    return (
      <DataConsumer>
        {store =>
          <div className={store.sidebarClass + " sidebar"}>
            <h1> Hello, <br/> Megan! </h1>
            <button className="toggle-sidebar-button" onClick={store.toggleSidebar}>&#9776;</button>
            <SidebarButton name="Home" link="" active={store.page == "home"}/>
            <SidebarButton name="Students" link="students" active={store.page == "students"}/>
            <SidebarButton name="Logs" link="logs" active={store.page == "logs"}/>
            <SidebarButton name="My Account" link="myaccount" active={store.page == "myaccount"}/>
            <SidebarButton name="Admin Panel" link="adminpanel" active={store.page == "adminpanel"}/>
            <SidebarButton name="Log Out" link=""/>
          </div>
        }
      </DataConsumer>
    );
  }
}

export default Sidebar;
