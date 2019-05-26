import React, { Component } from 'react';
import '../css/AdminPage.css';
import Table from './Table';
import { Context } from "../Store";

class AdminPage extends Component{
    constructor(props){
        super(props)
        this.getTeacherTableData = this.getTeacherTableData.bind(this);
    }
    getTeacherTableData() {  
        return Object.keys(this.context.teachers).map(teacher => {
            teacher = this.context.teachers[teacher];
          if(teacher.status === "active"){
            return [teacher.fullName, teacher.role, teacher.teacherID]
            }
          })
    }
  
    render() {
        if(this.context.currentUser.role === "admin"){
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
        else{
            return(
                <div className="error-page content-page">
                    <h2>Uh oh, you've made a wrong turn!</h2>
                </div>
            );
        }
    }
}
AdminPage.contextType = Context;
export default AdminPage;