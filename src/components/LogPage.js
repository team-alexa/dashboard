import React, {Component} from 'react';
import '../css/index.css'
import{Context} from '../Store'
import Constants from '../Constants'

class LogPage extends Component{
  constructor(props){
    super(props)
 
    this.onChange = this.onChange.bind(this)
  
    this.state = {
      studentName: "",
      teacherName: "",
      activity: "",
      activityDetails: "",
      timeLogged: "",
      dateLogged: "",
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
          const newState = data[0]
          newState.editable = true
          this.setState(newState)
        } else {
          if (!this.displayedMessage) {
            this.context.setToast({message: "No Log Found", color: "red", visible: true}, 10000)
          }
        }


      // this.setState({studentName: "Cameron Frank",
      //   teacherName: "Nathan Irwin",
      //   activity: "sleeping",
      //   activityDetails: "1 hour",
      //   timeLogged: "2:00 pm",
      //   dateLogged: "3/23/19",
      //   editable: true})
      this.context.setContentLoading(false)
      })
    } else {
      this.setState({editable: true})
    }
  }
  onChange(e) {
    if (this.state.editable)
      this.setState({[e.target.id]: e.target.value, hasChanged: true});
    }

    render(){
      return (
        <div className = "log-page content-page">
          <div className="button-group">
            {this.context.pageId != "new" ?
              <button type="button" className = "delete-log-button enabled">
                <div className="text">Delete Log</div>
              </button> : null }
            <button className={this.state.hasChanged ? "enabled" : "disabled"} type="button" onClick={this.saveData}>Save</button> 
          </div>
          <label htmlFor="sname">Student's Name:</label> <input type="text" placeholder="Student's Name" size ="32"  name="studentName" id="studentName" value={this.state.studentName} onChange={this.onChange} autoComplete="off"/>
          <br/>
          <label htmlFor="tname">Teachers's Name:</label> <input type="text" placeholder="Teacher's Name" size ="32" name="teacherName" id="teacherName" value={this.state.teacherName} onChange={this.onChange} autoComplete="off"/>
          <br/>
          <label htmlFor="activity">Activity:</label> <input type="text" placeholder="Activity" size ="32"  name="activity" id="activity" value={this.state.activity} onChange={this.onChange} autoComplete="off"/>
          <br/>
          <label htmlFor="time">Time:</label> <input type="text" placeholder="Time" size ="32"  name="timeLogged" id="timeLogged" value={this.state.timeLogged} onChange={this.onChange} autoComplete="off"/>
          <br/>
          <label htmlFor="date">Date (MM/DD/YYYY):</label> <input type="text" placeholder="Date" size ="32"  name="dateLogged" id="dateLogged" value={this.state.dateLogged} onChange={this.onChange} autoComplete="off"/>
          <br/>
        </div>
        )
    }


}

LogPage.contextType = Context
export default LogPage