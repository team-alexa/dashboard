import React, { Component } from 'react';
import '../css/StudentProfile.css';
import { Context } from '../Store'
import Constants from '../Constants'

import Table from './Table';
import SearchableInput from './SearchableInput'

const singleStudentTableData = [
  ["2/14/19", "Megan Waterworth", "Sophia Hills", "Food", "milk", "log1"],
  ["2/14/19", "Megan Waterworth", "Jack Baker", "Anecdotal", "Details", "log12"],
  ["2/14/19", "Megan Waterworth", "Emma Jones", "Food", "milk", "log1"],
  ["2/14/19", "Megan Waterworth", "Fred Barthel", "Food", "Fred's Breads", "log142"],
  ["2/14/19", "Megan Waterworth", "Nathan Irwin", "Activity", "Details", "log52"],
  ["2/14/19", "Megan Waterworth", "Abby Johnson", "Food", "milk", "log12"],
  ["2/13/19", "Megan Waterworth", "Trish White", "Anecdotal", "Details", "log55"],
  ["2/13/19", "Megan Waterworth", "Steven Kitscha", "Activity", "Details", "log25"],
  ["2/13/19", "Megan Waterworth", "Katie Clark", "Sleep", "Details", "log105"],
  ["2/13/19", "Megan Waterworth", "Nathan Irwin", "Activity", "Details", "log42"],
  ["2/13/19", "Megan Waterworth", "Abby Johnson", "Needs", "Details", "log68"],
  ["2/13/19", "Megan Waterworth", "Trish White", "Food", "milk", "log22"],
  ["2/13/19", "Megan Waterworth", "Steven Kitscha", "Food", "milk", "log53"],
  ["2/13/19", "Megan Waterworth", "Emma Jones", "Sleep", "Details", "log24"],
  ["2/13/19", "Megan Waterworth", "Fred Barthel", "Sleep", "Fred's Breads", "log95"],
  ["2/13/19", "Megan Waterworth", "Collin Zafar", "Sleep", "Details", "log72"]
]

class StudentProfile extends Component{
  constructor(props){
    super(props)

    this.onChange = this.onChange.bind(this)
    this.saveData = this.saveData.bind(this)
    this.getStudentTeacherName = this.getStudentTeacherName.bind(this)

    this.state = {
      birthDate: "",
      firstName: "",
      foodAllergies: "",
      lastName: "",
      medical: "",
      nickName: "",
      studentID: "",
      teacherID: "",
      teachers: [],
      hasChanged: false,
      editable: false,
      date: "",
      month: "",
      year: ""
    }

    this.displayedMessage = false
  }

  componentDidMount() {
    if (this.context.pageId != "new") {
      this.context.setContentLoading(true)
      fetch(Constants.apiUrl + "students?studentID=" + this.props.id)
        .then(response => response.json())
        .then(data => {
          if (data[0]) {
            if (!data[0].nickName) {
              data[0].nickName = data[0].firstName
            }
            const birthDate = new Date(data[0].birthDate)
            const newState = data[0]

            newState.date = birthDate.getDate()
            newState.month = birthDate.getMonth()
            newState.year = birthDate.getFullYear()
            newState.editable = true
            this.setState(newState)
          } else {
            if (!this.displayedMessage) {
              this.context.setToast({message: "No Student Found", color: "red", visible: true})
            }
          }
          this.context.setContentLoading(false)
        })
    } else {
      this.setState({editable: true})
    }

    if (this.context.teachers.length == 0) {
      fetch(Constants.apiUrl + "teachers")
          .then(response => response.json())
          .then(data => {
            this.context.setTeachers(data)
          })
    }
  }

  saveData() {
    this.context.setToast({message: "Saved!", color: "green", visible: true})
  }

  getStudentTeacherName() {
    var teacher = this.context.teachers.filter(teacher => {
      return teacher.teacherID == this.state.teacherID
    })

    return teacher[0] ? teacher[0].fullName : null
  }

  getAllTeacherNames() {
    return this.context.teachers.map(teacher => teacher.fullName)
  }

  onChange(e) {
    if (this.state.editable)
      this.setState({[e.target.id]: e.target.value, hasChanged: true});
  }
  
  render() {
    var teacherName = this.getStudentTeacherName()
    return (
      <div className="student-profile content-page" >
      <div className="button-group">
        {this.context.pageId != "new" ?
          <button type="button" className = "log-button enabled">
            <div className="text">New Log</div>
          </button> : null }
        <button className={this.state.hasChanged ? "enabled" : "disabled"} type="button" onClick={this.saveData}>Save</button> 
      </div>
      <h2 className="name">{this.state.lastName ? `${this.state.lastName}, ${this.state.firstName}` : "Last Name, First Name"}</h2>
      <br/>
      <label htmlFor="lname">Name:</label> <input type="text" placeholder="Last Name" size ="32"  name="lastName" id="lastName" value={this.state.lastName} onChange={this.onChange} autoComplete="off"/>
      <input type="text" placeholder="First Name" size ="32" name="firstName" id="firstName" value={this.state.firstName} onChange={this.onChange} autoComplete="off"/>
      <br/>
      <label htmlFor="nickname">Nickname:</label> <input type="text" placeholder="Nickname" size="25" name="nickName" id="nickName" value={this.state.nickName} onChange={this.onChange} autoComplete="off"/>
      <br />
      <label htmlFor="id">ID:</label> <input type="text" size = "10" name="studentID" id="studentID" placeholder="Student ID" value={this.state.studentID} onChange={this.onChange} autoComplete="off"/>
      <br/>
      <p>Age: 2 </p>
      <label htmlFor="month">DOB (MM/DD/YYYY):</label>
      <input type="number" size = "2" maxLength="2" min="0" max="12" placeholder ="01" name="month" id="month" value={this.state.month} onChange={this.onChange} autoComplete="off" />
      /<input type="number" size = "2" maxLength="2" min="0" max="31" placeholder ="01" name="day" id="date" value={this.state.date} onChange={this.onChange} autoComplete="off" />
      /<input type="number" size = "4" maxLength="4" placeholder ="2017" name="year" id="year" value={this.state.year} onChange={this.onChange} autoComplete="off" />
      <br/>
      <label htmlFor="food">Food Allergies (comma-separated):</label> <input type="text" size = "64" id="foodAllergies" value={this.state.foodAllergies} onChange={this.onChange} autoComplete="off" />
      <br/>
      <label htmlFor="medical">Medical Conditions (comma-separated):</label> <input type="text" size = "64" id="medical" value={this.state.medical} onChange={this.onChange} autoComplete="off" />
      <br/>
      <SearchableInput
        placeholder="Teacher"
        label="Teacher: "
        limit={1}
        values={teacherName ? [teacherName] : null}
        possibleValues={this.getAllTeacherNames()}
        onClick={() => this.setState({hasChanged: true})}/>
      {this.context.pageId != "new" ? <div>
        <br/>
        <h2>{this.state.fullName ? `${this.state.fullName}'s Logs` : "Logs"}</h2>
        <Table data={singleStudentTableData}
          width="100%"
          height="400px"
          headers={["Date", "Student", "Teacher", "Category", "Details"]}
          columnWidths={["10%", "20%", "20%", "10%", "40%"]}
          rootAddress="/logs/" />
        </div> : null
      }
      </div>
    );
  }
}

StudentProfile.contextType = Context;
export default StudentProfile;