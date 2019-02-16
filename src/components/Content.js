import React, { Component } from 'react';
import Home from './Home'
import Students from './Students'
import {DataConsumer} from '../Store'
import '../css/Content.css';

const components = {
  "": <Home />,
  "home": <Home />,
  "students": <Students />
}

class Content extends Component {
  render() {
    return (
      <div className={this.props.visible+" content"}>
        <p>Some Info</p>
      </div>
    );
  }
}

export default Content;
