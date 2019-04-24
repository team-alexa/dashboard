import * as React from 'react';
import Auth from '@aws-amplify/auth';
import { ForgotPassword } from "aws-amplify-react";
import {Link} from 'react-router-dom';

export default class ForgotPasswordNew extends ForgotPassword {
    constructor(props) {
        super(props);

        this._validAuthStates = ['forgotPasswordNew'];
        this.state = { delivery: null };
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
            </div>
        );
    }
    
    showComponent(theme) {
        const { authState, hide, authData={} } = this.props;
        
        return (
            <div className="login-screen">
                <div className="main-div">    
                    <img src="/static/media/main_logo.1d5af73f.png"/>        
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
