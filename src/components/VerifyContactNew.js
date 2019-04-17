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
    
    showComponent(theme) {
        const { authData, hide } = this.props;
        if (hide && hide.includes(VerifyContact)) { return null; }

        return (
            <div className="login-screen">
                <div className="main-div">
                <h1>Verify Your Contact Information</h1>
                <div>
                    { this.state.verifyAttr ? this.submitView() : this.verifyView() }
                </div>
                <div>
                    <div>
                        { this.state.verifyAttr ?
                            <button className="login-button" onClick={this.submit}>Submit</button> :
                            <button className="login-button" onClick={this.verify}>Verify</button>
                        }
                    </div>
                    <div>
                    <a onClick={() => this.changeState('signedIn', authData)}>
                            Skip
                        </a>
                    </div>
                </div>
                </div>
            </div>
        );
    }
}
VerifyContactNew.contextType = Context;