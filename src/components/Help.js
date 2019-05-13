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
              <h2>Help</h2>
              <h4><u>Understanding the Home Page:</u></h4> 
              <ol className="list-font">
                <li>The home page holds a table for all recent logs from all teachers showing the date, time, student information and details of any recently reported events.</li>                         
                <li>It also holds cards for each of your students which includes their ages and their known allergies. </li>  
              </ol>
              <h4><u>Searching for a Student:</u></h4>              
              <ol className="list-font">
                <li>Navigate to the Students tab in the Sidebar.</li>   
                <li>Click into the Search bar next to the text "Students".</li>
                <li>Enter your student's name and click the arrow button to search.</li>   
              </ol>
            
              <h4><u>Searching for a Log:</u></h4>
              <ol className="list-font">
                <li>Navigate to the Logs tab in the Sidebar.</li>   
                <li>Click into the Search bar next to the text "Student".</li>
                <li>Enter the student's name.</li>   
                <li>Click into the Search bar next to the text "Teacher".</li>
                <li>Enter your teacher's name.</li>   
                <li>Click the arrow button to search.</li>
                <li>You can also enter a date if you would like.</li>
              </ol>  
            
              <h4><u>How to View and Modify Your Account Details:</u></h4>
              <ol className="list-font">
                <li>Navigate to the My Account tab in the sidebar.</li>
                <li>From here, you can modify your password, email, and personal information. </li>
              </ol> 
            
              <h4><u>How to Use the Admin Panel:</u></h4>
              <ol className="list-font">
                <li>Navigate to the Admin Panel tab in the sidebar.</li>   
                <li>You will be presented with a list of teachers and their roles in a table.</li>
                <li>To view each teacher, simply click their name in the table.</li>
                <li>To change their admin status or other information, navigate to the teacher you would like to change.</li>
              </ol> 
            </div>
          </div>
        );
      }
    }
    
    
    export default Help;
    