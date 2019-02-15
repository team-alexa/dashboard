import React, { Component } from 'react';
import '../css/StudentProfile.css';

class StudentProfile extends Component{
    constructor(props){
        super(props)
    }
    
    render() {
        return (
            
          <div className={this.props.visible+" studentProfile"} >
            Name:<input type="text" className ={this.props.visible+" input"} placeholder="Last Name" size ="32"  name="lname"/>
           <input type="text" className ={this.props.visible+" input"} placeholder="First Name" size ="32" name="fname"/><br/>
            ID: <input type="text" className ={this.props.visible+" input"} placeholder="1234" size = "3"name="ID"/><br/>
            <p>Age: 2 </p>
             DOB (MM/DD/YYYY):<input type="text" className ={this.props.visible+" input"} size = "1" maxLength="2" placeholder ="01" name="month"/>
            /<input type="text" className ={this.props.visible+" input"} size = "1" maxLength="2" placeholder ="01" name="day"/>
            /<input type="text" className ={this.props.visible+" input"} size = "2" maxLength="4" placeholder ="2017" name="year"/><br/> 
            Food Allergies (Separated by ','):<input type="text" className ={this.props.visible+" input"} size = "64" /><br/>
            Medical Allergies (Separated by ','):<input type="text" className ={this.props.visible+" input"} size = "64" /><br/>
            <p>Teacher: Mukul Goyal </p>
            <p>Logs:</p>
          </div>
        );
      }



}

export default StudentProfile