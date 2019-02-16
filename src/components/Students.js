import React, { Component } from 'react';
import Table from './Table';
import {DataConsumer} from '../Store'
import '../css/Students.css';

class Students extends Component {
  render() {
    return (
      <DataConsumer>
        {store => 
          <div className="students content-page">
            <div className="header">
              <h2>Students</h2>
              <button type="submit">></button>
              <input type="text" placeholder="Search"></input>
            </div>
            <Table data={store.students} />
          </div>
        }
      </DataConsumer>
    );
  }
}

export default Students;
