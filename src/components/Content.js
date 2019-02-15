import React, { Component } from 'react';
import Home from './Home'
import {DataConsumer} from '../Store'
import '../css/Content.css';

const components = {
  "": <Home />,
  "home": <Home />,
  "profile": <Home />
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
