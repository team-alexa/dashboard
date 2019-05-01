import React from 'react'
import Constants from './Constants'
import { Auth } from 'aws-amplify';

const Context = React.createContext("")

class DataProvider extends React.Component {
  constructor(props) {
    super(props)

    this.loadTeachers = this.loadTeachers.bind(this)
    this.loadStudents = this.loadStudents.bind(this)
    this.loadMoreLogs = this.loadMoreLogs.bind(this)
    this.toggleSidebar = this.toggleSidebar.bind(this)
    this.setContentLoading = this.setContentLoading.bind(this)
    this.setPage = this.setPage.bind(this)
    this.setPageId = this.setPageId.bind(this)
    this.setTeachers = this.setTeachers.bind(this)
    this.setToast = this.setToast.bind(this)
    this.setStudents = this.setStudents.bind(this)
    this.logOut = this.logOut.bind(this)
    this.loadUserData = this.loadUserData.bind(this)
    this.setLogs = this.setLogs.bind(this)
    this.onChangeUserData = this.onChangeUserData.bind(this)

    this.state = {
      page: "home",
      pageId: "",
      currentUser: {
        firstName: "",
        lastName: "",
        teacherID: "",
        email: "",
        hasChanged: "",
        students: []
      },
      sidebarClass: "open",
      contentLoading: false,
      toast: {
        message: "",
        color: "red",
        visible: false
      },
      teachers: {},
      students: {},
      logs: [],

      loadTeachers: this.loadTeachers,
      loadStudents: this.loadStudents,
      loadMoreLogs: this.loadMoreLogs,
      toggleSidebar: this.toggleSidebar,
      setContentLoading: this.setContentLoading,
      setPage: this.setPage,
      setPageId: this.setPageId,
      setTeachers: this.setTeachers,
      setToast: this.setToast,
      setStudents: this.setStudents,
      logOut: this.logOut,
      loadUserData:this.loadUserData,
      setLogs: this.setLogs,
      onChangeUserData: this.onChangeUserData,
    }
  }

  loadTeachers() {
    if (Object.keys(this.state.teachers).length == 0) {
      this.setContentLoading(true)
      fetch(Constants.apiUrl + "teachers")
          .then(response => response.json())
          .then(data => {
            const teachers = {}
            data.forEach(teacher => {
              teachers[teacher.teacherID] = teacher
            })
            this.setTeachers(teachers)
            this.setContentLoading(false)
          })
    }
  }

  loadStudents() {
    this.setContentLoading(true)
    fetch(Constants.apiUrl + 'students')
      .then(response => response.json())
      .then(data => {
        const students = {}
        data.forEach(student => {
          students[student.studentID] = student
        })
        this.setStudents(students)
        this.setContentLoading(false)
      })
  }

  loadMoreLogs() {
    this.setContentLoading(true)
    fetch(Constants.apiUrl + 'logs?index=' + this.state.logs.length)
      .then(response => response.json())
      .then(data => {
        const logs = this.state.logs.slice()
        this.setLogs(logs.concat(data))
        this.setContentLoading(false)
      })
  }

  loadUserData(currentUser){
    this.setContentLoading(true)
    fetch(Constants.apiUrl + 'teachers?teacherID=' + currentUser.username)
      .then(response => response.json())
      .then(data => {
        if (data[0]) {
          const user = this.state.currentUser
          Object.assign(user, data[0])
          Object.assign(user, currentUser)
          user.email = currentUser.attributes.email
          this.setState({currentUser: user})
        }
        this.setContentLoading(false)
      })

    fetch(Constants.apiUrl + 'students?teacherID=' + currentUser.username)
      .then(response => response.json())
      .then(data => {
        const user = this.state.currentUser
        user.students = data
        this.setState({currentUser: user})
      })
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

  setToast(params, time = 2000) {
    const newToast = {
      message: params.message || this.state.toast.message,
      color: params.color || this.state.toast.color,
      visible: params.visible != undefined ? params.visible : this.state.toast.visible
    }
    this.setState({toast: newToast})

    setTimeout(function() {
      newToast.visible = false
      this.setState({toast: newToast})
    }.bind(this), time)
  }

  setTeachers(teachers) {
    this.setState({teachers})
  }

  setStudents(students) {
    this.setState({students})
  }

  setLogs(logs) {
    this.setState({logs})
  }

  onChangeUserData(e) {
    var user = {...this.state.currentUser}
    user[e.target.id] = e.target.value    
    user.hasChanged = true
    this.setState({currentUser: user});
 }
 
  logOut(){
      Auth.signOut()
        .then(data => console.log(data))
        .catch(err => console.log(err));
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
