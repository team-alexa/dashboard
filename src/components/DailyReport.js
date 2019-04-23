import jsPDF from 'jspdf';
import React, { Component } from 'react';
import '../css/DailyReport.css';  
import closebutton from '../img/close-button.png'
import Constants from '../Constants'
import Table from './Table';
import { Context } from '../Store'
require('jspdf-autotable')
class DailyReport extends Component{
    constructor(props){
        super(props);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.getLogTableData = this.getLogTableData.bind(this);
        this.exportDailyLogs=this.exportDailyLogs.bind(this);
        this.getDailyLogsExport=this.getDailyLogsExport.bind(this);
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
      getDailyLogsExport() {
        const logs = this.props.dailyLogs
        return logs.map(log => {
          return [log.date,
            log.studentFullName,
            log.teacherFullName,
            log.activityType,
            log.activityDetails]
        })
      }
exportDailyLogs() {
 
  var doc = new jsPDF();
  var totalPagesExp = "{total_pages_count_string}";
     // Header
     doc.setFontSize(20);
     doc.setTextColor(40);
     doc.setFontStyle('normal');
    // doc.addImage(base64logo,'png',1000,500);
     doc.text(this.props.lastName+","+this.props.firstName,15,20);
  doc.autoTable({
    head: [["Date", "Student", "Teacher", "Category", "Details"]],
    body: this.getDailyLogsExport(),
    startY: 25,
});
  doc.save('DailyReport.pdf');
};
    render() {
        return (
          <div className='modal'>
            <div className='modal_inner'>
            <button type="close" className="close-button" onClick={this.props.close}><img src={closebutton}/></button>
            <Table data={this.getLogTableData()}
              height="80%"
              width="99%"
              headers={["Date", "Student", "Teacher", "Category", "Details"]}
              columnWidths={["10%", "20%", "20%", "10%", "40%"]}
              rootAddress="/logs/"
            />
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