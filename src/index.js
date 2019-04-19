import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
//import App from './App';
import AppWithAuth from './components/AppWithAuth.js';
import * as serviceWorker from './serviceWorker';
import Amplify from 'aws-amplify';
import amplify from './aws-exports';


//ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<AppWithAuth />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

//Amplify configuration
//https://aws-amplify.github.io/docs/js/tutorials/building-react-native-apps/
Amplify.configure(amplify);

