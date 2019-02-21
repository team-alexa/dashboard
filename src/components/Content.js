import React, { Component } from 'react';
import Home from './Home'
import SearchPage from './SearchPage'
import {DataConsumer} from '../Store'
import '../css/Content.css';

const logs = {

}

const components = {
  "": <Home />,
  "home": <Home />,
  "students": <DataConsumer>{store => <SearchPage title="Students" tableData={store.students} />}</DataConsumer>,
  "logs": <DataConsumer>{store => {
    // The next three lines are only here to get sample data without copying the already-existing example table recentActivities.
    // This won't be used in production since data will be coming from DB
    const tableData = {}
    Object.assign(tableData, store.recentActivities)
    tableData.height = "80%"

    return <SearchPage title="Logs" tableData={tableData} />
  }}</DataConsumer>
}

class Content extends Component {
  render() {
    return (
      <DataConsumer>
        {store =>
          <div className={store.sidebarClass+" content"}>
            {components[store.page]}
          </div>
        }
      </DataConsumer>
    );
  }
}

export default Content;
