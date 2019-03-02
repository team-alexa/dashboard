import React, { Component } from 'react';
import '../css/AdminPage.css';
import {DataConsumer} from '../Store'
import Table from './Table';

const teacherTempTableData = {
  width: "100%",
  height: "400px",
  headers: ["Teacher", "Admin"],
  columnWidths: ["10%", "10%"],
  data: [
      ["Megan Waterworth", "Yes"],
      ["Fred Barthel", "Yes"],
      ["Jake Ainsworth", "Yes"],
      ["Mitchell Kossoris", "Yes"],
      ["Steven Kitscha", "Yes"],
      ["Bob Bobson", "No"],
      ["Person Personello", "No"],
      ["Jimmy Smith", "No"],
      ["Hey You", "No"]
        ]
}

class AdminPage extends Component{
    constructor(props){
        super(props)
    }
    
    render() {
        return(
            <DataConsumer>
            {store =>
                <div className="admin-page page">
                    <h2 class="header1">{store.currentUser}</h2>
                    <h2 class="sub-header">Teachers</h2>
                    <Table data={teacherTempTableData}/>
                </div>
            }
            </DataConsumer>
        );
    }
}

export default AdminPage;