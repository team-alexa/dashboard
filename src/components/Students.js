import React, { Component } from 'react';
import Table from './Table';
import '../css/SearchPage.css';
import Constants from '../Constants'
import { Context } from '../Store'

class Students extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if (this.context.students.length == 0) {
      this.context.setContentLoading(true)
      fetch(Constants.apiUrl + 'students')
        .then(response => response.json())
        .then(data => {
          this.context.setStudents(data)
          this.context.setContentLoading(false)
        })
    }
    this.context.loadTeachers()
  }

  getStudentTableData() {
    return this.context.students.map(student => {
      var age = parseInt(new Date().getFullYear()) - parseInt(new Date(student.birthDate).getFullYear())
      var teacher = this.context.teachers[student.teacherID] ? this.context.teachers[student.teacherID].fullName : ""
      return [student.firstName,
        student.lastName,
        teacher,
        age,
        student.foodAllergies,
        student.studentID]
    })
  }

  render() {
    return (
      <div className="search-page content-page">
        <div className="header">
          <h2>Students</h2>
          <button type="submit">→</button>
          <input type="text" placeholder="Search"></input>
        </div>
        <Table data={this.getStudentTableData()}
          height="80%"
          width="100%"
          headers={["First Name", "Last Name", "Teacher", "Age", "Allergies"]}
          columnWidths={["15%", "15%", "30%", "10%", "40%"]}
          rootAddress="/students/"
          newLink="/students/new" />
      </div>
    );
  }
}

Students.contextType = Context

export default Students;
