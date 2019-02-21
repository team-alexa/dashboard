import React, { Component } from 'react';
import Table from './Table';
import {DataConsumer} from '../Store'
import '../css/SearchPage.css';

class SearchPage extends Component {
  render() {
    return (
      <DataConsumer>
        {store => 
          <div className="search-page content-page">
            <div className="header">
              <h2>{this.props.title}</h2>
              <button type="submit">⮕</button>
              <input type="text" placeholder="Search"></input>
            </div>
            <Table data={this.props.tableData} />
          </div>
        }
      </DataConsumer>
    );
  }
}

export default SearchPage;
