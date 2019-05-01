import React, {Component} from 'react';
import '../css/index.css'
import{ Context } from '../Store'
import Constants from '../Constants'
import {Link} from 'react-router-dom';

class AccountPage extends Component{
  constructor(props){
    super(props)
    this.saveData = this.saveData.bind(this)
  }
  saveData(){
    const body ={
      method: this.context.pageId == "new" ? "new" : "update",
      teacherID: this.context.currentUser.teacherID,
      role: this.context.currentUser.role,
      status: this.context.currentUser.status,
      firstName: this.context.currentUser.firstName,
      lastName: this.context.currentUser.lastName,
      nickName: this.context.currentUser.nickName 
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
      this.context.setTeachers(this.context.teachers)
      this.context.setToast({message: "Saved!", color: "green", visible: true})
    })
    .catch(error => console.log(error))
  }
  render(){
      var validEntry = (this.context.currentUser.teacherID !== "" && this.context.currentUser.role !== "" 
      && this.context.currentUser.status !== "" && this.context.currentUser.firstName !== "" 
      && this.context.currentUser.lastName !== "" && this.context.currentUser.nickName !== "")
    return (
      <div className = "account-page content-page">        
        <div className="button-group">
          {this.context.pageId != "new" ?
            <button type="button" className = "change-password-button enabled">
              <div className="text">Change Password</div>
            </button> : null }
        {this.context.pageId != "new" ?
                  <button type="button" className = "change-password-button enabled">
        <Link className="account-page-link" to={"/changeemail"}>Change Email</Link></button>
: null }

        <button className={this.context.pageId != "new" ? (this.context.currentUser.hasChanged ? "enabled" : "disabled") : 
            (validEntry ? "enabled" : "disabled")} type="button" onClick={this.saveData}>Save</button>

        
        </div>
        <h2 className="name">{this.context.currentUser.lastName ? `${this.context.currentUser.lastName}, ${this.context.currentUser.firstName}` : "Last Name, First Name"}</h2>
        <br/>
        <label htmlFor="lname">Name:</label> <input type="text" placeholder="Last Name" size ="32"  name="lastName" id="lastName" value={this.context.currentUser.lastName} onChange={this.context.onChangeUserData} autoComplete="off"/>
        <input type="text" placeholder="First Name" size ="32" name="firstName" id="firstName" value={this.context.currentUser.firstName} onChange={this.context.onChangeUserData} autoComplete="off"/>
        <br/>
        <label htmlFor="nickname">Nickname:</label><input type="text" placeholder="Nickname" size ="32"  name="nickName" id="nickName" value={this.context.currentUser.nickName} onChange={this.context.onChangeUserData} autoComplete="off"/>
        <p>Email Address: {this.context.currentUser.email}</p>
        <p>Admin: {this.context.currentUser.role === "admin" ? "Yes" : "No"}</p>
      </div>
    )
    }

   
}

AccountPage.contextType = Context
export default AccountPage