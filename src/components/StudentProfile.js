import React, { Component } from 'react';
import '../css/StudentProfile.css';
import {DataConsumer} from '../Store'
import Table from './Table';
import SearchableInput from './SearchableInput'

const singleStudentTableData = [
  ["2/14/19", "Megan Waterworth", "Sophia Hills", "Food", "milk", "log1"],
  ["2/14/19", "Megan Waterworth", "Jack Baker", "Anecdotal", "Details", "log12"],
  ["2/14/19", "Megan Waterworth", "Emma Jones", "Food", "milk", "log1"],
  ["2/14/19", "Megan Waterworth", "Fred Barthel", "Food", "Fred's Breads", "log142"],
  ["2/14/19", "Megan Waterworth", "Nathan Irwin", "Activity", "Details", "log52"],
  ["2/14/19", "Megan Waterworth", "Abby Johnson", "Food", "milk", "log12"],
  ["2/13/19", "Megan Waterworth", "Trish White", "Anecdotal", "Details", "log55"],
  ["2/13/19", "Megan Waterworth", "Steven Kitscha", "Activity", "Details", "log25"],
  ["2/13/19", "Megan Waterworth", "Katie Clark", "Sleep", "Details", "log105"],
  ["2/13/19", "Megan Waterworth", "Nathan Irwin", "Activity", "Details", "log42"],
  ["2/13/19", "Megan Waterworth", "Abby Johnson", "Needs", "Details", "log68"],
  ["2/13/19", "Megan Waterworth", "Trish White", "Food", "milk", "log22"],
  ["2/13/19", "Megan Waterworth", "Steven Kitscha", "Food", "milk", "log53"],
  ["2/13/19", "Megan Waterworth", "Emma Jones", "Sleep", "Details", "log24"],
  ["2/13/19", "Megan Waterworth", "Fred Barthel", "Sleep", "Fred's Breads", "log95"],
  ["2/13/19", "Megan Waterworth", "Collin Zafar", "Sleep", "Details", "log72"]
]

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
                <label htmlFor="id">ID:</label> <input type="text" placeholder={store.pageId} size = "10" name="id" id="id"/>
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
                <SearchableInput
                  placeholder="Teacher"
                  label="Teacher: "
                  limit={2}
                  possibleValues={["Mitchell", "Megan", "Fred", "Hello world", "Fred", "Jake", "Steven", "Meegs", "Phteven"]}/>
                <br/>
                <h2>Logs</h2>
                <Table data={singleStudentTableData}
                  width="100%"
                  height="400px"
                  headers={["Date", "Student", "Teacher", "Category", "Details"]}
                  columnWidths={["10%", "20%", "20%", "10%", "40%"]}
                  rootAddress="/logs/" />
              </div>
              }
          </DataConsumer>
        );
      }



}

export default StudentProfile