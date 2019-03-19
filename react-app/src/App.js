import React, { Component } from 'react';
import axios from 'axios';

import './App.css';

class App extends Component {
  state = {
    users: [],
  };

  componentDidMount() {
    this.getUsers();
  }

  getUsers() {
    axios.get('http://localhost:4000/api/users/')
    .then(res => {
      console.log(res.data);
      this.setState({
        users:[...res.data]
      });
    })
    .catch(err => console.log(err));
  }

  deleteUser = e => {
    axios.delete(`http://localhost:4000/api/users/${e.target.id}`)
      .then(res => {
        console.log(res.data);
        this.getUsers();
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        {this.state.users.map(user => {
          return (
            <div className="userCard" key={user.id}>
            <p>Name: {user.name}</p>
            <p>Bio: {user.bio}</p>
            <button id={user.id} onClick={this.deleteUser}>DELETE</button>
            </div>
          )
        })}
      </div>
    );
  }
}

export default App;
