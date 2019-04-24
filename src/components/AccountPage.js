import React, {Component} from 'react';
import '../css/index.css'
import {Link} from 'react-router-dom';
import{Context} from '../Store'
import '../css/AccountPage.css';


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

    componentDidMount(){
        if (this.context.pageId != "new") {
            this.context.setContentLoading(true)
            this.setState({firstName: "Gilbert",
              lastName: "Phillips",
              email: "philgil@hotmail.com",
              editable: true})
            this.context.setContentLoading(false)
        } else {
            this.setState({
              editable: true})
          }
    }

    onChange(e) {
        if (this.state.editable)
          this.setState({[e.target.id]: e.target.value, hasChanged: true});
     }

    render(){
      return (
        <div className = "account-page content-page">
          <div className="button-group">
            {this.context.pageId != "new" ?
                  <Link className="account-page-link" to={"/changepass"}>Change Password</Link>
                  : null }
            <button className={this.state.hasChanged ? "enabled" : "disabled"} type="button" onClick={this.saveData}>Save</button>
          </div>
          <h2 className="name">{this.context.currentUser.lastName ? `${this.context.currentUser.lastName}, ${this.context.currentUser.firstName}` : "Last Name, First Name"}</h2>
          <br/>
          <label htmlFor="lname">Name:</label> <input type="text" placeholder="Last Name" size ="32"  name="lastName" id="lastName" value={this.context.currentUser.lastName} onChange={this.context.onChangeUserData} autoComplete="off"/>
          <input type="text" placeholder="First Name" size ="32" name="firstName" id="firstName" value={this.context.currentUser.firstName} onChange={this.context.onChangeUserData} autoComplete="off"/>
          <br/>
        {/* <label htmlFor="email">email address:</label> <input type="text" placeholder="email address" size ="32"  name="email" id="email" value={this.state.email} onChange={this.onChange} autoComplete="off"/>*/}
          <p>Email Address: {this.context.currentUser.email}</p>
          <p>Admin: {this.context.currentUser.role === "admin" ? "Yes" : "No"}</p>
        </div>
      )
    }
  }

AccountPage.contextType = Context
export default AccountPage
