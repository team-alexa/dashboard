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
    
    showComponent(theme) {
        const { authState, hide, authData={} } = this.props;
        
        return (
            <div className="login-screen">
                <div className="main-div">    
                    <h1>Reset Your Password</h1>
                    <div>
                        { this.state.delivery || authData.username ? this.submitView() : this.sendView() }
                    </div>
                    <div>
                        { this.state.delivery || authData.username ?
                                <a onClick={() => this.send}>Resend Code</a> : 
                                <a onClick={() => this.changeState('signIn')}>Back to Sign In</a>
                        }    
                        { this.state.delivery || authData.username ? 
                                <button onClick={this.submit} className="login-button">{'Submit'}</button> :
                                <button onClick={this.send} className="login-button">{'Send Code'}</button>
                        }
                    </div>
                </div>
            </div>
        );
    }
}
