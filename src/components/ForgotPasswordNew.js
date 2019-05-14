import * as React from 'react';
import Auth from '@aws-amplify/auth';
import { ForgotPassword } from "aws-amplify-react";
import {Context} from '../Store';

export default class ForgotPasswordNew extends ForgotPassword {
    constructor(props) {
        super(props);

        this._validAuthStates = ['forgotPasswordNew'];
        this.state = { 
            delivery: null,
            newPass: ""
        };
        
        this.handleInputChangeNewPass = this.handleInputChangeNewPass.bind(this);
    }
   handleInputChangeNewPass(event) {
        const target = event.target;
        const value = target.value;
        const name = target.id;
        this.setState({
          [name]: value
        });
      }
    
    submit() {
        const { authData={} } = this.props;
        const { code, password } = this.inputs;
        const username = this.inputs.username || authData.username;
        if(password !== this.state.newPass){
            /*this.context.setToast({message: "Passwords don't Match.", color: "red", visible: true}, 10000)*/
            alert("Passwords Don't Match. Please Try Again.");
            return;
        }
        if (!Auth || typeof Auth.forgotPasswordSubmit !== 'function') {
            throw new Error('No Auth module found, please ensure @aws-amplify/auth is imported');
        }
        Auth.forgotPasswordSubmit(username, code, password)
            .then(data => {
                /*this.context.setToast({message: "Passwords don't Match.", color: "red", visible: true}, 10000)*/
                alert("Password has been successfully changed!");
                this.changeState('signIn');
                this.setState({ delivery: null, newPass: "" });
            })
            .catch(err => this.error(err));
    }
    sendView() {
        return (
            <div>
                <div>
                    <input autoFocus placeholder="Username" key="username" name="username" onChange={this.handleInputChange} type="text" size="32"/>
                </div>
            </div>
        );
    }

    submitView() {
        return (
            <div>
                <input placeholder='Code' key="code" name="code" autoComplete="off" onChange={this.handleInputChange} type="text" size="32"/>
                <input placeholder="New Password" type="password" key="password" name="password" onChange={this.handleInputChange} size="32"/>
                <input placeholder="Confirm New Password" id="newPass" type="password" value={this.state.newPass} onChange={this.handleInputChangeNewPass} size="32"/>
            </div>
        );
    }
    
    showComponent(theme) {
        const {authData={} } = this.props;
        
        return (
            <div className="login-screen">
                <div className="main-div">    
                    <img src="/static/media/main_logo.1d5af73f.png" alt=""/>        
                    <h1 className="login-h1">Reset Your Password</h1>
                    <div>
                        { this.state.delivery || authData.username ? this.submitView() : this.sendView() }
                    </div>
                    <div className="div-hold-buttons">
                        <div className="div-login-link">
                        { this.state.delivery || authData.username ?
                                null : 
                                <a onClick={() => this.changeState('signIn')}>Back to Sign In</a>
                        } 
                        </div>
                        <div className="div-login-button">
                        { this.state.delivery || authData.username ? 
                                <button onClick={this.submit} className="login-button-v2">{'Submit'}</button> :
                                <button onClick={this.send} className="login-button-v2">{'Send Code'}</button>
                        }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
ForgotPasswordNew.contextType = Context;