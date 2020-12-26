import React, { Component } from 'react';
import axios from 'axios';

export default class CreateSubTodo extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      name: '',
      parentName: '',
    };
  }

  componentDidMount(){
    console.log("id:"+ this.props.match.params.id);
    axios.get('http://localhost:5000/todos/'+this.props.match.params.id)
      .then(response => {
        console.log(response.data);
        this.setState({
          parentName: response.data.name
        });
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
  onSubmit(e) {
    e.preventDefault();
    console.log(this.state);
    const newSubTodo = {
      name: this.state.name,
      parentName: this.state.parentName,
    };
    console.log(newSubTodo);
    axios.post('http://localhost:5000/sub/add',newSubTodo)
    .then(res => console.log(res.data));

    
    this.setState({
      name: ''
    })
  }
  render() {
    return (
      <div>
        <h3>Create New Sub Todo</h3>
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
            <input type="submit" value="Create Sub Todo" className="btn btn-primary" />
          </div>
        </form>
    </div>
    )
  }
}