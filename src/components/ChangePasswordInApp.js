import React, {Component} from 'react';
import '../css/index.css'
import{Context} from '../Store'
import Auth from '@aws-amplify/auth';
import {Redirect} from 'react-router-dom';
import '../css/ChangePasswordInApp.css';

class ChangePasswordInApp extends Component{
    
    constructor(props) {
        super(props);
        this.state = { 
            oldPass: "",
            newPass: "",
            confNewPass: "",
            changed: false
        };
        
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.id;
        this.setState({
          [name]: value
        });
      }
    
    
    handleSubmit(event){
        event.preventDefault();
        if(this.state.newPass != this.state.confNewPass){
            this.context.setToast({message: "The new password entries do not match!", color: "red", visible: true}, 3000);
            this.setState({
                oldPass: "",
                newPass: "",
                confNewPass: ""
                })
            return;
        }
        var x = this.context.changePassword(this.state.oldPass, this.state.newPass)
        x.then(result => {
            if(result == "SUCCESS"){
                this.context.setToast({message: "You have successfully changed your password!", color: "green", visible: true}, 3000);
                this.setState({
                oldPass: "",
                newPass: "",
                confNewPass: "",
                changed: true
                })            
            }
            else{
                var x = result.message.split(':');
                var finalStr = "";
                for(var i = 0; i<x.length; i++){
                    finalStr += x[i];
                    finalStr += "\n"
                }
                var x = finalStr.split(";")
                var finalStr2 = "";
                for(var i = 0; i<x.length; i++){
                    finalStr2 += x[i];
                    finalStr2 += "; "
                }
                this.context.setToast({message: finalStr2, color: "red", visible: true}, 3000);
                this.setState({
                oldPass: "",
                newPass: "",
                confNewPass: ""
                })
            }
         })
        
    }
    
    render(){
        if(this.state.changed == false){
           return (
            <div className="content-page">
               <h2>Change Password</h2>
                <form onSubmit={this.handleSubmit}>
                <input type="password" placeholder="Old Password" id="oldPass" value={this.state.oldPass} onChange={this.handleInputChange}></input>
                <br/>
                <input type="password" placeholder="New Password" id="newPass" value={this.state.newPass} onChange={this.handleInputChange}></input>
                <br/>
                <input type="password" placeholder="Confirm New Password" id="confNewPass" value={this.state.confNewPass} onChange={this.handleInputChange}></input>
                <br/>
                <button className="changePassword-button" type="submit">Submit</button>
                </form>
            </div>            
            ) 
        }
        else{
            this.state.changed = false;
            return <Redirect to='/account' />
        }
    }
}

ChangePasswordInApp.contextType = Context;
export default ChangePasswordInApp;