import React, { Component } from 'react';
import Sidebar from './Sidebar';
import LogoHeader from './LogoHeader';
import Content from './Content';
import {DataConsumer} from '../Store';
import '../css/MainApp.css';

class MainApp extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <DataConsumer>
        {store => {
          store.setPage(this.props.match.params.page)
          store.setPageId(this.props.match.params.id)
          return(
            <div className="app">
              <Sidebar/>
              <LogoHeader/>
              <Content/>
            </div>
          )}
        }
      </DataConsumer>
    );
  }
}

export default MainApp;
