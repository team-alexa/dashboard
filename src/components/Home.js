import React, { Component } from 'react';
import Table from './Table';
import StudentCard from './StudentCard'
import {DataConsumer} from '../Store'
import '../css/Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  generateStudentCards(store) {
    const cards = []
    store.students.forEach(student => {
      cards.push(
        <StudentCard
          name={student[0] + " " + student[1]}
          age={student[3]}
          allergies={student[4]}
        />)
    })
    return cards;
  }

  render() {
    return (
      <DataConsumer>
        {store =>
          <div className="home content-page">
            <h2>Recent Activity</h2>
            <Table data={store.recentActivities}
              width="100%"
              height="400px"
              headers={["Date", "Student", "Teacher", "Category", "Details"]}
              columnWidths={["10%", "20%", "20%", "10%", "40%"]}
              rootAddress="/logs/"/>
            <h2>Your Students</h2>
            <div className="student-cards">
              {this.generateStudentCards(store)}
            </div>
          </div>
        }
      </DataConsumer>
    );
  }
}

export default Home;
