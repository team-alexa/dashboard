import React, { Component } from 'react';
import '../css/AdminPage.css';
import Table from './Table';
import { Context } from "../Store";

//const teacherTempTableData = [
//    ["Megan Waterworth", "Yes", "meganwaterworth"],
//    ["Fred Barthel", "Yes", "fredbarthel"],
//    ["Jake Ainsworth", "Yes", "jakeainsworth"],
//    ["Mitchell Kossoris", "Yes", "mitchellkossoris"],
//    ["Steven Kitscha", "Yes", "stevenkitscha"],
//    ["Bob Bobson", "No", "bobbobson"],
//    ["Person Personello", "No", "personpersonello"],
//    ["Jimmy Smith", "No", "jimmysmith"],
//    ["Hey You", "No", "heyyou"]
//]

class AdminPage extends Component{
    constructor(props){
        super(props)
        this.getTeacherTableData = this.getTeacherTableData.bind(this);
    }
    getTeacherTableData() {  
    return Object.keys(this.context.teachers).map(teacher => {
        teacher = this.context.teachers[teacher];
      return [
        teacher.fullName, teacher.role, teacher.teacherID]
    })
  }
    render() {
        return(
            <div className="admin-page page content-page">
                <h2>Teachers</h2>
                <Table data={this.getTeacherTableData()}
                    height="400px"
                    width="100%"
                    headers={["Name", "Role"]}
                    columnWidths={["50%", "50%"]}
                    rootAddress="/account/"
                    newLink="/account/new"/>
            </div>
        );
    }
}
AdminPage.contextType = Context;
export default AdminPage;