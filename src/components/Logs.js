import React, { Component } from 'react';
import Table from './Table';
import '../css/SearchPage.css';
import {Context} from '../Store'
import Constants from '../Constants'

class Logs extends Component {
  constructor(props) {
    super(props)

    this.onChange = this.onChange.bind(this)
    this.search = this.search.bind(this)

    this.state = {
      studentName: "",
      teacherName: "",
      date: "",
      searchLogs: []
    }
  }

  componentDidMount() {
    if (this.context.logs.length == 0) {
      this.context.loadMoreLogs()
    }
    this.context.loadTeachers()
  }

  getLogTableData() {
    const logs = this.state.searchLogs.length > 0 ? this.state.searchLogs : this.context.logs
    return logs.map(log => {
      return [log.date,
        log.studentFullName,
        log.teacherFullName,
        log.activityType,
        log.activityDetails,
        log.logID]
    })
  }

  search(e) {
    if (e) {
      e.preventDefault()
    }
    if (this.state.studentName || this.state.teacherName) {
      var url = Constants.apiUrl + "logs?index=" + this.state.searchLogs.length
      url += this.state.studentName ? "&studentFullName=" + this.state.studentName : ""
      url += this.state.teacherName ? "&teacherFullName=" + this.state.teacherName : ""
      fetch(url)
        .then(response => response.json())
        .then(data => this.setState({searchLogs: data || []}))
    } else {
      this.setState({searchLogs: []})
    }
  }

  onChange(e) {
    this.setState({[e.target.id]: e.target.value, hasChanged: true});
  }

  render() {
    return (
      <div className="search-page content-page">
        <div className="header">
          <h2>Logs</h2>
          <form onSubmit={this.search}>
            <input type="text" placeholder="Student" value={this.state.studentName} id="studentName" onChange={this.onChange}></input>
            <input type="text" placeholder="Teacher" value={this.state.teacherName} id="teacherName" onChange={this.onChange}></input>
            <button type="submit" onClick={this.search}>→</button>
          </form>
        </div>
        <Table data={this.getLogTableData()}
          height="80%"
          width="100%"
          headers={["Date", "Student", "Teacher", "Category", "Details"]}
          columnWidths={["10%", "20%", "20%", "10%", "40%"]}
          rootAddress="/logs/"
          newLink="/logs/new"
          loadFunction = {this.context.loadMoreLogs} />
      </div>
    );
  }
}

Logs.contextType = Context

export default Logs;
