import React, { Component } from 'react';
import Table from './Table';
import '../css/SearchPage.css';
import Constants from '../Constants'
import { Context } from '../Store'

class Students extends Component {
  constructor(props) {
    super(props)

    this.search = this.search.bind(this)
    this.onChange = this.onChange.bind(this)

    this.state = {
      searchStudents: [],
      displaySearch: false,
      studentName: "",
      teacherName: "",
    }
  }

  getStudentTableData() {
    if (this.state.displaySearch) {
      return this.state.searchStudents.map(student => {
        student = this.context.students[student]
        var age = parseInt(new Date().getFullYear()) - parseInt(new Date(student.birthDate).getFullYear())
        var teacher = this.context.teachers[student.teacherID] ? this.context.teachers[student.teacherID].fullName : ""
        return [student.firstName,
          student.lastName,
          teacher,
          age,
          student.foodAllergies,
          student.studentID]
      })
    } else {
      return Object.keys(this.context.students).map(student => {
        student = this.context.students[student]
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
  }

  search(e) {
    if (e) {
      e.preventDefault()
    }
    if (this.state.studentName || this.state.teacherName) {
      const filteredStudents = Object.keys(this.context.students).filter(student => {
        var containsStudentName = true
        var containsTeacherName = true
        if (this.state.studentName) {
          containsStudentName = this.context.students[student].fullName.toLowerCase().includes(this.state.studentName.toLowerCase())
        }
        if (this.state.teacherName) {
          const studentData = this.context.students[student]
          const teacherName = this.context.teachers[studentData.teacherID] ? this.context.teachers[studentData.teacherID].fullName : ""
          containsTeacherName = teacherName.toLowerCase().includes(this.state.teacherName.toLowerCase())
        }
        return containsStudentName && containsTeacherName
      })
      this.setState({searchStudents: filteredStudents, displaySearch: true})
    } else {
      this.setState({displaySearch: false})
    }
  }

  onChange(e) {
    this.setState({[e.target.id]: e.target.value});
  }

  render() {
    return (
      <div className="search-page content-page">
        <div className="header">
          <h2>Students</h2>
          <form onSubmit={this.search}>
            <input type="text" placeholder="Student" value={this.state.studentName} id="studentName" onChange={this.onChange}></input>
            <input type="text" placeholder="Teacher" value={this.state.teacherName} id="teacherName" onChange={this.onChange}></input>
            <button type="submit">→</button>
          </form>
        </div>
        <Table data={this.getStudentTableData()}
          height="80%"
          width="100%"
          headers={["First Name", "Last Name", "Teacher", "Age", "Allergies"]}
          columnWidths={["15%", "15%", "30%", "10%", "40%"]}
          rootAddress="/students/"
          newLink="/students/new"
          loadFunction = {this.context.loadMoreStudents} />
      </div>
    );
  }
}

Students.contextType = Context

export default Students;
