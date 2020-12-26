import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const Todo = props => (
  <tr>
    <td>
      <Link to={"/sub-list/"+props.todo.name}> {props.todo.name} </Link>
    </td>
    <td>{props.todo.description}</td>
    <td>{props.todo.isdone}</td>
    <td>{props.todo.date.substring(0,10)}</td>
    <td>
      <Link to={"/edit/"+props.todo._id}>edit</Link> |<Link to={"/sub-todo/"+props.todo._id}>add sub</Link>| <a href="#" onClick={() => { props.deleteTodo(props.todo._id) }}>delete</a>
    </td>
  </tr>
)
export default class TodoList extends Component {
  constructor(props){
    super(props);

    this.deleteTodo = this.deleteTodo.bind(this);
    this.state = {todos:[]};
  }

  componentDidMount(){
    axios.get('http://localhost:5000/todos')
    .then(response=>{
      this.setState({todos: response.data});
    })
    .catch((error)=>{
      console.log(error);
    })
  }

  deleteTodo(id) {
    axios.delete('http://localhost:5000/todos/'+id)
      .then(res => console.log(res.data));
    this.setState({
      exercises: this.state.todos.filter(el => el._id !== id)
    })
  }

  todoList() {
    return this.state.todos.map(currenttodo => {
      return <Todo todo={currenttodo} deleteTodo={this.deleteTodo} key={currenttodo._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Logged Todos</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Is Done</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.todoList() }
          </tbody>
        </table>
      </div>
    )
  }
}