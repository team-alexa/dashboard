import React, { Component } from 'react';
import '../css/SearchableInput.css';

class SearchableInput extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);

    this.state = {
      values: [],
      inputValue: ""
    }
  }

  onChange(e) {
    this.setState({inputValue: e.target.value});
  }

  renderPossibleValues() {
    const filteredValues = this.props.possibleValues.filter(value => {
      return value.toLowerCase().includes(this.state.inputValue.toLowerCase());
    })

    if (this.state.inputValue.length > 0) {
      return (
        <ul className="possible-values">
          {filteredValues.map((value, index) => {
            return <li key={index} onClick={() => this.addValue(value)}>{value}</li>
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
  }

  render() {
    return (
      <div className="searchable-input">
        <p className="label">{this.props.label}</p>
        <div className="main">
          {this.state.values.map((value, index) => {
            return (
              <div className="chip" key={index}>
                <p>{value}</p>
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

export default SearchableInput;
