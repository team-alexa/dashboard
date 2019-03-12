import React, { Component } from 'react';
import '../css/Error.css';

class Error extends Component {
  render() {
    return (
      <div className="error-page content-page">
        <h2>Uh oh, you've made a wrong turn!</h2>
      </div>
    );
  }
}

export default Error;
