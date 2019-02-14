import React, { Component } from 'react';
import Table from './Table';
import '../css/Home.css';

const data = [
  ["Date", "Student", "Teacher", "Category", "Details"],
  ["2/14/19", "Jon Snow", "Sophia Hills", "Food", "Details"],
  ["2/14/19", "Abby Johnson", "Jack Baker", "Anecdotal", "Details"],
  ["2/14/19", "Katie Clark", "Emma Jones", "Sleep", "Details"],
  ["2/14/19", "Jack Baker", "Fred Barthel", "Sleep", "Details"],
  ["2/14/19", "Emma Jones", "Nathan Irwin", "Activity", "Details"],
  ["2/14/19", "Sophia Hills", "Abby Johnson", "Needs", "Details"],
  ["2/13/19", "Nathan Irwin", "Trish White", "Anecdotal", "Details"],
  ["2/13/19", "Megan Waterworth", "Steven Kitscha", "Activity", "Details"],
  ["2/13/19", "Steven Kitscha", "Katie Clark", "Sleep", "Details"],
  ["2/13/19", "Fred Barthel", "Collin Zafar", "Sleep", "Details"],
  ["2/13/19", "Isabella Trott", "Megan Waterworth", "Activity", "Details"],
  ["2/13/19", "Trish White", "Jake Ainsworth", "Anecdotal", "Details"],
  ["2/12/19", "Jake Ainsworth", "Jon Snow", "Food", "Details"],
  ["2/12/19", "Hannah Patel", "Hannah Patel", "Sleep", "Details"],
  ["2/12/19", "Collin Zafar", "Isabella Trott", "Needs", "Details"],
  ["2/12/19", "Cameron Frank", "Cameron Frank", "Sleep", "Details"],
]

class Home extends Component {
  render() {
    return (
      <div className="home">
        <h2>Recent Activity</h2>
        <Table data={data} />
      </div>
    );
  }
}

export default Home;
