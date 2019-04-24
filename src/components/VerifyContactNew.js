import * as React from 'react';
import Auth from '@aws-amplify/auth'
import { VerifyContact } from "aws-amplify-react";
import {Link} from 'react-router-dom';
import { Context } from "../Store";

export default class VerifyContactNew extends VerifyContact {
    constructor(props) {
        super(props);

        this._validAuthStates = ['verifyContactNew'];
        this.state = { delivery: null };
    }
    
    verifyDataStuff(authData){
        this.changeState('signedIn', authData);
        Auth.currentAuthenticatedUser()
        .then(result => {
            this.context.setCurrentUser(result.username);
        });
    }
    
    submit() {
        const attr = this.state.verifyAttr;
        const { code } = this.inputs;
        if (!Auth || typeof Auth.verifyCurrentUserAttributeSubmit !== 'function') {
            throw new Error('No Auth module found, please ensure @aws-amplify/auth is imported');
        }
        Auth.verifyCurrentUserAttributeSubmit(attr, code)
            .then(data => {
                this.changeState('signedIn', this.props.authData);
                this.setState({ verifyAttr: null });
                Auth.currentAuthenticatedUser()
                    .then(result => {
                        this.context.loadUserData(result);
                    });
            })
            .catch(err => this.error(err));
    }
    
    verifyView() {
        const user = this.props.authData;
        if (!user) {
            return null;
        }
        const { unverified } = user;
        if (!unverified) {
            return null;
        }
        const { email } = unverified;
        return (
            <div className="div-login-list">
                { email? <div>
                            <input key="email" name="contact" value="email" onChange={this.handleInputChange} type="radio"/>Email
                         </div>: null
                }
            </div>
        );
    }

    submitView() {
        return (
            <div>
                <input placeholder='Code' key="code" name="code" autoComplete="off" onChange={this.handleInputChange} type="text" size="32"/>
            </div>
        );
    }
    
    showComponent(theme) {
        const { authData, hide } = this.props;
        if (hide && hide.includes(VerifyContact)) { return null; }

        return (
            <div className="login-screen">
                <div className="main-div">
                    <img src="/static/media/main_logo.1d5af73f.png"/>    
                    <h1 className="login-h1">Verify Your Email</h1>
                <div>
                    { this.state.verifyAttr ? this.submitView() : this.verifyView() }
                </div>
                <div className="div-hold-buttons">
                    <div className="div-login-link">
                        <a onClick={() => this.verifyDataStuff(authData)}>Skip Verify</a>
                    </div>
                    <div className="div-login-button">
                        { this.state.verifyAttr ?
                            <button className="login-button-v2" onClick={this.submit}>Submit</button> :
                            <button className="login-button-v2" onClick={this.verify}>Verify</button>
                        }
                    </div>
                    
                </div>
                </div>
            </div>
        );
    }
}
VerifyContactNew.contextType = Context;