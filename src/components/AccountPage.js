import React, {Component} from 'react';
import '../css/index.css'
import{ Context } from '../Store'
import Constants from '../Constants'
import { Auth } from 'aws-amplify';


class AccountPage extends Component{
  constructor(props){
    super(props)

    this.onChange = this.onChange.bind(this)

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
/* I think this fails because componentDidMount() is called before the call to loadUserData() in dashboard.js 
          can complete. Check console logs after a refresh. 
          Console.log() call in Store.js doesn't execute until after all print statements in componentDidMount() */
  componentDidMount(){
    if (this.context.pageId != "new") {
      this.context.setContentLoading(true)
        // Auth.currentAuthenticatedUser()                                tried reloading the currentUser here, 
        // .then(user => this.context.loadUserData(user))                         no dice.
        console.log("teacherID = "  + this.context.currentUser.teacherID)
        fetch(Constants.apiUrl + "teachers?teacherID=" + this.context.currentUser.teacherID)
        .then(response => response.json())
        .then(data => {
          if (data[0]) {
            const newState = data[0]                          
            newState.firstName = data[0].firstName
            newState.lastName = data[0].lastName
            newState.nickName = data[0].nickName
            newState.status = data[0].status
            console.log(this.context.currentUser)
            newState.email =this.context.currentUser.attributes.email
            newState.role = data[0].role
            newState.hasChanged = false
            newState.editable = true
            if(newState.role === "admin"){
              newState.admin = true
            }
            else{
              newState.admin = false
            }
            this.setState(newState)
          }


          /* I tried skipping the api call in componentDidMount() and setting the data as shown below.
         
          
            const newState = this.context.currentUser
            newState.firstName = this.context.currentUser.firstName
            newState.lastName = this.context.currentUser.lastName
            newState.nickName = this.context.currentUser.nickName
            newState.status = this.context.currentUser.status
            console.log(this.context.currentUser)
            newState.email =this.context.currentUser.attributes.email
            newState.role = this.context.currentUser.role
            newState.hasChanged = false
            newState.editable = true
            if(newState.role === "admin"){
              newState.admin = true
            }
            else{
              newState.admin = false
            }
            this.setState(newState)          
          */
          else {
            console.log(this.context.currentUser)
          if (!this.displayedMessage) {
            this.context.setToast({message: "No Account Found", color: "red", visible: true}, 10000)
          }
        }
        this.context.setContentLoading(false)
      })
    }
    else {
      this.setState({editable: true})
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
                <button type="button" className = "change-password-button enabled">
                  <div className="text">Change Password</div>
                </button> : null }
              <button className={this.state.hasChanged ? "enabled" : "disabled"} type="button" onClick={this.saveData}>Save</button> 
            </div>
            <h2 className="name">{this.state.lastName ? `${this.state.lastName}, ${this.state.firstName}` : "Last Name, First Name"}</h2>
            <br/>
            <label htmlFor="lname">Name:</label> <input type="text" placeholder="Last Name" size ="32"  name="lastName" id="lastName" value={this.state.lastName} onChange={this.onChange} autoComplete="off"/>
            <input type="text" placeholder="First Name" size ="32" name="firstName" id="firstName" value={this.state.firstName} onChange={this.onChange} autoComplete="off"/>
            <br/>
           {/* <label htmlFor="email">email address:</label> <input type="text" placeholder="email address" size ="32"  name="email" id="email" value={this.state.email} onChange={this.onChange} autoComplete="off"/>*/}
            <p>Email Address: {this.state.email}</p>
            <p>Admin: {this.state.admin? "Yes" : "No"}</p>
          </div>
        )
    }

   
}

AccountPage.contextType = Context
export default AccountPage