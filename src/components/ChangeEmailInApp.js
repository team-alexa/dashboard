import React, { Component } from "react";
import { Auth } from "aws-amplify";
import{Context} from '../Store';
import {Redirect} from 'react-router-dom';
import {Link} from 'react-router-dom';

class ChangeEmailInApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      code: "",
      email: "",
      codeSent: false,
      changed: false
    };
      
      this.handleChange = this.handleChange.bind(this);
      this.handleUpdateClick = this.handleUpdateClick.bind(this);
      this.handleConfirmClick = this.handleConfirmClick.bind(this);
  }

  handleChange(event) {
    const target = event.target;
        const value = target.value;
        const name = target.id;
        this.setState({
          [name]: value
        });
  }

  handleUpdateClick = async event => {
      event.preventDefault();
      console.log(this.context.currentUser.email);
      console.log(this.state.email);
    
    if(this.state.email != this.context.currentUser.email){

      const user = await Auth.currentAuthenticatedUser();
      var x = Auth.updateUserAttributes(user, { email: this.state.email });

      x.then(result =>{
          if(result == "SUCCESS"){
              this.context.setToast({message: "Success! Please verify your email now!", color: "green", visible: true}, 3000);
              this.setState({ 
                  codeSent: true
              });
          }
          else{
              this.context.setToast({message: result.message + "\nPlease try again.", color: "red", visible: true}, 3000);  
          }
      }).catch(e => {
          this.context.setToast({message: e.message + "\nPlease try again.", color: "red", visible: true}, 3000);          
      })
    }
      
      else{
        this.context.setToast({message: "You must change your email.", color: "red", visible: true}, 3000); 
          this.setState({
              email: ""
          })

      }
  }

  handleConfirmClick = async event => {
    event.preventDefault();
    
    var x = Auth.verifyCurrentUserAttributeSubmit("email", this.state.code);
    x.then(result => {
        if(result == "SUCCESS"){
            this.context.setToast({message: "You have successfully verified your email!", color: "green", visible: true}, 3000);
            this.setState({
                code: "",
                email: "",
                codeSent: false,
                changed: true
            })
        } 
        else{
           this.context.setToast({message: result.message + " Please try again.", color: "red", visible: true}, 3000);  
        }
    }).catch(e => {
        this.context.setToast({message: e.message + " Please try again.", color: "red", visible: true}, 3000);  
    })   
  }

  renderUpdateForm() {
    return (
        <div className="content-page">
            <h2>Change Email</h2>
            <form onSubmit={this.handleUpdateClick}>
                <input type="text" placeholder="Email" id="email" value={this.state.email} onChange={this.handleChange} size="32"/>
                <br/>
                <button type="submit" className="account-page-link">Update Email</button>
            </form>
        </div>
    );
  }

  renderConfirmationForm() {
    this.state.codeSent = "false";
    return (
        <div className="content-page">
            <h2>Verify Email</h2>
            <p>***To complete the email change process, you MUST log out and log back in!***</p>
            <form onSubmit={this.handleConfirmClick}>
                <input type="text" placeholder="Confirmation Code" id="code" value={this.state.code} onChange={this.handleChange} size="32"/>
                <br/>
                <button type="submit" className="account-page-link">Confirm</button>
            
                <Link className="account-page-link" to={"/account"}>Verify Later</Link>
            </form>
        </div>
    );
  }

  render() {
      if(this.state.changed == true){
          this.state.changed = false;
          return <Redirect to="/account"/>
      }
      return (
      <div>
        {!this.state.codeSent
          ? this.renderUpdateForm()
          : this.renderConfirmationForm()}
      </div>
    );
  }
}


ChangeEmailInApp.contextType = Context;
export default ChangeEmailInApp;