import React, { Component } from 'react';
import Table from './Table';
import StudentCard from './StudentCard'
import {DataConsumer} from '../Store'
import '../css/Home.css';

class Home extends Component {

  generateStudentCards(store) {
    const cards = []
    store.students.data.forEach(student => {
      cards.push(
        <StudentCard name={student[0] + " " + student[1]}
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
            <Table data={store.recentActivities} />
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
