import React, { Component } from 'react';
import Table from './Table';
import '../css/SearchPage.css';
import { Context } from '../Store'

class Students extends Component {
  constructor(props) {
    super(props)

    this.search = this.search.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onInactiveChange = this.onInactiveChange.bind(this)
    this.searchonChange=this.searchonChange.bind(this);
    this.displayAllLogs=this.displayAllLogs.bind(this);
    this.state = {
      searchStudents: [],
      displaySearch: false,
      studentName: "",
      teacherName: "",
      includeInactive: false
    }
  }

  getStudentTableData() {
    if (this.state.displaySearch) {
      const students = this.state.includeInactive ? this.state.searchStudents : this.state.searchStudents.filter(student => {
        return this.context.students[student].status === "active"
      })
      return students.map(student => {
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
      const students = this.state.includeInactive ? Object.keys(this.context.students) : Object.keys(this.context.students).filter(student => {
        return this.context.students[student].status === "active"
      })
      return students.map(student => {
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
  searchonChange(e) {
    this.setState({[e.target.id]: e.target.value},(()=>{
      this.displayAllLogs();
  }))
  }
  onInactiveChange(e) {
    this.setState({includeInactive: e.target.checked})
  }
  displayAllLogs() {
    console.log(this.state.studentName)
    if(this.state.studentName==="" && this.state.teacherName===""){
      this.setState({displaySearch: false})
    }
  }

  render() {
    return (
      <div className="search-page content-page">
        <div className="header student-header">
          <h2>Students</h2>
          <form onSubmit={this.search}>
            <input type="text" placeholder="Student" value={this.state.studentName} id="studentName" onChange={this.searchonChange}></input>
            <input type="text" placeholder="Teacher" value={this.state.teacherName} id="teacherName" onChange={this.searchonChange}></input>
            <button type="submit">→</button>
          </form>
        </div>
        <div className="include-inactive">
          <label htmlFor="includeInactive">Include inactive students </label>
          <input type="checkbox" id="includeInactive" checked={this.state.includeInactive} onChange={this.onInactiveChange} />
        </div><br/>
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
