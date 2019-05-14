import React, {Component} from 'react';
import '../css/index.css'
import {Link} from 'react-router-dom';
import{Context} from '../Store'
import '../css/AccountPage.css';
import Constants from '../Constants'
import { Auth } from 'aws-amplify';
import {Redirect} from 'react-router-dom';
import { withRouter } from "react-router";

class AccountPage extends Component{
  constructor(props){
    super(props)
    this.saveData = this.saveData.bind(this)
    this.onChange = this.onChange.bind(this)
    this.deleteTeacher = this.deleteTeacher.bind(this)
    this.dropdownClick = this.dropdownClick.bind(this)
    this.setRole = this.setRole.bind(this)
    this.hideDropdown = this.hideDropdown.bind(this)
      
    this.state = {
        roles: ["admin", "teacher"],
        dropdownOpen: false,
        teacherID: 0,
        role: "",
        firstName: "",
        lastName: "",
        nickName: "",
        hasChanged: false,
        pass: "",
        email: "",
        changed: false
    }
  }
     componentDidMount(){
       if (this.props.match.params.id !== "new" && this.props.pageId != null) {
      this.context.setContentLoading(true)
      fetch(Constants.apiUrl + "teachers?teacherID=" + this.props.pageId)
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
    
  saveData(user, pass, email){
     /* console.log(this.context.teachers);
        for (let teacher of this.context.teachers){
        if(teacher.teacherID == user){
            alert("no");
        }
    }*/
    /*Create new User Account in Database*/
    var body = "";
    if(this.props.match.params.id === this.context.currentUser.teacherID || this.props.pageId == null){
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
          method: this.props.match.params.id === "new" ? "new" : "update",
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
        this.context.loadTeachers();
        if(this.props.match.params.id === "new"){
      /*Create new User Account in Cognito*/
        Auth.signUp({
            username: user,
            password: pass,
            attributes: {
                email: email
            },
        })
        .then(data => {
            console.log(data)
            var code = prompt("Please enter the code that was sent to your email:");
            while (code === null || code === "") {
                code = prompt("Please enter the code that was sent to your email:");
            } 
            console.log(code);

            Auth.confirmSignUp(user, code, {
                // Optional. Force user confirmation irrespective of existing alias. By default set to True.
                forceAliasCreation: true    
            }).then(data => {
                if(data === "SUCCESS"){
                    this.context.setToast({message: "You have successfully created a teacher!", color: "green", visible: true}, 3000);
                    this.setState({
                        teacherID: 0,
                        role: "",
                        firstName: "",
                        lastName: "",
                        nickName: "",
                        hasChanged: false,
                        pass: "",
                        email: "",
                        changed: true
                    })            
                }
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
        } /*end if*/
    })
    .catch(error => console.log(error))
  }
    setRole(e){
        var newRole = this.state.roles[e.target.value]
        this.setState({role: newRole, hasChanged: true})
    }
    dropdownClick(){
        var o = !this.state.dropdownOpen
        this.setState({dropdownOpen: o})
    }
     hideDropdown(){
    if(this.state.dropdownOpen)
    this.setState({dropdownOpen: false})
  }
  deleteTeacher(){
      if(window.confirm("Are you sure you want to delete?")){
          var body = {
              method: "delete",
              teacherID: this.state.teacherID
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
          /*this.context.teachers[body.teacherID] = body*/
          /*this.context.setTeachers(this.context.teachers)*/

          this.context.setToast({message: "Deleted!", color: "green", visible: true})
            this.setState({
                changed: true
            })
         })
        .catch(error => console.log(error))
      }
  }
    
  render(){
      var validEntry = (this.context.currentUser.teacherID !== "" && this.context.currentUser.role !== "" 
      && this.context.currentUser.status !== "" && this.context.currentUser.firstName !== "" 
      && this.context.currentUser.lastName !== "" && this.context.currentUser.nickName !== "")
    /*View Current User*/
      if(this.props.match.params.id === this.context.currentUser.teacherID || !this.props.match.params.id){
        return (
          <div className = "account-page content-page">        
            <div className="button-group">
                <Link className="account-page-link" to={"/changepass"}>Change Password</Link>        
                
                <Link className="account-page-link" to={"/changeemail"}>Change Email</Link>
                
                <button className={this.props.match.params.id !== "new" ? (this.context.currentUser.hasChanged ? "enabled" : "disabled") : 
                    (validEntry ? "enabled" : "disabled")} type="button" onClick={() => this.saveData(this.state.teacherID, this.state.pass, this.state.email)}>Save</button>
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
        if(this.state.changed === true){
            this.setState({changed:false});
            return <Redirect to='/adminpanel' />
        }
        return(
            <div className = "account-page content-page" onClick={this.hideDropdown}>        
                 <div className="button-group">
                    {this.props.match.params.id !== "new" ? <button className="enabled" onClick ={this.deleteTeacher}>
                        Delete Teacher
                    </button> : null}

                    <button className={this.props.match.params.id !== "new" ? (this.state.hasChanged ? "enabled" : "disabled") : 
                    (validEntry ? "enabled" : "disabled")} type="button" onClick={() => this.saveData(this.state.teacherID, this.state.pass, this.state.email)}>Save</button>
                </div>
                {this.props.match.params.id === "new" ?<h2 className="name">Create New Teacher </h2> : <h2 className="name">{this.state.lastName + ", " + this.state.firstName}</h2>}
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

              <label htmlFor="role">Role:</label><input type="text" placeholder="Role" size ="32"  name="role" id="role" value={this.state.role}  onClick={this.dropdownClick} autoComplete="off"/>
              {this.state.dropdownOpen && (
                  <div className="activity-menu">
                    <ul className="possible-values">
                      {this.state.roles.map((role, index) => 
                        <li key={index} value={index} onClick={this.setRole} >{role}</li>
                      )}
                    </ul>
                  </div>
                )} 


                {this.props.match.params.id === "new" ?
                <div>
                <br/>
                <h3> User Attributes </h3>
                <label>Email Address:</label>
                <input type="text" placeholder="Email" size ="32"  name="email" id="email" value={this.state.email} onChange={this.onChange} autoComplete="off"/>
                <br/>
                
                <label>Temporary Password:</label>
                <input type="text" placeholder="Password" size ="32"  name="pass" id="pass" value={this.state.pass} onChange={this.onChange} autoComplete="off"/>
                <br/></div> : null}
            </div>
        )
    }
   }
  }

const WrappedClass =withRouter(AccountPage);
WrappedClass.WrappedComponent.contextType = Context;
export default WrappedClass;
