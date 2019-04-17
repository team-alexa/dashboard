import React, { Component } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import {DataProvider} from './Store'
import ForgotPasswordNew from './components/ForgotPasswordNew'
import ChangePasswordNew from './components/ChangePasswordNew'
import VerifyContactNew from './components/VerifyContactNew'

class App extends Component {
    render() {
        if (this.props.authState == "signedIn") {
            return (
            <Router>
                <div>
                    <Route
                        path="/"
                        exact
                        render={(props) => <Dashboard {...props}
                        match={{params: {page: 'home'}}} />}
                    />
                    <Route exact path="/:page" component={Dashboard} />
                    <Route exact path="/:page/:id" component={Dashboard} />
                </div>
            </Router>
            );
        } 
        else if(this.props.authState == "forgotPasswordNew"){
            return <ForgotPasswordNew />;
        }
        else if(this.props.authState == "requireNewPasswordNew"){
            return <ChangePasswordNew />;
        }
        else if(this.props.authState == "verifyContactNew"){
            return <VerifyContactNew />;
        }
        else {
            return null;
        }
    }
}

export default App;