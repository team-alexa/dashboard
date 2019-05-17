import React, { Component } from 'react';
import '../css/index.css';
import '../css/StudentProfile.css';
import { Context } from '../Store'
import Constants from '../Constants'
import Table from './Table';
import SearchableInput from './SearchableInput'
import DailyReport from './DailyReport';
import { withRouter } from "react-router";
class StudentProfile extends Component{
  constructor(props){
    super(props)

    this.onChange = this.onChange.bind(this)
    this.saveData = this.saveData.bind(this)
    this.getStudentTeacher = this.getStudentTeacher.bind(this)
    this.addTeacher = this.addTeacher.bind(this)
    this.toggleDailyReport = this.toggleDailyReport.bind(this)
    this.currentDate = this.currentDate.bind(this);
    this.getDailyLogs = this.getDailyLogs.bind(this);
    this.showDailyLogsButton = this.showDailyLogsButton.bind(this);
    this.setDailyLogs = this.setDailyLogs.bind(this);
    this.loadMoreLogs = this.loadMoreLogs.bind(this);
    this.toggleStatus = this.toggleStatus.bind(this);
    this.navigateTo=this.navigateTo.bind(this);
    this.getAllTeachers=this.getAllTeachers.bind(this);
    this.state = {
      birthDate: "",
      firstName: "",
      foodAllergies: "",
      lastName: "",
      medical: "",
      nickName: "",
      status: "active",
      studentID: "",
      teacherID: "",
      teachers: [],
      hasChanged: false,
      editable: false,
      date: "",
      month: "",
      year: "",
      showDailyReport: false,
      dailyLogs:[],
      logs: [],
      reportDate:new Date().toISOString().substr(0, 10)
    }

    this.displayedMessage = false
  }

