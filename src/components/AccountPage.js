import React, {Component} from 'react';
import '../css/index.css'
import{Context} from '../Store'
import Constants from '../Constants'


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

  componentDidMount(){
        if (this.context.pageId != "new") {
            this.context.setContentLoading(true)
            fetch(Constants.apiUrl + "Teachers?teacherID=" + this.context.pageId)
      .then(response => response.json())
      .then(data => {
        if (data[0]) {
          const newState = data[0]
          newState.firstName = data[0].firstName
          newState.lastName = data[0].firstName
          newState.nickName = data[0].nickName
          newState.status = data[0].status
          newState.email = data[0].email
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
          } else {
          if (!this.displayedMessage) {
            this.context.setToast({message: "No Account Found", color: "red", visible: true}, 10000)
          }
        }
        this.context.setContentLoading(false)
        })
      }else {
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
            <label htmlFor="email">email address:</label> <input type="text" placeholder="email address" size ="32"  name="email" id="email" value={this.state.email} onChange={this.onChange} autoComplete="off"/>
            <br/>
            <p>Admin: {this.state.admin? "Yes" : "No"}</p>
          </div>
        )
    }

   
}

AccountPage.contextType = Context
export default AccountPage