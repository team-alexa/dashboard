import React from "react";
import { SignIn } from "aws-amplify-react";
import { Login } from "./Login";
import App from "../App";
import { Authenticator } from "aws-amplify-react/dist/Auth";
import Amplify from 'aws-amplify';
import ForgotPasswordNew from './ForgotPasswordNew'
import ChangePasswordNew from './ChangePasswordNew'
import VerifyContactNew from './VerifyContactNew'
import {DataProvider} from '../Store'

Amplify.configure({
    Auth: {
        // REQUIRED - Amazon Cognito Region
        region: 'us-east-1',
        
        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: 'us-east-1_4nY4KlmH2',
        
        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: '59chqv9oaa1nlrj3idv97pmn7r'
    }
});

class AppWithAuth extends React.Component {

  render() {
      return (
      <div>
          <DataProvider>
                <Authenticator hide={[SignIn]}>
                    <Login />
                    <ForgotPasswordNew />
                    <ChangePasswordNew />
                    <VerifyContactNew />
                    <App />
                </Authenticator>
          </DataProvider>
      </div>
    );
  }
}

export default AppWithAuth;