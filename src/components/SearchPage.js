import React, { Component } from 'react';
import Table from './Table';
import '../css/SearchPage.css';

class SearchPage extends Component {
  render() {
    return (
      <div className="search-page content-page">
        <div className="header">
          <h2>{this.props.title}</h2>
          <button type="submit">→</button>
          <input type="text" placeholder="Search"></input>
        </div>
        <Table data={this.props.table.data}
          height={this.props.table.height}
          width={this.props.table.width}
          headers={this.props.table.headers}
          columnWidths={this.props.table.columnWidths}
          rootAddress={this.props.table.rootAddress}/>
      </div>
    );
  }
}

export default SearchPage;
