import React, { Component } from 'react';
import Table from './Table';
import {DataConsumer} from '../Store'
import '../css/Home.css';

class Home extends Component {
  render() {
    return (
      <DataConsumer>
        {store =>
          <div className="home content-page">
            <h2>Recent Activity</h2>
            <Table data={store.recentActivities} />
            <h2>Your Students</h2>
          </div>
        }
      </DataConsumer>
    );
  }
}

export default Home;
