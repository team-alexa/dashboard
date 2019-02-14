import React, { Component } from 'react';
import Home from './Home'
import '../css/Content.css';

const components = {
  "": <Home />,
  "home": <Home />,
  "profile": <Home />
}

class Content extends Component {
  render() {
    console.log(this.props)
    return (
      <div className="content">
        {components[this.props.page]}
      </div>
    );
  }
}

export default Content;
