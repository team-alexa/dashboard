import React from 'react'

const Context = React.createContext("")

class DataProvider extends React.Component {
  constructor(props) {
    super(props)

    this.toggleSidebar = this.toggleSidebar.bind(this)
    this.setContentLoading = this.setContentLoading.bind(this)
    this.setPage = this.setPage.bind(this)
    this.setPageId = this.setPageId.bind(this)
    this.setTeachers = this.setTeachers.bind(this)
    this.setToast = this.setToast.bind(this)

    this.state = {
      page: "home",
      pageId: "",
      currentUser: "Mitchell",
      sidebarClass: "open",
      contentLoading: false,
      toast: {
        message: "",
        color: "red",
        visible: false
      },
      teachers: [],

      toggleSidebar: this.toggleSidebar,
      setContentLoading: this.setContentLoading,
      setPage: this.setPage,
      setPageId: this.setPageId,
      setTeachers: this.setTeachers,
      setToast: this.setToast,
    }
  }

  toggleSidebar() {
    if(this.state.sidebarClass == "close"){
      this.setState({sidebarClass: "open"})
    } else{
      this.setState({sidebarClass: "close"})
    }
  }

  setContentLoading(state) {
    this.setState({contentLoading: state})
  }

  setPage(page) {
    if (this.state.page != page)
      this.setState({page})
  }

  setPageId(pageId) {
    if (this.state.pageId != pageId)
      this.setState({pageId})
  }

  setToast(params) {
    const newToast = {
      message: params.message || this.state.toast.message,
      color: params.color || this.state.toast.color,
      visible: params.visible != undefined ? params.visible : this.state.toast.visible
    }
    this.setState({toast: newToast})
  }

  setTeachers(teachers) {
    this.setState({teachers})
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
