import React, { Component } from 'react';
import '../css/StudentProfile.css';
import {DataConsumer} from '../Store'
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
        teachers: []
      }
    }

    componentDidMount() {
      fetch(Constants.apiUrl + "students?studentID=" + this.props.id)
        .then(response => response.json())
        .then(data => {
          if (data[0]) {
            if (!data[0].nickName) data[0].nickName = data[0].firstName
            this.setState(data[0])
          }
        })

      fetch(Constants.apiUrl + "teachers")
        .then(response => response.json())
        .then(data => {
          this.setState({teachers: data})
        })
    }

    getStudentTeacherName() {
      var teacher = this.state.teachers.filter(teacher => {
        return teacher.teacherID == this.state.teacherID
      })

      return teacher[0] ? teacher[0].fullName : null
    }

    getAllTeacherNames() {
      return this.state.teachers.map(teacher => teacher.fullName)
    }

    onChange(e) {
      this.setState({[e.target.id]: e.target.value});
    }
    
    render() {
      var birthDate = new Date(this.state.birthDate)
      var teacherName = this.getStudentTeacherName()
        return (
          <DataConsumer>
            {store =>
                <div className="student-profile content-page" >
                <div className="button-group">
                  <button type="button" className = "logButton">
                    <div className="text">New Log</div>
                  </button> 
                  <button type="button">Save</button> 
                </div>
                <h2 className="name">{this.state.lastName ? `${this.state.lastName}, ${this.state.firstName}` : "Last Name, First Name"}</h2>
                <br/>
                <label htmlFor="lname">Name:</label> <input type="text" placeholder="Last Name" size ="32"  name="lastName" id="lastName" value={this.state.lastName} onChange={this.onChange}/>
                <input type="text" placeholder="First Name" size ="32" name="firstName" id="firstName" value={this.state.firstName} onChange={this.onChange}/>
                <br/>
                <label htmlFor="nickname">Nickname:</label> <input type="text" placeholder="Nickname" size="25" name="nickName" id="nickName" value={this.state.nickName} onChange={this.onChange}/>
                <br />
                <label htmlFor="id">ID:</label> <input type="text" size = "10" name="id" id="id" value={store.pageId} onChange={this.onChange}/>
                <br/>
                <p>Age: 2 </p>
                <label htmlFor="month">DOB (MM/DD/YYYY):</label> <input type="text" size = "2" maxLength="2" placeholder ="01" name="month" id="month" value={birthDate.getMonth() || ""} />
                /<input type="text" size = "2" maxLength="2" placeholder ="01" name="day" value={birthDate.getDate() || ""} />
                /<input type="text" size = "4" maxLength="4" placeholder ="2017" name="year" value={birthDate.getFullYear() || ""} />
                <br/>
                <label htmlFor="food">Food Allergies (comma-separated):</label> <input type="text" size = "64" id="foodAllergies" value={this.state.foodAllergies} onChange={this.onChange}/>
                <br/>
                <label htmlFor="medical">Medical Conditions (comma-separated):</label> <input type="text" size = "64" id="medical" value={this.state.medical} onChange={this.onChange}/>
                <br/>
                <SearchableInput
                  placeholder="Teacher"
                  label="Teacher: "
                  limit={1}
                  values={teacherName ? [teacherName] : null}
                  possibleValues={this.getAllTeacherNames()}
                  onClick={this.loadTeachers}/>
                <br/>
                <h2>Logs</h2>
                <Table data={singleStudentTableData}
                  width="100%"
                  height="400px"
                  headers={["Date", "Student", "Teacher", "Category", "Details"]}
                  columnWidths={["10%", "20%", "20%", "10%", "40%"]}
                  rootAddress="/logs/" />
              </div>
              }
          </DataConsumer>
        );
      }



}

export default StudentProfile