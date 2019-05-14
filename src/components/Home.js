import React, { Component } from 'react';
import Table from './Table';
import StudentCard from './StudentCard'
import { Context } from '../Store'
import '../css/Home.css';

class Home extends Component {

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

  getLogTableData() {
    return this.context.logs.map(log => {
      const date = new Date(log.date)
      const dateStr = (date.getUTCMonth() + 1) + "/" + date.getUTCDate() + "/" + date.getUTCFullYear()
      return [dateStr,
        log.studentFullName,
        log.teacherFullName,
        log.activityType,
        log.activityDetails,
        log.logID]
    })
  }

  render() {
    return (
      <div className="home content-page">
        <h2>Recent Activity</h2>
        <Table data={this.getLogTableData()}
          height="40vh"
          width="100%"
          headers={["Date", "Student", "Teacher", "Category", "Details"]}
          columnWidths={["10%", "20%", "20%", "10%", "40%"]}
          rootAddress="/logs/"
          newLink="/logs/new"
          loadFunction = {this.context.loadMoreLogs} />
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
