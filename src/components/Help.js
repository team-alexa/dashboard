import React, { Component } from 'react';
import '../css/Help.css'
class Help extends Component {
    constructor(props) {
      super(props)
    }

    render() {
        return (
          <div className="content-page">
            <div className="header">
              <h2>Help:</h2>
              <h4>Understanding the Home page:</h4> 
              <h5>The home page holds a table for recent events for all of your students showing the date, time, student information and details of any recently reported events. </h5>                         
              <h5>It also holds cards for each of your students which has their ages and their known allergies. </h5>                         
              <h4>Searching for a student:</h4>              <h5>The home page holds a table for recent events for all of your students showing the date, time, student information and details of any recently reported events. </h5>                         
              <h5>To search for a student you must:</h5>                         
              <ol className="list-font">
              <li>Navigate to the Students tab in the sidebar.</li>   
              <li>Click into the Search bar next to the text Students.</li>
              <li>Enter your student's name and click the arrow button to search.</li>   
              </ol>              
              <h4>Searching for a log:</h4>
              <ol className="list-font">
              <li>Navigate to the Logs tab in the sidebar.</li>   
              <li>Click into the Search bar next to the text Student.</li>
              <li>Enter the student's name</li>   
              <li>Click into the Search bar next to the text Teacher.</li>
              <li>Enter your teacher's name</li>   
              <li>Click the arrow button.</li>   
              </ol>   
              <h4>How to view your account:</h4>
              <ol className="list-font">
              <li>Navigate to the My Account tab in the sidebar.</li>   
              </ol> 
              <h4>How to use the admin panel:</h4>
              <ol className="list-font">
              <li>Navigate to the Admin Panel tab in the sidebar.</li>   
              <li>You will be presented with a list of teachers in a table with a paramaeter yes or no next to each of their names</li>
              <li>You can veiw each teacher simply click their name in the table</li>
              <li>To change their admin status navigate to the teacher you would like to change</li>
              <li>TBD Based on when/how this is set up</li>
              </ol> 
            </div>
          </div>
        );
      }
    }
    
    
    export default Help;
    