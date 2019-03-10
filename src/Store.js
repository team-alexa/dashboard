import React from 'react'

const Context = React.createContext("")

class DataProvider extends React.Component {
  constructor(props) {
    super(props)

    this.toggleSidebar = this.toggleSidebar.bind(this)
    this.setPage = this.setPage.bind(this)
    this.setPageId = this.setPageId.bind(this)

    this.state = {
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

export {DataProvider, DataConsumer, Context};
