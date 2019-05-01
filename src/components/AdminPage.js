import React, { Component } from 'react';
import '../css/AdminPage.css';
import Table from './Table';

const teacherTempTableData = [
    ["Megan Waterworth", "Yes", "meganwaterworth"],
    ["Fred Barthel", "Yes", "fredbarthel"],
    ["Jake Ainsworth", "Yes", "jakeainsworth"],
    ["Mitchell Kossoris", "Yes", "mitchellkossoris"],
    ["Steven Kitscha", "Yes", "stevenkitscha"],
    ["Bob Bobson", "No", "bobbobson"],
    ["Person Personello", "No", "personpersonello"],
    ["Jimmy Smith", "No", "jimmysmith"],
    ["Hey You", "No", "heyyou"]
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
                    rootAddress="/account/"
                    newLink="/account/new"/>
            </div>
        );
    }
}

export default AdminPage;