import * as jsPDF from 'jspdf';
import React, { Component } from 'react';
import '../css/DailyReport.css';  
import Table from './Table';
import { Context } from '../Store'
import main_logo from '../img/main_logo'
require('../fonts/Google Sans.js');
require('jspdf-autotable');
class DailyReport extends Component{
    constructor(props){
        super(props);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.getLogTableData = this.getLogTableData.bind(this);
        this.exportDailyLogs=this.exportDailyLogs.bind(this);
        this.getDailyLogsExport=this.getDailyLogsExport.bind(this);
        this.formatDate=this.formatDate.bind(this);
      }
    componentDidMount(){
        document.addEventListener("keydown", this.handleKeyPress, false);
      }
    componentWillUnmount(){
        document.removeEventListener("keydown", this.handleKeyPress, false);
      }
    handleKeyPress(event){
        if(event.keyCode === 27) {
            this.props.close()
        }
      }
    getLogTableData() {
        const logs = this.props.dailyLogs
        return logs.map(log => {
          return [log.date,
            log.studentFullName,
            log.teacherFullName,
            log.activityType,
            log.activityDetails,
            log.logID]
        })
      }
      formatDate(datetime){
        var time=new Date(datetime)
        return time.toLocaleTimeString('en-US');
      }
      getDailyLogsExport() {
        const logs = this.props.dailyLogs
        return logs.map(log => {
          return [this.formatDate(log.date),
            log.teacherFullName,
            log.activityType,
            log.activityDetails]
        })
      }
exportDailyLogs() {
 
  var pdf = new jsPDF('l', 'px', 'a4');
     // Header
      pdf.setFontSize(12);
      pdf.setFont('arial');
      pdf.addImage(main_logo,'JPEG',(pdf.internal.pageSize.getWidth()/2),10,70,40);
      pdf.text(this.props.lastName+", "+this.props.firstName+" - "+this.props.date+" Report ",15,60);
      pdf.autoTable({
        styles: {font: 'arial',overflow: 'linebreak',rowPageBreak: 'auto'},
        columnStyles: {
          0: {cellWidth:10},
          1: {cellWidth: 'auto'},
          2: {cellWidth: 10},
          3: {cellWidth: 'auto'}},
        margin: 10,
        headStyles:{fillColor: [0, 159, 194],font: 'arial'},
        head: [["Time", "Teacher", "Category", "Details"]],
        body: this.getDailyLogsExport(),
        startY: 70,
      });
  pdf.save(this.props.firstName+" "+this.props.lastName+" - " +this.props.date);
};
    render() {
        return (
          <div className='modal'>
            <div className='modal_inner'>
            <h2>Daily Report</h2>
            <button type="close" className="close-button" onClick={this.props.close}>x</button>
            <Table data={this.getLogTableData()}
              height="80%"
              width="99%"
              headers={["Date", "Student", "Teacher", "Category", "Details"]}
              columnWidths={["10%", "20%", "20%", "10%", "40%"]}
              rootAddress="/logs/"/>
            <div className='Export'>
            <button className="Export-Data" type="button" onClick={this.exportDailyLogs}>Export Logs</button> 
            </div>
            </div>
            </div>
        );
      }
      
}  
DailyReport.contextType = Context;
export default DailyReport;