import React, { Component } from 'react';
import '../css/StudentProfile.css';

class StudentProfile extends Component{
    constructor(props){
        super(props)
    }
    
    render() {
        return (
          <div className="student-profile" >

            <div className="button-group">
              <button type="button">New Log</button> 
              <button type="button">Save</button> 
            </div>
            <h1>Last Name, First Name</h1>
            <label htmlFor="lname">Name:</label> <input type="text" placeholder="Last Name" size ="32"  name="lname" id="lname"/>
            <input type="text" placeholder="First Name" size ="32" name="fname"/>
            <br/>
            <label htmlFor="id">ID:</label> <input type="text" placeholder={this.props.id} size = "3" name="id" id="id"/>
            <br/>
            <p>Age: 2 </p>
            <label htmlFor="month">DOB (MM/DD/YYYY):</label> <input type="text" size = "1" maxLength="2" placeholder ="01" name="month" id="month"/>
            /<input type="text" size = "1" maxLength="2" placeholder ="01" name="day"/>
            /<input type="text" size = "2" maxLength="4" placeholder ="2017" name="year"/>
            <br/>
            <label htmlFor="food">Food Allergies (comma-separated):</label> <input type="text" size = "64" id="food" />
            <br/>
            <label htmlFor="medical">Medical Allergies (comma-separated):</label> <input type="text" size = "64" id="medical" />
            <br/>
            <p>Teacher: Mukul Goyal </p>
            <p>Logs:</p>
          </div>
        );
      }



}

export default StudentProfile