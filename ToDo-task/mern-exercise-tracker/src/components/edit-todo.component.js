import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

export default class EditTodo extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeIsdone = this.onChangeIsdone.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: '',
      description: '',
      isdone: false,
      date: new Date()
    }
  }

  componentDidMount() {
    console.log("id:"+ this.props.match.params.id);
    axios.get('http://localhost:5000/todos/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          name: response.data.name,
          description: response.data.description,
          isdone: response.data.isdone,
          date: new Date(response.data.date)
        })   
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onChangeIsdone(e) {
    // this.setState({
    //   duration: e.target.value
    // });
  }

  onChangeDate(date) {
    this.setState({
      date: date
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const todo = {
      name: this.state.name,
      description: this.state.description,
      isdone: this.state.isdone,
      date: this.state.date,
    };

    console.log(todo);

    axios.post('http://localhost:5000/todos/update/'+this.props.match.params.id, todo)
      .then(res => console.log(res.data));
    
    window.location = '/';
  }

  render() {
    return (
      <div>
        <h3>Edit Exercise Log</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Name: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.name}
                onChange={this.onChangeName}
                />
          </div>
          <div className="form-group"> 
            <label>Description: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.description}
                onChange={this.onChangeDescription}
                />
          </div>
          <div className="form-group">
            <label>Is Done: </label>
            <input 
                type="checkbox" 
                className="form-control"
                value={this.state.isdone}
                onChange={this.onChangeIsdone}
                />
          </div>
          <div className="form-group">
            <label>Date: </label>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>

          <div className="form-group">
            <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}