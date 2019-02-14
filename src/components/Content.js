import React, { Component } from 'react';
import '../css/Content.css';

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
