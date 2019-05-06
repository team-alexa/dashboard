import React, {Component} from 'react';
import '../css/index.css'
import {Link} from 'react-router-dom';
import{Context} from '../Store'
import '../css/AccountPage.css';
import Constants from '../Constants'

class AccountPage extends Component{
  constructor(props){
    super(props)
    this.saveData = this.saveData.bind(this)
    this.onChange = this.onChange.bind(this)
      
    this.state = {
        teacherID: 0,
        role: "",
        firstName: "",
        lastName: "",
        nickName: "",
        hasChanged: false,
        pass: ""
    }
  }
     componentDidMount(){
       if (this.context.pageId != "new" && this.context.pageId != null) {
      this.context.setContentLoading(true)
      fetch(Constants.apiUrl + "teachers?teacherID=" + this.context.pageId)
      .then(response => response.json())
      .then(data => {
        if (data[0]) {
          this.setState(data[0])
        } else {
          if (!this.displayedMessage) {
            this.context.setToast({message: "No Teacher Found", color: "red", visible: true}, 10000)
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
      this.setState({[e.target.id]: e.target.value})
        this.setState({hasChanged: true});
    }
  saveData(){
    var body = "";
    if(this.context.pageId == this.context.currentUser.teacherID){
        body ={
          method: "update",
          teacherID: this.context.currentUser.teacherID,
          role: this.context.currentUser.role,
          status: this.context.currentUser.status,
          firstName: this.context.currentUser.firstName,
          lastName: this.context.currentUser.lastName,
          nickName: this.context.currentUser.nickName 
        }
    }
    else{
      body = {
          method: this.context.pageId == "new" ? "new" : "update",
          teacherID: this.state.teacherID,
          role: this.state.role,
          status: "active",
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          nickName: this.state.nickName 
        }  
    }
    
    fetch(Constants.apiUrl + 'teachers', {
      method: "POST",
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(() => {
      delete body.method
      this.context.teachers[body.teacherID] = body
      /*this.context.setTeachers(this.context.teachers)*/
      this.context.setToast({message: "Saved!", color: "green", visible: true})
        /*this.context.loadTeachers()*/
    })
    .catch(error => console.log(error))
  }
  render(){
      var validEntry = (this.context.currentUser.teacherID !== "" && this.context.currentUser.role !== "" 
      && this.context.currentUser.status !== "" && this.context.currentUser.firstName !== "" 
      && this.context.currentUser.lastName !== "" && this.context.currentUser.nickName !== "")
    /*View Current User*/
      if(this.context.pageId == this.context.currentUser.teacherID || this.context.pageId == null){
        return (
          <div className = "account-page content-page">        
            <div className="button-group">
                <Link className="account-page-link" to={"/changepass"}>Change Password</Link>        
                
                <Link className="account-page-link" to={"/changeemail"}>Change Email</Link>
                
                <button className={this.context.pageId != "new" ? (this.context.currentUser.hasChanged ? "enabled" : "disabled") : 
                    (validEntry ? "enabled" : "disabled")} type="button" onClick={this.saveData}>Save</button>
            </div>
            <h2 className="name">{this.context.currentUser.lastName ? `${this.context.currentUser.lastName}, ${this.context.currentUser.firstName}` : "Last Name, First Name"}</h2> 
            
            <br/>

            <label htmlFor="lname">Name:</label>
            <input type="text" placeholder="Last Name" size ="32"  name="lastName" id="lastName" value={this.context.currentUser.lastName} onChange={this.context.onChangeUserData} autoComplete="off"/>

            <input type="text" placeholder="First Name" size ="32" name="firstName" id="firstName" value={this.context.currentUser.firstName} onChange={this.context.onChangeUserData} autoComplete="off"/>
            <br/>

            <label htmlFor="nickname">Nickname:</label>
            <input type="text" placeholder="Nickname" size ="32"  name="nickName" id="nickName" value={this.context.currentUser.nickName} onChange={this.context.onChangeUserData} autoComplete="off"/>

            <p>Email Address: {this.context.currentUser.email}</p>
            <p>Role: {this.context.currentUser.role}</p>
          </div>
        )
    }
    /*View New + Others*/
    else{
        return(
            <div className = "account-page content-page">        
                <div className="button-group">
                    <button className={this.context.pageId != "new" ? (this.state.hasChanged ? "enabled" : "disabled") : 
                    (validEntry ? "enabled" : "disabled")} type="button" onClick={this.saveData}>Save</button>
                </div>
                {this.context.pageId == "new" ?<h2 className="name">Create New Teacher </h2> : <h2 className="name">{this.state.lastName + ", " + this.state.firstName}</h2>}
                <br/>
                
                <label htmlFor="teacherID">ID Number:</label>
                <input type="text" placeholder="ID Number" size ="32"  name="teacherID" id="teacherID" value={this.state.teacherID} onChange={this.onChange} autoComplete="off"/>
                <br/>

                <label htmlFor="lname">Name:</label>
                <input type="text" placeholder="Last Name" size ="32"  name="lastName" id="lastName" value={this.state.lastName} onChange={this.onChange} autoComplete="off"/>

                <input type="text" placeholder="First Name" size ="32" name="firstName" id="firstName" value={this.state.firstName} onChange={this.onChange} autoComplete="off"/>
                <br/>

                <label htmlFor="nickname">Nickname:</label>
                <input type="text" placeholder="Nickname" size ="32"  name="nickName" id="nickName" value={this.state.nickName} onChange={this.onChange} autoComplete="off"/>
                <br/>

                <label htmlFor="role">Role:</label>
                <input type="text" placeholder="Role" size ="32"  name="role" id="role" value={this.state.role} onChange={this.onChange} autoComplete="off"/>

                {this.context.pageId == "new" ?
                <div>
                <br/>
                <h3> User Attributes </h3>
                <label>Email Address:</label>
                <input type="text" placeholder="Email" size ="32"  name="email" id="email" value={this.state.email} autoComplete="off"/>
                <br/>
                
                <label>Temporary Password:</label>
                <input type="text" placeholder="Password" size ="32"  name="password" id="password" value={this.state.pass} autoComplete="off"/>
                <br/></div> : null}
            </div>
        )
    }
   }
  }

AccountPage.contextType = Context
export default AccountPage
