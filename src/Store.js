import React from 'react'

const Context = React.createContext("")
const recentActivities = [
  ["2/14/19", "Jon Snow", "Sophia Hills", "Food", "Jon ate 1 slice of watermelon, a cup of milk, and a ham and cheese sandwich.", "log1"],
  ["2/14/19", "Princess Consuela BananaHammock", "Jack Baker", "Anecdotal", "Details", "log2"],
  ["2/14/19", "Katie Clark", "Emma Jones", "Sleep", "Details", "log3"],
  ["2/14/19", "Jack Baker", "Fred Barthel", "Sleep", "Details", "log4"],
  ["2/14/19", "Emma Jones", "Nathan Irwin", "Activity", "Details", "log5"],
  ["2/14/19", "Sophia Hills", "Abby Johnson", "Needs", "Details", "log6"],
  ["2/13/19", "Nathan Irwin", "Trish White", "Anecdotal", "Details", "log7"],
  ["2/13/19", "Megan Waterworth", "Steven Kitscha", "Activity", "Details", "log8"],
  ["2/13/19", "Steven Kitscha", "Katie Clark", "Sleep", "Details", "log9"],
  ["2/13/19", "Fred Barthel", "Collin Zafar", "Sleep", "Details", "log10"],
  ["2/13/19", "Isabella Trott", "Megan Waterworth", "Activity", "Details", "log11"],
  ["2/13/19", "Trish White", "Jake Ainsworth", "Anecdotal", "Details", "log12"],
  ["2/12/19", "Jake Ainsworth", "Jon Snow", "Food", "Details", "log13"],
  ["2/12/19", "Hannah Patel", "Hannah Patel", "Sleep", "Details", "log14"],
  ["2/12/19", "Collin Zafar", "Isabella Trott", "Needs", "Details", "log15"],
  ["2/12/19", "Cameron Frank", "Cameron Frank", "Sleep", "Details", "log16"],
  ["2/14/19", "Jon Snow", "Sophia Hills", "Food", "Jon ate 1 slice of watermelon, a cup of milk, and a ham and cheese sandwich.", "log17"],
  ["2/14/19", "Princess Consuela BananaHammock", "Jack Baker", "Anecdotal", "Details", "log18"],
  ["2/14/19", "Katie Clark", "Emma Jones", "Sleep", "Details", "log19"],
  ["2/14/19", "Jack Baker", "Fred Barthel", "Sleep", "Details", "log20"],
  ["2/14/19", "Emma Jones", "Nathan Irwin", "Activity", "Details", "log21"],
  ["2/14/19", "Sophia Hills", "Abby Johnson", "Needs", "Details", "log22"],
  ["2/13/19", "Nathan Irwin", "Trish White", "Anecdotal", "Details", "log33"],
  ["2/13/19", "Megan Waterworth", "Steven Kitscha", "Activity", "Details", "log35"],
  ["2/13/19", "Steven Kitscha", "Katie Clark", "Sleep", "Details", "log311"],
  ["2/13/19", "Fred Barthel", "Collin Zafar", "Sleep", "Details", "log385"],
  ["2/13/19", "Isabella Trott", "Megan Waterworth", "Activity", "Details", "log302"],
  ["2/13/19", "Trish White", "Jake Ainsworth", "Anecdotal", "Details", "log67"],
  ["2/12/19", "Jake Ainsworth", "Jon Snow", "Food", "Details", "log66"],
  ["2/12/19", "Hannah Patel", "Hannah Patel", "Sleep", "Details", "log24"],
  ["2/12/19", "Collin Zafar", "Isabella Trott", "Needs", "Details", "log95"],
  ["2/12/19", "Cameron Frank", "Cameron Frank", "Sleep", "Details", "log23"]
]

const students = [
  ["Jon", "Snow", "Sophia Hills", "3", "N/A", "jonsnow"],
  ["Katie", "Clark", "Emma Jones", "2", "N/A", "katieclark"],
  ["Jack", "Baker", "Fred Barthel", "1", "Peanuts and fish", "jackbaker"],
  ["Emma", "Jones", "Nathan Irwin", "3", "N/A", "emmajones"],
  ["Sophia", "Hills", "Abby Johnson", "1", "N/A", "sophiahills"],
  ["Nathan", "Irwin", "Trish White", "4", "Dairy, gluten, and tree nuts", "nathanirwin"],
  ["Megan", "Waterworth", "Steven Kitscha", "3", "N/A", "meganwaterworth"],
  ["Steven", "Kitscha", "Katie Clark", "5", "N/A", "stevenkitscha"],
  ["Fred", "Barthel", "Collin Zafar", "3", "N/A", "fredbarthel"],
  ["Isabella", "Trott", "Megan Waterworth", "1", "N/A", "isabellatrott"],
  ["Trish", "White", "Jake Ainsworth", "3", "N/A", "trishwhite"],
  ["Jake", "Ainsworth", "Jon Snow", "3", "Everything :(", "jakeainsworth"],
  ["Hannah", "Patel", "Hannah Patel", "5", "N/A", "hannahpatel"],
  ["Collin", "Zafar", "Isabella Trott", "3", "N/A", "collinzafar"],
  ["Cameron", "Frank", "Cameron Frank", "3", "N/A", "cameronfrank"],
  ["Jon", "Snow", "Sophia Hills", "3", "N/A", "jonsnow"],
  ["Katie", "Clark", "Emma Jones", "2", "N/A", "katieclark"],
  ["Jack", "Baker", "Fred Barthel", "1", "Peanuts and fish", "jackbaker"],
  ["Emma", "Jones", "Nathan Irwin", "3", "N/A", "emmajones"],
  ["Sophia", "Hills", "Abby Johnson", "1", "N/A", "sophiahills"],
  ["Nathan", "Irwin", "Trish White", "4", "Dairy, gluten, and tree nuts", "nathanirwin"],
  ["Megan", "Waterworth", "Steven Kitscha", "3", "N/A", "meganwaterworth"],
  ["Steven", "Kitscha", "Katie Clark", "5", "N/A", "stevenkitscha"],
  ["Fred", "Barthel", "Collin Zafar", "3", "N/A", "fredbarthel"],
  ["Isabella", "Trott", "Megan Waterworth", "1", "N/A", "isabellatrott"],
  ["Trish", "White", "Jake Ainsworth", "3", "N/A", "trishwhite"],
  ["Jake", "Ainsworth", "Jon Snow", "3", "Everything :(", "jakeainsworth"],
  ["Hannah", "Patel", "Hannah Patel", "5", "N/A", "hannahpatel"],
  ["Collin", "Zafar", "Isabella Trott", "3", "N/A", "collinzafar"],
  ["Cameron", "Frank", "Cameron Frank", "3", "N/A", "cameronfrank"]
]

class DataProvider extends React.Component {
  constructor(props) {
    super(props)

    this.toggleSidebar = this.toggleSidebar.bind(this)
    this.setPage = this.setPage.bind(this)
    this.setPageId = this.setPageId.bind(this)

    this.state = {
      recentActivities,
      students,
      page: "home",
      pageId: "",
      currentUser: "Mitchell",
      sidebarClass: "open",

      toggleSidebar: this.toggleSidebar,
      setPage: this.setPage,
      setPageId: this.setPageId
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

  setPageId(pageId) {
    if (this.state.pageId != pageId)
      this.setState({pageId})
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
