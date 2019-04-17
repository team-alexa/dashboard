import * as React from 'react';
import Auth from '@aws-amplify/auth';
import { RequireNewPassword } from "aws-amplify-react";
import {Link} from 'react-router-dom';
import { Context } from "../Store";

export default class ChangePasswordNew extends RequireNewPassword {
    constructor(props) {
        super(props);
        this._validAuthStates = ['requireNewPasswordNew'];
    }
    
    checkContact(user) {
        if (!Auth || typeof Auth.verifiedContact !== 'function') {
            throw new Error('No Auth module found, please ensure @aws-amplify/auth is imported');
        }
        Auth.verifiedContact(user)
        .then(data => {
            if (Object.keys(data.verified).length != 0) {
                this.changeState('signedIn', user);
                Auth.currentAuthenticatedUser()
                    .then(result => {
                        this.context.loadUserData(result);
                    });
            } else {
                user = Object.assign(user, data);
                this.changeState('verifyContactNew', user);
            }
        });
    } 
    change() {
        const user = this.props.authData;
        const { password } = this.inputs;
        const { requiredAttributes } = user.challengeParam;

        if (!Auth || typeof Auth.completeNewPassword !== 'function') {
            throw new Error('No Auth module found, please ensure @aws-amplify/auth is imported');
        }
        Auth.completeNewPassword(user, password, null)
            .then(user => {
                if (user.challengeName === 'SMS_MFA') {
                    this.changeState('confirmSignIn', user);
                } else {
                    this.checkContact(user);
                }
            })
            .catch(err => this.error(err));
    }
    
    showComponent() {
        const { hide } = this.props;
        if (hide && hide.includes(RequireNewPassword)) { return null; }

        const user = this.props.authData;
        const { requiredAttributes } = user.challengeParam;

        return (
            <div className="login-screen">
                <div className="main-div">  
                    <h1>Change Password</h1>
                    <div>
                        <input autoFocus placeholder={'New Password'} key="password" name="password" type="password" onChange={this.handleInputChange}/>
                    </div>
                    <div>
                        <a onClick={() => this.changeState('signIn')}>Back to Sign In</a>
                        <button onClick={this.change} className="login-button">Change</button>
                    </div>
                </div>
            </div>
        );
    }
}
ChangePasswordNew.contextType = Context;