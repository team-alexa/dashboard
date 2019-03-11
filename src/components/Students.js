import React, { Component } from 'react';
import Table from './Table';
import '../css/SearchPage.css';
import Constants from '../Constants'

class Students extends Component {
  render() {
    return (
      <div className="search-page content-page">
        <div className="header">
          <h2>Students</h2>
          <button type="submit">→</button>
          <input type="text" placeholder="Search"></input>
        </div>
        <Table data={Constants.students}
          height="80%"
          width="100%"
          headers={["First Name", "Last Name", "Teacher", "Age", "Allergies"]}
          columnWidths={["15%", "15%", "30%", "10%", "40%"]}
          rootAddress="/students/"
          newLink="/students/new" />
      </div>
    );
  }
}

export default Students;
