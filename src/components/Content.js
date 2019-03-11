import React, { Component } from 'react';
import {DataConsumer} from '../Store'
import '../css/Content.css';

import Home from './Home'
import AdminPage from './AdminPage'
import StudentProfile from './StudentProfile'
import Students from './Students'
import Logs from './Logs'
import Error from './Error'

class Content extends Component {
  constructor(props) {
    super(props);

    this.toastRef = React.createRef()
    this.updated = false
    this.state = {
      toastLeft: "0px"
    }
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
        case "students": return <Students />
        case "logs": return <Logs />
        case "adminpanel": return <AdminPage />
        default: return <Error />
      }
    }
  }

  componentDidUpdate() {
    if (!this.updated) {
      var left = 215 // Sidebar offset
      left -= this.toastRef.current.offsetWidth
      this.updated = true
      this.setState({toastLeft: `calc(50% + ${left}px)`})
    } else {
      this.updated = false
    }
  }

  render() {
    return (
      <DataConsumer>
        {store =>
          <div className={store.sidebarClass + " content"}>
            <div className={"toast " + (store.displayToastMessage ? "enabled " : "disabled ") + store.toastColor}
              style={{left: this.state.toastLeft}}
              ref={this.toastRef}>
              <h2>{store.toastMessage}</h2>
              <span onClick={() => store.setToastDisplay(false)}>x</span>
            </div>
            {this.getComponent(store)}
          </div>
        }
      </DataConsumer>
    );
  }
}

export default Content;
