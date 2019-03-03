import React, { Component } from 'react';
import '../css/StudentProfile.css';
import {DataConsumer} from '../Store'
import Table from './Table';

const singleStudentTableData = {
  width: "100%",
  height: "400px",
  headers: ["Date", "Student", "Teacher", "Category", "Details"],
  columnWidths: ["10%", "20%", "20%", "10%", "40%"],
  data: [["2/14/19", "Megan Waterworth", "Sophia Hills", "Food", "milk"],
  ["2/14/19", "Megan Waterworth", "Jack Baker", "Anecdotal", "Details"],
  ["2/14/19", "Megan Waterworth", "Emma Jones", "Food", "milk"],
  ["2/14/19", "Megan Waterworth", "Fred Barthel", "Food", "Fred's Breads"],
  ["2/14/19", "Megan Waterworth", "Nathan Irwin", "Activity", "Details"],
  ["2/14/19", "Megan Waterworth", "Abby Johnson", "Food", "milk"],
  ["2/13/19", "Megan Waterworth", "Trish White", "Anecdotal", "Details"],
  ["2/13/19", "Megan Waterworth", "Steven Kitscha", "Activity", "Details"],
  ["2/13/19", "Megan Waterworth", "Katie Clark", "Sleep", "Details"],
  ["2/13/19", "Megan Waterworth", "Nathan Irwin", "Activity", "Details"],
  ["2/13/19", "Megan Waterworth", "Abby Johnson", "Needs", "Details"],
  ["2/13/19", "Megan Waterworth", "Trish White", "Food", "milk"],
  ["2/13/19", "Megan Waterworth", "Steven Kitscha", "Food", "milk"],
  ["2/13/19", "Megan Waterworth", "Emma Jones", "Sleep", "Details"],
  ["2/13/19", "Megan Waterworth", "Fred Barthel", "Sleep", "Fred's Breads"],
  ["2/13/19", "Megan Waterworth", "Collin Zafar", "Sleep", "Details"]]
}

class StudentProfile extends Component{
    constructor(props){
        super(props)
    }
    
    render() {
        return (
          <DataConsumer>
            {store =>
                <div className="student-profile content-page" >
                <div className="button-group">
                  <button type="button" className = "logButton">
                    <div className="text">New Log</div>
                  </button> 
                  <button type="button">Save</button> 
                </div>
                <h2 className="name">Last Name, First Name</h2>
                <br/>
                <label htmlFor="lname">Name:</label> <input type="text" placeholder="Last Name" size ="32"  name="lname" id="lname"/>
                <input type="text" placeholder="First Name" size ="32" name="fname"/>
                <br/>
                <label htmlFor="id">ID:</label> <input type="text" placeholder={store.pageId} size = "3" name="id" id="id"/>
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
                <h2>Logs</h2>
                <Table data={singleStudentTableData} />
              </div>
              }
          </DataConsumer>
        );
      }



}

export default StudentProfile