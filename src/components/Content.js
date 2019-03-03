import React, { Component } from 'react';
import Home from './Home'
import SearchPage from './SearchPage'
import AdminPage from './AdminPage'
import StudentProfile from './StudentProfile'
import {DataConsumer} from '../Store'
import '../css/Content.css';

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
  }}</DataConsumer>,
  "adminpanel": <AdminPage />
}

const componentsWithIds = {
  "students": <DataConsumer>{store => <StudentProfile id={store.pageId} />}</DataConsumer>
}

class Content extends Component {
  render() {
    return (
      <DataConsumer>
        {store => {
          if (!store.pageId) {
            return (
              <div className={store.sidebarClass+" content"}>
                {components[store.page]}
              </div>
            )
          } else {
            return (
              <div className={store.sidebarClass+" content"}>
                {componentsWithIds[store.page]}
              </div>
            )
          }
        }}
      </DataConsumer>
    );
  }
}

export default Content;
