import React from 'react'

const Context = React.createContext("")
const studentData = {
  headers: ["Date", "Student", "Teacher", "Category", "Details"],
  spacing: ["10%", "20%", "20%", "10%", "40%"],
  data: [["2/14/19", "Jon Snow", "Sophia Hills", "Food", "Jon ate 1 slice of watermelon, a cup of milk, and a ham and cheese sandwich."],
  ["2/14/19", "Princess Consuela BananaHammock", "Jack Baker", "Anecdotal", "Details"],
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
  ["2/12/19", "Cameron Frank", "Cameron Frank", "Sleep", "Details"]]
}

class DataProvider extends React.Component {
  constructor(props) {
    super(props)

    this.toggleSidebar = this.toggleSidebar.bind(this)
    this.setPage = this.setPage.bind(this)

    this.state = {
      studentData: studentData,
      page: "home",
      currentUser: "Megan",
      sidebarClass: "open",

      toggleSidebar: this.toggleSidebar,
      setPage: this.setPage
    }
  }

  toggleSidebar() {
    if(this.state.sidebarClass == "close"){
      this.setState({sidebarClass: "open"})
    } else{
      this.setState({sidebarClass: "close"})
    }
  }

  setPage(page) {
    if (this.state.page != page)
      this.setState({page})
  }

  render() {
    return <Context.Provider value={this.state}>
      {this.props.children}
    </Context.Provider>
  }
}

class DataConsumer extends React.Component {
  render() {
    return <Context.Consumer>{this.props.children}</Context.Consumer>
  }
}

export {DataProvider, DataConsumer};