  componentDidMount() {
    if (this.props.match.params.id !== "new") {
      this.context.setContentLoading(true)
      fetch(Constants.apiUrl + "students?studentID=" + this.props.match.params.id)
        .then(response => response.json())
        .then(data => {
          if (data[0]) {
            if (!data[0].nickName) {
              data[0].nickName = data[0].firstName
            }
            const birthDate = new Date(data[0].birthDate)
            const newState = data[0]
            newState.birthDate = birthDate.toISOString().substr(0, 10)
            newState.editable = true

            Object.keys(newState).forEach(key => {
              newState[key] = newState[key] ? newState[key] : ""
            })

            this.setState(newState)
          } else {
            if (!this.displayedMessage) {
              this.context.setToast({message: "No Student Found", color: "red", visible: true}, 10000)
            }
          }
          this.context.setContentLoading(false)
        })
    } else {
      this.setState({editable: true})
    }
    this.loadMoreLogs()
  }
  toggleDailyReport() {
    this.setState({
      showDailyReport: !this.state.showDailyReport
    });
     }
  saveData() {
    const dte = new Date(this.state.birthDate)
    const dteStr = dte.getUTCFullYear() + "-" + (dte.getUTCMonth() + 1) + "-" + dte.getUTCDate()
    const body = {
      method: this.props.match.params.id === "new" ? "new" : "update",
      studentID: this.state.studentID,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      birthDate: dteStr,
      foodAllergies: this.state.foodAllergies,
      medical: this.state.medical,
      teacherID: this.state.teacherID,
      nickName: this.state.nickName
    }

    fetch(Constants.apiUrl + 'students', {
      method: "POST",
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then((data) => {
      if (data.errno) {
        this.context.setToast({message: "There was an error.", color: "red", visible: true})
      } else {
        delete body.method
        var tempStudents=this.context.students;
        body.status="active"
        tempStudents[body.studentID] = body
        this.context.setStudents(tempStudents)
        var tempStudentsCurrentUser=this.context.currentUser.students
      Object.keys(tempStudentsCurrentUser).map(student => {
       if (student.studentID===body.studentID){
        student.status="active"
        this.context.setCurrentStudents(tempStudentsCurrentUser)
       }
      })
        this.context.setToast({message: "Saved!", color: "green", visible: true})
      }
    })
  }


  getStudentTeacher() {
    return this.context.teachers[this.state.teacherID] ? {
      value: this.context.teachers[this.state.teacherID].fullName,
      id: this.context.teachers[this.state.teacherID].teacherID,
      onClick: () => this.navigateTo("/account/" + this.context.teachers[this.state.teacherID].teacherID)
     } : null
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

  onChange(e) {
    if (this.state.editable)
      this.setState({[e.target.id]: e.target.value, hasChanged: true});
  }

  addTeacher(teacher) {
    this.setState({teacherID: teacher.id})
  }

  getDailyLogs(){
    fetch(Constants.apiUrl + "logs?studentID=" + this.state.studentID+"&date="+this.currentDate(this.state.reportDate))
        .then(response => response.json())
        .then(data => {
          if (data[0]) {
            this.setDailyLogs(data)
          } else {
              this.context.setToast({message: "No logs found for this student today", color: "red", visible: true}, 2500)
          }
        })
  }

  setDailyLogs(dailyLogs) {
    this.setState({dailyLogs})
  }

  showDailyLogsButton(){
    this.getDailyLogs();
    this.toggleDailyReport();
  }

  currentDate(selectedDate){
    var formattedDate = new Date(selectedDate);
    var day = formattedDate.getDate()+1;
    var month = formattedDate.getMonth() + 1; //Month from 0 to 11
    var year = formattedDate.getFullYear();
    return `${(month<=9 ? '0' + month : month)}-${(day <= 9 ? '0' + day : day)}-${year}`;
  }

  loadMoreLogs() {
    this.context.setContentLoading(true)
    var url = Constants.apiUrl + 'logs?index=' + this.state.logs.length
    url += '&studentID=' + this.props.match.params.id
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const logs = this.state.logs.slice()
        this.setState({logs: logs.concat(data)})
        this.context.setContentLoading(false)
        if (this.state.logs.length){
          if (this.state.logs[0].date)
            this.setState({reportDate:new Date(this.state.logs[0].date).toISOString().substr(0, 10)})  
        }
      })
  }

  getLogTableData() {
    const logs = this.state.logs
    return logs.map(log => {
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

  toggleStatus() {
    const body = {
      method: "update",
      studentID: this.state.studentID,
      status: this.state.status==='active'?'inactive':'active'
    }

    fetch(Constants.apiUrl + 'students', {
      method: "POST",
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(() => {
      var tempStudents=this.context.students;
      tempStudents[body.studentID].status = body.status
      this.context.setStudents(tempStudents)
      var tempStudentsCurrentUser=this.context.currentUser.students
      tempStudentsCurrentUser.map(student => {
       if (student.studentID===body.studentID){
        student.status=body.status
       }
      })
      this.context.setCurrentStudents(tempStudentsCurrentUser)
      this.context.setToast({color: "green", message: "Success!", visible: true}, 3000)
      this.navigateTo("../students")
    })
  }
  navigateTo(path) {
    this.props.history.push({pathname: path})
  }
  render() {
    var teacher = this.getStudentTeacher()
    return (
      <div className="student-profile content-page" >
        <h2 className="name">{this.state.lastName ? `${this.state.lastName}, ${this.state.firstName}` : "Last Name, First Name"}</h2>
        <br/>
        <label htmlFor="lname">Name:</label><input type="text" placeholder="Last Name" size ="32"  name="lastName" id="lastName" value={this.state.lastName} onChange={this.onChange} autoComplete="off"/>
        <input type="text" placeholder="First Name" size ="32" name="firstName" id="firstName" value={this.state.firstName} onChange={this.onChange} autoComplete="off"/>
        <br/>
        <label htmlFor="nickname">Nickname:</label><input type="text" placeholder="Nickname" size="25" name="nickName" id="nickName" value={this.state.nickName} onChange={this.onChange} autoComplete="off"/>
        <br />
        {this.props.match.params.id === "new" ? <div><label htmlFor="id">ID:</label><input type="text" size = "10" name="studentID" id="studentID" placeholder="Student ID" value={this.state.studentID} onChange={this.onChange} autoComplete="off"/>
        <br/> </div>: <p>ID Number: {this.state.studentID}</p>}
        <p>Age: {parseInt(new Date().getFullYear()) - parseInt(new Date(this.state.birthDate).getFullYear())} </p>
        <label htmlFor="month">DOB :</label>
        <input type="date" id="birthDate" value={this.state.birthDate} onChange={this.onChange} autoComplete="off" />
        <br/>
        <label htmlFor="food">Food Allergies (comma-separated):</label><input type="text" size = "64" id="foodAllergies" value={this.state.foodAllergies} onChange={this.onChange} autoComplete="off" />
        <br/>
        <label htmlFor="medical">Medical Conditions (comma-separated):</label><input type="text" size = "64" id="medical" value={this.state.medical} onChange={this.onChange} autoComplete="off" />
        <br/>
        <SearchableInput
          placeholder="Teacher"
          label="Teacher: "
          limit={1}
          values={teacher ? [teacher] : null}
          possibleValues={this.getAllTeachers()}
          onClick={() => this.setState({hasChanged: true})}
          addValue={this.addTeacher}/>
          <br/>
      {this.props.match.params.id !== "new" ? <div>
        <input type="date" id="reportDate" value={this.state.reportDate} onChange={this.onChange} autoComplete="off" />
        <button className={"report-button "+(this.state.logs.length ? "enabled" : "disabled")} type="button" onClick={this.showDailyLogsButton}>Generate Report</button>
      </div> : null}
      <div className="button-group">
        {this.props.match.params.id !== "new" ?
          <button type="button" className = "log-button enabled" onClick={() => this.navigateTo("/logs/new")}>
            <div className="text">New Log</div>
          </button> : null }
        <button className={this.state.hasChanged ? "enabled" : "disabled"} type="button" onClick={this.state.hasChanged ? this.saveData: null}>Save</button>
        {this.props.match.params.id !== "new" ?
          <button className="log-button enabled" type="button" onClick={this.toggleStatus}>Set {this.state.status === "active" ? "Inactive" : "Active"}</button> : null}
      </div>
      {this.props.match.params.id !== "new" ? <div>
        <h2>{this.state.fullName ? `${this.state.fullName}'s Logs` : "Logs"}</h2>
        <Table data={this.getLogTableData()}
          height="40vh"
          width="100%"
          headers={["Date", "Student", "Teacher", "Category", "Details"]}
          columnWidths={["10%", "20%", "20%", "10%", "40%"]}
          rootAddress="/logs/"
          loadFunction = {this.loadMoreLogs} />
        </div> : null
      }
      {this.state.showDailyReport && this.state.dailyLogs.length!==0?
         <DailyReport
         close={this.toggleDailyReport.bind(this)}
         firstName={this.state.firstName}
         lastName={this.state.lastName}
         date={this.state.reportDate}
         dailyLogs={this.state.dailyLogs}
         />: null
       }
      </div>
    );
  }
}
const WrappedClass =withRouter(StudentProfile);
WrappedClass.WrappedComponent.contextType = Context;
export default WrappedClass;
