import React, { Component } from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import LoginScreen from './components/login/LoginScreen'
import MainApp from './components/main_app/MainApp'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={MainApp} />
          <Route path="/login" component={LoginScreen} />
        </div>
      </Router>
    );
  }
}

export default App;
