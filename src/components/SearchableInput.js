import React, { Component } from 'react';
import '../css/SearchableInput.css';
import { withRouter } from "react-router";
class SearchableInput extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);

    this.state = {
      values: props.values || [],
      inputValue: "",
      receivedVals: false
    }
  }

  onChange(e) {
    this.setState({inputValue: e.target.value});
  }

  renderPossibleValues() {
    const filteredValues = this.props.possibleValues.filter(value => {
      return value.fullName.toLowerCase().includes(this.state.inputValue.toLowerCase());
    })

    if (this.state.inputValue.length > 0) {
      return (
        <ul className="possible-values">
          {filteredValues.map((value, index) => {
            return <li key={index} onClick={() => this.addValue(value.fullName)}>{value.fullName}</li>
          })}
        </ul>
      )
    } else return
  }

  removeValue(index) {
    const values = this.state.values.slice()
    values.splice(index, 1)

    this.setState({values});
  }

  addValue(value) {
    const values = this.state.values.slice()
    values.push(value)

    this.setState({values, inputValue: ""});
    if (this.props.addValue) {
      this.props.addValue(value)
    }
  }

  componentWillReceiveProps(props) {
    if (props.values && !this.state.receivedVals) {
      this.setState({values: props.values, receivedVals: true})
    }
  }
  navigateTo(path) {
    this.props.history.push({pathname: path})
  }
  render() {
    return (
      <div className="searchable-input" onClick={this.props.onClick}>
        <p className="label">{this.props.label}</p>
        <div className="main">
          {this.state.values.map((value, index) => {
            return (
              <div className="chip" key={index}>
                <p onClick={() =>{
                  if(this.props.placeholder==="Teacher")
                  {  
                    this.navigateTo("../account/"+this.props.possibleValues[this.props.possibleValues.map(function(x) {return x.fullName; }).indexOf(value)].teacherID)
                  }
                  else{
                    this.navigateTo("../students/"+this.props.possibleValues[this.props.possibleValues.map(function(x) {return x.fullName; }).indexOf(value)].studentID)
                  }
                }}> {value}</p>
                <p onClick={() => this.removeValue(index)}>x</p>
              </div>
            )
          })}
          {this.state.values.length < this.props.limit ? 
            <input type="text"
              placeholder={this.props.placeholder}
              value={this.state.inputValue}
              onChange={this.onChange}>
            </input> :
            null
          }
          {this.renderPossibleValues()}
        </div>
      </div>
    );
  }
}

export default withRouter(SearchableInput);