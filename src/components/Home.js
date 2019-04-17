import React, { Component } from 'react';
import Table from './Table';
import StudentCard from './StudentCard'
import Constants from '../Constants'
import { Context } from '../Store'
import '../css/Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  generateStudentCards() {
    const cards = []
    this.context.currentUser.students.forEach((student, index) => {
      const age = parseInt(new Date().getFullYear()) - parseInt(new Date(student.birthDate).getFullYear())
      cards.push(
        <StudentCard
          name={student.fullName}
          age={age}
          allergies={student.foodAllergies}
          id={student.studentID}
          key={index}
        />)
    })
    return cards
  }

  render() {
    return (
      <div className="home content-page">
        <h2>Recent Activity</h2>
        <Table data={Constants.logs}
          width="100%"
          height="400px"
          headers={["Date", "Student", "Teacher", "Category", "Details"]}
          columnWidths={["10%", "20%", "20%", "10%", "40%"]}
          rootAddress="/logs/"/>
        <h2>Your Students</h2>
        <div className="student-cards">
          {this.generateStudentCards()}
        </div>
      </div>
    );
  }
}

Home.contextType = Context

export default Home;
