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
      search: ""
    }
  }

  componentDidMount() {
    if (this.context.students.length == 0) {
      this.context.loadMoreStudents()
    }
    this.context.loadTeachers()
  }

  getStudentTableData() {
    if (this.state.searchStudents.length > 0) {
      return Object.keys(this.state.searchStudents).map(student => {
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
    if (this.state.search) {
      const filteredStudents = Object.keys(this.context.students).filter(student => {
        return this.context.students[student].fullName.includes(this.state.search)
      })
      this.setState({searchStudents: filteredStudents})
    } else {
      this.setState({searchStudents: []})
    }
  }

  onChange(e) {
    console.log(e.target.id)
    this.setState({[e.target.id]: e.target.value});
  }

  render() {
    return (
      <div className="search-page content-page">
        <div className="header">
          <h2>Students</h2>
          <form onSubmit={this.search}>
            <input type="text" placeholder="Search" id="search" value={this.state.search} onChange={this.onChange}></input>
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
