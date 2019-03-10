import React, { Component } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import {DataProvider} from './Store'

class App extends Component {
  render() {
    return (
      <Router>
        <DataProvider>
          <Route
            path="/"
            exact
            render={(props) => <Dashboard {...props}
            match={{params: {page: 'home'}}} />}
          />
          <Route exact path="/:page" component={Dashboard} />
          <Route exact path="/:page/:id" component={Dashboard} />
          <Route path="/login" component={Login} />
        </DataProvider>
      </Router>
    );
  }
}

export default App;
