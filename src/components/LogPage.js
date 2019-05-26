import React, {Component} from 'react';
import '../css/index.css'
import'../css/LogPage.css'
import{Context} from '../Store'
import Constants from '../Constants'
import SearchableInput from './SearchableInput'
import { withRouter } from "react-router";

class LogPage extends Component{
  constructor(props){
    super(props)
 
    this.onChange = this.onChange.bind(this)
    this.saveData = this.saveData.bind(this)
    this.addStudent = this.addStudent.bind(this)
    this.addTeacher = this.addTeacher.bind(this)
    this.getAllTeachers = this.getAllTeachers.bind(this)
    this.getAllStudents = this.getAllStudents.bind(this)
    this.dropdownClick = this.dropdownClick.bind(this)
    this.setActivity = this.setActivity.bind(this)
    this.hideDropdown = this.hideDropdown.bind(this)
    this.delete = this.delete.bind(this)
    this.navigateTo=this.navigateTo.bind(this);
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
       if (this.props.match.params.id !== "new") {
      this.context.setContentLoading(true)
      fetch(Constants.apiUrl + "logs?logID=" + this.props.match.params.id)
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
  }
  onChange(e) {
    if (this.state.editable)
      this.setState({[e.target.id]: e.target.value, hasChanged: true})
    }
  saveData(){      
        var d = this.state.initDate
        if(this.state.dateString.length === 10)
          d = this.state.dateString
        else
          this.context.setToast({message: "Invalid Date Format", color: "red", visible: true}, 3000)
        var t = this.state.initTime
        if(this.state.timeString.length === 5)
          t = this.state.timeString
        else
          this.context.setToast({message: "Invalid Time Format", color: "red", visible: true}, 3000)
      const body ={
        method: this.props.match.params.id === "new" ? "new" : "update",
        logID: this.props.match.params.id === "new" ? undefined : this.props.match.params.id,
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
      .then((response) => {
        if(!response.errno){
        delete body.method
        if (this.props.match.params.id === "new") {
          const teacher = this.context.teachers[this.state.teacherID]
          const student = this.context.students[this.state.studentID]
          body.teacherFullName = teacher.fullName
          body.studentFullName = student.fullName
          body.logID=response.insertId
          var tempLogs=this.context.logs;
          tempLogs.unshift(body);
          this.context.setLogs(tempLogs)
        }
        else{
          const teacher = this.context.teachers[this.state.teacherID]
          const student = this.context.students[this.state.studentID]
          body.teacherFullName = teacher.fullName
          body.studentFullName = student.fullName
          body.logID=this.state.logID
          var tempLogs=this.context.logs;
          tempLogs[tempLogs.map(function(x) {return x.logID; }).indexOf(this.state.logID)]=body;
          this.context.setLogs(tempLogs)
        }
        this.context.setLogs(this.context.logs)
        this.context.setToast({message: "Saved!", color: "green", visible: true})
      }
      else{
        this.context.setToast({message: "There was an Error!", color: "red", visible: true})
      }
      })
  }
  getAllTeachers() {
    return Object.keys(this.context.teachers).map(key => {
      const teacher = this.context.teachers[key]
      return {
        value: teacher.fullName,
        id: teacher.teacherID,
        onClick: () => this.navigateTo("/account/" + teacher.teacherID)
      }
    })
  }
  getAllStudents(){
    return Object.keys(this.context.students).map(key => {
      const student = this.context.students[key]
      return {
        value: student.fullName,
        id: student.studentID,
        onClick: () => this.navigateTo("/students/" + student.studentID)
      }
    })
  }
  addTeacher(teacher) {
    this.setState({teacherID: teacher.id})
  }
  addStudent(student){
    this.setState({studentID: student.id})
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
  delete() {
    const body = {
      method: "delete",
      logID: this.state.logID
    }

    fetch(Constants.apiUrl + 'logs', {
      method: "POST",
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then((response) => {
      this.context.setToast({color: "green", message: "Successfully deleted log.", visible: true}, 3000)
      this.context.removeLog(this.state.logID)
      this.navigateTo("../logs")
    })
  }
  navigateTo(path) {
    this.props.history.push({pathname: path})
  }
    render(){   
      var teacher = this.context.teachers[this.state.teacherID] ? {
        value: this.context.teachers[this.state.teacherID].fullName,
        id: this.context.teachers[this.state.teacherID].teacherID,
        onClick: () => this.navigateTo("/account/" + this.context.teachers[this.state.teacherID].teacherID)
       } : null
      var student = this.context.students[this.state.studentID] ? {
        value: this.context.students[this.state.studentID].fullName,
        id: this.context.students[this.state.studentID].studentID,
        onClick: () => this.navigateTo("/students/" + this.context.students[this.state.studentID].studentID)
       } : null
      var validEntry = (this.state.studentID !== "" && this.state.teacherID !== "" 
      && this.state.activityType !== "" && this.state.dateString !== "" 
      && this.state.timeString !== "")
      return (
        <div className = "log-page content-page" onClick={this.hideDropdown}>
          <h2 className="name">Log {this.props.match.params.id}</h2>
          <SearchableInput
            placeholder="Student"
            label="Student: "
            limit={1}
            values= {student ? [student] : null}
            possibleValues={this.getAllStudents()}
            onClick={() => this.setState({hasChanged: true})}
            addValue={this.addStudent}/>
          <SearchableInput
            placeholder="Teacher"
            label="Teacher: "
            limit={1}
            values= {teacher ? [teacher] : null}
            possibleValues={this.getAllTeachers()}
            onClick={() => this.setState({hasChanged: true})}
            addValue={this.addTeacher}/>
         
          <label htmlFor="activityType">Activity:</label><input type="text" placeholder="Activity" size ="32"  name="activityType" id="activityType" value={this.state.activityType} onChange={this.onChange} onClick={this.dropdownClick} autoComplete="off"/>
          {this.state.dropdownOpen && (
              <div className="activity-menu">
                <ul className="possible-values">
                  {this.state.activityTypes.map((activity, index) => 
                    <li key={index} value={index} onClick={this.setActivity} >{activity}</li>
                  )}
                </ul>
              </div>
            )} 
          <br/>  
          <label htmlFor="activityDetails">Activity Details:</label><input type="text" placeholder="Activity Details" size ="64"  name="activityDetails" id="activityDetails" value={this.state.activityDetails} onChange={this.onChange} autoComplete="off"/>
          <br/>
          <label htmlFor="time">Time:</label><input type="time" size ="32"  name="time" id="timeString" value={this.state.timeString} onChange={this.onChange} autoComplete="off"/>
          <br/>
          <label htmlFor="date">Date:</label><input type="date" name="date" id="dateString" value={this.state.dateString} onChange={this.onChange} autoComplete="off" />         
      <br/>
      <div className="button-group">
            {this.props.match.params.id !== "new" ?
              <button type="button" className="delete-log-button enabled" onClick={this.delete} style={{borderColor: "red", color: "red", backgroundColor: "transparent"}}>
                <div className="text">Delete</div>
              </button> : null }
            <button className={this.props.match.params.id !== "new" ? (this.state.hasChanged ? "enabled" : "disabled") : 
            (validEntry ? "enabled" : "disabled")} type="button" onClick={this.state.hasChanged ? this.saveData: null}>Save</button> 
          </div>
          <br/>
        </div>
        )
    }
}
const WrappedClass =withRouter(LogPage);
WrappedClass.WrappedComponent.contextType = Context;
export default WrappedClass;
