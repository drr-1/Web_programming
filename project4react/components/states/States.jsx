import React from 'react';
import './States.css';
import Header from '../header/Header';

/**
 * Define States, a React componment of CS142 project #4 problem #2.  The model
 * data for this view (the state names) is available
 * at window.cs142models.statesModel().
 */
class States extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      states: window.cs142models.statesModel(),
      searchVal:''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({searchVal: event.target.value});
  }

  handleSubmit(event) {
    // alert('A name was submitted: ' + this.state.searchVal);
    event.preventDefault();
  }
  render() {
    this.state.states2=this.state.states;
    var name;
    return (
      <div>
        <Header/>
          <label>
            Name:
            <input type="text" value={this.state.searchVal} onChange={this.handleChange} />
          </label>

        {/* {this.state}; */}
        {this.state.states.filter(st => st.includes(this.state.searchVal)).map(st => (
          <li>
            {st}
          </li>
         ))}
      </div>
    );
  }
}

export default States;
