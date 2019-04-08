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
      searchLogs: [],
      displaySearch: false
    }
  }

  componentDidMount() {
    if (this.context.logs.length == 0) {
      this.context.loadMoreLogs()
    }
    this.context.loadTeachers()
  }

  getLogTableData() {
    const logs = this.state.displaySearch ? this.state.searchLogs : this.context.logs
    return logs.map(log => {
      const date = new Date(log.date)
      const dateStr = (date.getUTCMonth() + 1) + "/" + date.getUTCDate() + "/" + date.getUTCFullYear()
      return [dateStr,
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
    if (this.state.studentName || this.state.teacherName || this.state.date) {
      var url = Constants.apiUrl + "logs?index=" + this.state.searchLogs.length
      url += this.state.studentName ? "&studentFullName=" + this.state.studentName : ""
      url += this.state.teacherName ? "&teacherFullName=" + this.state.teacherName : ""
      url += this.state.date ? "&date=" + this.state.date.replace('/', '-', 'g') : ""
      this.context.setContentLoading(true)
      fetch(url)
        .then(response => response.json())
        .then(data => {
          this.context.setContentLoading(false)
          if (typeof data != Array) {
            this.context.setToast({color: "red", message: "Data didn't load correctly", visible: true}, 10000)
            return
          }

          if (this.state.searchLogs.length > 0) {
            const logs = this.state.searchLogs.slice()
            this.setState({searchLogs: logs.concat(data), displaySearch: true})
          } else {
            this.setState({searchLogs: data || [], displaySearch: true})
          }
        })
    } else {
      this.setState({searchLogs: [], displaySearch: false})
    }
  }

  onChange(e) {
    this.setState({[e.target.id]: e.target.value});
  }

  render() {
    return (
      <div className="search-page content-page">
        <div className="header">
          <h2>Logs</h2>
          <form onSubmit={this.search}>
            <input type="date" placeholder="Date" value={this.state.date} id="date" onChange={this.onChange}></input>
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
          loadFunction = {this.state.displaySearch ? () => {this.search(null)} : this.context.loadMoreLogs} />
      </div>
    );
  }
}

Logs.contextType = Context

export default Logs;
