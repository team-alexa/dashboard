import React, { Component } from 'react';
import Table from './Table';
import '../css/SearchPage.css';
import Constants from '../Constants'

class Logs extends Component {
  render() {
    return (
      <div className="search-page content-page">
        <div className="header">
          <h2>Logs</h2>
          <button type="submit">→</button>
          <input type="text" placeholder="Search"></input>
        </div>
        <Table data={Constants.logs}
          height="80%"
          width="100%"
          headers={["Date", "Student", "Teacher", "Category", "Details"]}
          columnWidths={["10%", "20%", "20%", "10%", "40%"]}
          rootAddress="/logs/"/>
      </div>
    );
  }
}

export default Logs;
