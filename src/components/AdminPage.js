import React, { Component } from 'react';
import '../css/AdminPage.css';
import Table from './Table';

const teacherTempTableData = [
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

class AdminPage extends Component{
    constructor(props){
        super(props)
    }
    
    render() {
        return(
            <div className="admin-page page">
                <h2 class="page-header">Admin Panel</h2>
                <h2>Teachers</h2>
                <Table data={teacherTempTableData}
                    height="400px"
                    width="100%"
                    headers={["Teacher", "Admin"]}
                    columnWidths={["10%", "10%"]}
                    rootAddress="/teachers/" />
            </div>
        );
    }
}

export default AdminPage;