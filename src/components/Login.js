import React from "react";
import { SignIn } from "aws-amplify-react";
import '../css/Login.css';
import Auth from '@aws-amplify/auth'
import { Context } from "../Store";

export class Login extends SignIn {
    constructor(props) {
        super(props);
        this._validAuthStates = ["signIn", "signedOut", "signedUp"];
        this.checkContact = this.checkContact.bind(this);
        this.signIn = this.signIn.bind(this);
        
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

    async signIn(event) {
        const { username='', password } = this.inputs;
        if (!Auth || typeof Auth.signIn !== 'function') {
            throw new Error('No Auth module found, please ensure @aws-amplify/auth is imported');
        }

        this.setState({loading: true});
        try {
            const user = await Auth.signIn(username, password);
            if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
                this.changeState('requireNewPasswordNew', user);
            } else {
                this.checkContact(user);
            }
        } catch (err) {
            if (err.code === 'PasswordResetRequiredException') {
                this.changeState('forgotPasswordNew', {username});
            } else {
                this.error(err);
            }
        } finally {
            this.setState({loading: false})
        }
    }
    showComponent(theme) {
        return (
        <div className="login-screen">
            <div className="main-div">
                <img src="/static/media/main_logo.1d5af73f.png"/>
                <input key="username" name="username" onChange={this.handleInputChange} type="text" placeholder="Username" size="32"/>
                <br/>
                <input key="password" name="password" onChange={this.handleInputChange} type="password" placeholder="Password" size="32"/>
                <p> 
                    Forgot your password?{" "}
                    <a onClick={() => super.changeState("forgotPasswordNew")}>Reset Password</a>
                </p>
                <button className="login-button" onClick={() => this.signIn()}>Login</button>
            </div>
        </div>
        );
    }
}
Login.contextType = Context;
export default Login;