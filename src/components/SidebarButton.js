import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import '../css/Sidebar.css';

class SidebarButton extends Component {
    constructor(props){
        super(props);
    }
    render() {
      return (
        <Link className={this.props.active ? "sidebar-button selected" : "sidebar-button"} to={"/" + this.props.link}>{this.props.name}</Link>
      );
  }
}

export default SidebarButton;
