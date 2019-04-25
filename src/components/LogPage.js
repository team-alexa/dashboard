import React, {Component} from 'react';
import '../css/index.css'
import'../css/LogPage.css'
import{Context} from '../Store'
import Constants from '../Constants'
import SearchableInput from './SearchableInput'
import { existsSync } from 'fs';


class LogPage extends Component{
  constructor(props){
    super(props)
 
    this.onChange = this.onChange.bind(this)
    this.saveData = this.saveData.bind(this)
    this.addTeacher = this.addTeacher.bind(this)
    this.getAllTeacherNames = this.getAllTeacherNames.bind(this)
    this.getAllStudentNames = this.getAllStudentNames.bind(this)
    this.dropdownClick = this.dropdownClick.bind(this)
    this.setActivity = this.setActivity.bind(this)
    this.hideDropdown = this.hideDropdown.bind(this)
  
    this.state = {
      activityTypes: ["Food", "Nap", "Diaper", "Injury", "Accomplishment", "Activity", "Needs", "Anecdotal"],
      dropdownOpen: false,
      initDate: "",
      initTime: "",
      dateTime: "",
      studentID: "",
      teacherID: "",
      activityType: "",
      activityDetails: "",
      timeString: "",
      dateString: "",
      editable: false,
      hasChanged: false
    }
    this.displayedMessage = false
  }
  componentDidMount(){
       if (this.context.pageId != "new") {
      this.context.setContentLoading(true)
      fetch(Constants.apiUrl + "logs?logID=" + this.context.pageId)
      .then(response => response.json())
      .then(data => {
        if (data[0]) {
          const fullDate = new Date(data[0].date)
          const newState = data[0]
          newState.activityType = data[0].activityType
          newState.activityDetails = data[0].activityDetails
          newState.date = fullDate
          newState.dateString = fullDate.toISOString().substr(0, 10);
          newState.timeString = fullDate.toUTCString().substr(17).substr(0 ,5);
          newState.initDate = newState.dateString
          newState.initTime = newState.timeString
          newState.dateTime = fullDate
          newState.editable = true          
          this.setState(newState)
        } else {
          if (!this.displayedMessage) {
            this.context.setToast({message: "No Log Found", color: "red", visible: true}, 10000)
          }
        }
      this.context.setContentLoading(false)
      })
    } else {
      this.setState({editable: true})
    }
    this.context.loadTeachers();     
    this.context.loadStudents();
  }
  onChange(e) {
    if (this.state.editable)
      this.setState({[e.target.id]: e.target.value, hasChanged: true})
    }
  saveData(){
        var d = this.state.initDate
        if(this.state.dateString.length == 10)
          d = this.state.dateString
        else
          this.context.setToast({message: "Invalid Date Format", color: "red", visible: true}, 3000)
        var t = this.state.initTime
        if(this.state.timeString.length == 5)
          t = this.state.timeString
        else
          this.context.setToast({message: "Invalid Time Format", color: "red", visible: true}, 3000)
      const body ={
        method: this.context.pageId == "new" ? "new" : "update",
        logID: this.context.pageId,
        studentID: this.state.studentID,
        teacherID: this.state.teacherID,
        activityType: this.state.activityType,
        activityDetails: this.state.activityDetails,
        date: d + "T" + t + ":00Z",
      }
      fetch(Constants.apiUrl + 'logs', {
        method: "POST",
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
      .then(response => response.json())
      .then(() => {
        delete body.method
        this.context.logs[body.logID] = body
        this.context.setLogs(this.context.logs)
        this.context.setToast({message: "Saved!", color: "green", visible: true})
      })
      .catch(error => console.log(error))
  }
  getAllTeacherNames() {
    return Object.keys(this.context.teachers).map(key => this.context.teachers[key].fullName)
  }
  getAllStudentNames(){
    return Object.keys(this.context.students).map(key => this.context.students[key].fullName)
  }
  addTeacher(teacher) {
    var teachers = Object.keys(this.context.teachers).filter(key => {
      return this.context.teachers[key].fullName == teacher
    })
    var id = teachers.length > 0 ? teachers[0] : null
    this.setState({teacherID: id})
  }
  addStudent(student){
    var students = Object.keys(this.context.students).filter(key => {
      return this.context.students[key].fullName == student
    })
    var id = students.length > 0 ? students[0] : null
    this.setState({studentID: id})
  }
  dropdownClick(){
    var o = !this.state.dropdownOpen
    this.setState({dropdownOpen: o})
  }
  hideDropdown(){
    if(this.state.dropdownOpen)
    this.setState({dropdownOpen: false})
  }
  setActivity(e){
    var activity = this.state.activityTypes[e.target.value]
    if (this.state.editable)
    this.setState({activityType: activity, hasChanged: true})
  }
    render(){ //('Food','Nap','Diaper','Injury','Accomplishment','Activity','Needs','Anecdotal')     
      var teacherName = this.state.teacherFullName
      var studentName = this.state.studentFullName
      return (
        <div className = "log-page content-page" onClick={this.hideDropdown}>
          <div className="button-group">
            {this.context.pageId != "new" ?
              <button type="button" className = "delete-log-button enabled">
                <div className="text">Delete Log</div>
              </button> : null }
            <button className={this.state.hasChanged ? "enabled" : "disabled"} type="button" onClick={this.saveData}>Save</button> 
          </div>
          <SearchableInput
            placeholder="Student"
            label="Student: "
            limit={1}
            values= {studentName ? [studentName] : null}
            possibleValues={this.getAllStudentNames()}
            onClick={() => this.setState({hasChanged: true})}
            addValue={this.addStudent}/>
          <br/>
          <SearchableInput
            placeholder="Teacher"
            label="Teacher: "
            limit={1}
            values= {teacherName ? [teacherName] : null}
            possibleValues={this.getAllTeacherNames()}
            onClick={() => this.setState({hasChanged: true})}
            addValue={this.addTeacher}/>
          <br/>
          <label htmlFor="activityType">Activity:</label> <input type="text" placeholder="Activity" size ="32"  name="activityType" id="activityType" value={this.state.activityType}  onClick={this.dropdownClick} autoComplete="off"/>
          {this.state.dropdownOpen && (
              <div className="activity-input">
                <ul className="possible-values">
                  {this.state.activityTypes.map((activity, index) => 
                    <li key={index} value={index} onClick={this.setActivity} >{activity}</li>
                  )}
                </ul>
              </div>
            )} 
          <br/>  
          <label htmlFor="activityDetails">Activity Details:</label> <input type="text" placeholder="Activity Details" size ="64"  name="activityDetails" id="activityDetails" value={this.state.activityDetails} onChange={this.onChange} autoComplete="off"/>
          <br/>
          <label htmlFor="time">Time:</label> <input type="time" size ="32"  name="time" id="timeString" value={this.state.timeString} onfocus="this.value=''" onChange={this.onChange} autoComplete="off"/>
          <br/>
          <label htmlFor="date">Date: </label> <input type="date" name="date" id="dateString" value={this.state.dateString} onChange={this.onChange} autoComplete="off" />         
      <br/>
        </div>
        )
    }
}

LogPage.contextType = Context
export default LogPage