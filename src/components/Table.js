import React, { Component } from 'react';
import { withRouter } from "react-router";
import '../css/Table.css';

class Table extends Component {


  navigateTo(path) {
    this.props.history.push({pathname: path})
  }

  handleScroll(e) {
    if (e.target.scrollTop >= (this.table.offsetHeight - e.target.offsetHeight) && this.props.loadFunction) {
      this.props.loadFunction()
    }
  }

  render() {
    return (
      <div className="table-container" style={{height: this.props.height, width: this.props.width}}>
        <table className="table header">
          <thead>
            <tr>
              {this.props.headers.map((text, index) => {
                return <th style={{"width": this.props.columnWidths[index]}} key={index}>{text}</th>
              })}
            </tr>
          </thead>
        </table>
        <div className="table-body-container" onScroll={e => this.handleScroll(e)}>
          <table className="table body" ref={table => this.table = table}>
            <tbody>
              {this.props.data.map((row, index) => {
                return (<tr key={index} onClick={() => this.navigateTo(this.props.rootAddress + row[row.length-1])}>
                  {row.map((text, index) => {
                    if (index < row.length - 1)
                      return <td style={{"width": this.props.columnWidths[index]}} key={index}>{text}</td>
                  })}
                </tr>)
              })}
            </tbody>
          </table>
          {this.props.newLink ?
            <button className="new-button" onClick={() => this.navigateTo(this.props.newLink)}>+</button> :
            null
          }
        </div>
      </div>
    );
  }
}

export default withRouter(Table);
