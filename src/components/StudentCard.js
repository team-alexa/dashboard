import React, { Component } from 'react';
import { withRouter } from "react-router";
import '../css/StudentCard.css';

const colorClasses = ["green", "yellow", "blue"]

class StudentCard extends Component {
  navigateTo(path) {
    this.props.history.push({pathname: path})
  }

  render() {
    return (
      <div className={"student-card " + colorClasses[Math.floor(Math.random()*3)]}
        onClick={() => {this.navigateTo("/students/" + this.props.id)}}>
        <h3>{this.props.name}</h3>
        <h4>Age</h4>
        <p>{this.props.age}</p>
        <h4>Allergies</h4>
        <p>{this.props.allergies}</p>
      </div>
    );
  }
}

export default withRouter(StudentCard);
