import React, { Component } from 'react';
import '../css/Login.css';

class Login extends Component {
  render() {
    return (
      <div className="login-screen">
        <div id="main-div">
            <img src="/static/media/main_logo.1d5af73f.png"/>
            <input type="text" placeholder="Username" size ="32"/>
            <br/>
            <input type="password" placeholder="Password" size ="32"/>
            <br/>
            <button id="login-button">Login</button>
        </div>
      </div>
    );
  }
}

export default Login;
