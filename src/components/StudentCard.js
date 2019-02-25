import React, { Component } from 'react';
import '../css/StudentCard.css';

const colorClasses = ["green", "yellow", "blue"]

class StudentCard extends Component {
  render() {
    return (
      <div className={"student-card " + colorClasses[Math.floor(Math.random()*3)]}>
        <h3>{this.props.name}</h3>
        <h4>Age</h4>
        <p>{this.props.age}</p>
        <h4>Allergies</h4>
        <p>{this.props.allergies}</p>
      </div>
    );
  }
}

export default StudentCard;
