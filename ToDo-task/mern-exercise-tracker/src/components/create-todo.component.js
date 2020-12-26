import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateTodo extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeIsDone.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeParentId = this.onChangeParentId.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: '',
      description: '',
      isdone: false,
      date: new Date(),
      parentId: '',
      subTodos: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/sub-todo')
    .then(response =>{
      if(response.data.length > 0){
        this.setState({
          subTodos: response.data.map( subTodo => subTodo.name),
          name: response.data[0].name
        })
      }
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

  onChangeIsDone() {
    // this.setState({
    //   isdone: true
    // });
  }

  onChangeDate(date) {
    this.setState({
      date: date
    });
  }

  onChangeParentId(e) {
    this.setState({
      parentId: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
  
    const todo = {
      name: this.state.name,
      description: this.state.description,
      isdone: this.state.isdone,
      date: this.state.date,
      parentId: this.state.parentId
    };
  
    console.log(todo);
    
    axios.post('http://localhost:5000/todos/add',todo)
    .then(res => console.log(res.data));


    window.location = '/';
  }

  render() {
    return (
      <div>
        <h3>Create New ToDo Log</h3>
        <form onSubmit={this.onSubmit}>
          {/* <div className="form-group"> 
            <label>Name: </label>
            <select ref="sub"
                required
                className="form-control"
                value={this.state.name}
                onChange={this.onChangeName}>
                {
                  this.state.subTodos.map(function(subTodo) {
                    return <option 
                      key={subTodo}
                      value={subTodo}>{subTodo}
                      </option>;
                  })
                }
            </select>
          </div> */}
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
                onChange={this.onChangeIsDone}
                />
          </div>
          <div className="form-group">
            <label>Date: </label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>

          <div className="form-group">
            <input type="submit" value="Create Todo Log" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}