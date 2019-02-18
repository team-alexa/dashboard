import React, { Component } from 'react';
import '../css/Table.css';

class Table extends Component {
  render() {
    return (
      <div className="table-container" style={{height: this.props.data.height, width: this.props.data.width}}>
        <table className="table header">
          <thead>
            <tr>
              {this.props.data.headers.map((text, index) => {
                return <th style={{"width": this.props.data.columnWidths[index]}} key={index}>{text}</th>
              })}
            </tr>
          </thead>
        </table>
        <div className="table-body-container">
          <table className="table body">
            <tbody>
              {this.props.data.data.map((row, index) => {
                return (<tr key={index}>
                  {row.map((text, index) => {
                    return <td style={{"width": this.props.data.columnWidths[index]}} key={index}>{text}</td>
                  })}
                </tr>)
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Table;
