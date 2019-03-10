import React, { Component } from 'react';
import Home from './Home'
import SearchPage from './SearchPage'
import AdminPage from './AdminPage'
import StudentProfile from './StudentProfile'
import {DataConsumer} from '../Store'
import '../css/Content.css';

class Content extends Component {
  constructor(props) {
    super(props);
  }

  getComponent(store) {
    if (store.pageId) {
      switch(store.page) {
        case "students": return <StudentProfile id={store.pageId} />
      }
    } else {
      switch(store.page) {
        case "": return <Home />
        case "home": return <Home />
        case "students": return <SearchPage title="Students"
          table={{data: store.students,
            width: "100%",
            height: "80%",
            headers: ["First Name", "Last Name", "Teacher", "Age", "Allergies"],
            columnWidths: ["15%", "15%", "30%", "10%", "40%"],
            rootAddress: "/students/"}
          } />
        case "logs": return <SearchPage title="Logs"
            table={{
              data: store.recentActivities,
              width: "100%",
              height: "80%",
              headers: ["Date", "Student", "Teacher", "Category", "Details"],
              columnWidths: ["10%", "20%", "20%", "10%", "40%"],
              rootAddress: "/logs/"}
            } />
        case "adminpanel": return <AdminPage />
      }
    }
  }

  render() {
    return (
      <DataConsumer>
        {store => <div className={store.sidebarClass+" content"}>{this.getComponent(store)}</div>}
      </DataConsumer>
    );
  }
}

export default Content;
