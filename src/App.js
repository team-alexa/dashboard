import React, { Component } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import LoginScreen from './components/LoginScreen'
import MainApp from './components/MainApp'
import {DataProvider} from './Store'

class App extends Component {
  render() {
    return (
      <Router>
        <DataProvider>
          <Route
            path="/"
            exact
            render={(props) => <MainApp {...props}
            match={{params: {page: 'home'}}} />}
          />
          <Route exact path="/:page" component={MainApp} />
          <Route exact path="/:page/:id" component={MainApp} />
          <Route path="/login" component={LoginScreen} />
        </DataProvider>
      </Router>
    );
  }
}

export default App;
