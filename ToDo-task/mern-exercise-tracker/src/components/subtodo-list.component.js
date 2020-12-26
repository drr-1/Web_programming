import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const Sub = props => (
  <tr>
    <td>{props.sub.name}</td>
    <td>
      <a href="#" onClick={() => { props.deleteSub(props.sub._id) }}>done</a>
    </td>
  </tr>
)
export default class SubTodoList extends Component {
  constructor(props){
    super(props);

    this.deleteSub = this.deleteSub.bind(this);
    this.state = {
        subs:[],
        fiters:[]
    };
  }

  componentDidMount(){
    axios.get('http://localhost:5000/sub')
    .then(response=>{
      this.setState({
          fiters: response.data
        });
    axios.get()
    this.setState({
        subs: this.state.fiters.filter(el => el.parentName === this.props.match.params.name)
    });
    })
    .catch((error)=>{
      console.log(error);
    })
  }

  deleteSub(id) {
    axios.delete('http://localhost:5000/sub/'+id)
      .then(res => console.log(res.data));
    this.setState({
      subs: this.state.subs.filter(el => el._id !== id)
    })
  }

  subList() {
    return this.state.subs.map(currentSub => {
      return <Sub sub={currentSub} deleteSub={this.deleteSub} key={currentSub._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Logged Subs</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.subList() }
          </tbody>
        </table>
      </div>
    )
  }
}