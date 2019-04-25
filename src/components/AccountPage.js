import React, {Component} from 'react';
import '../css/index.css'
import{ Context } from '../Store'
import Constants from '../Constants'
import { Auth } from 'aws-amplify';


class AccountPage extends Component{
  constructor(props){
    super(props)

    this.state = {
      firstName: "",
      lastName: "",
      nickName: "",
      status: "",
      email: "",
      role: "",
      admin: "",
      editable: "",
      hasChanged: ""       
    }
  }

  render(){
    return (
      <div className = "account-page content-page">
        <div className="button-group">
          {this.context.pageId != "new" ?
            <button type="button" className = "change-password-button enabled">
              <div className="text">Change Password</div>
            </button> : null }
          <button className={this.state.hasChanged ? "enabled" : "disabled"} type="button" onClick={this.saveData}>Save</button> 
        </div>
        <h2 className="name">{this.context.currentUser.lastName ? `${this.context.currentUser.lastName}, ${this.context.currentUser.firstName}` : "Last Name, First Name"}</h2>
        <br/>
        <label htmlFor="lname">Name:</label> <input type="text" placeholder="Last Name" size ="32"  name="lastName" id="lastName" value={this.context.currentUser.lastName} onChange={this.context.onChangeUserData} autoComplete="off"/>
        <input type="text" placeholder="First Name" size ="32" name="firstName" id="firstName" value={this.context.currentUser.firstName} onChange={this.context.onChangeUserData} autoComplete="off"/>
        <br/>
        <p>Email Address: {this.context.currentUser.email}</p>
        <p>Admin: {this.context.currentUser.role === "admin" ? "Yes" : "No"}</p>
      </div>
    )
    }

   
}

AccountPage.contextType = Context
export default AccountPage