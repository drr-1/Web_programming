import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component"
import TodoList from "./components/todo-list.component";
import EditTodo from "./components/edit-todo.component";
import CreateTodo from "./components/create-todo.component";
import CreateSubTodo from "./components/create-subTodo.component";
import SubTodoList from "./components/subtodo-list.component";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br/>
        <Route path="/" exact component={TodoList} />
        <Route path="/edit/:id" component={EditTodo} />
        <Route path="/create" component={CreateTodo} />
        <Route path="/sub-todo/:id" component={CreateSubTodo} />
        <Route path="/sub-list/:name" component={SubTodoList}/>
      </div>
    </Router>
  );
}

export default App;
