import React, { Component } from 'react';
import Home from './Home'
import AdminPage from './AdminPage'
import StudentProfile from './StudentProfile'
import {DataConsumer} from '../Store'
import '../css/Content.css';

const components = {
  "": <Home />,
  "home": <Home />,
  "profile": <Home />,
  "adminpanel": <AdminPage />
  "students": <Home />
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
