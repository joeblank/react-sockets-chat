import React, { Component } from 'react';
import './App.css';
import socketIOClient from 'socket.io-client';
import axios from 'axios';
let socket;


class App extends Component {
  constructor(prosp) {
    super(prosp);
    this.state = {
      baseURL: `${process.env.REACT_APP_DM_ADD}/main-socket`,
      username: '',
      inputValue: '',
      messages: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.username = this.username.bind(this);
  }

  componentDidMount() {
    socket = socketIOClient(this.state.baseURL);
    socket.on('get chat', (msg) => {
      console.log('incoming')
      this.setState({
        messages: [...this.state.messages, msg]
      })
    })
    socket.on('hi', function(msg) {
      console.log('msg', msg)
    })
  }

  username(e) {
    this.setState({ username: e.target.value})
  }

  handleChange(e) {
    this.setState({
      inputValue: e.target.value
    })
  }

  sendMessage(e) {
    e.preventDefault();
    if (this.state.username === '') {
      alert('enter username')
      return;
    }
    socket.emit('new message', {msg: this.state.inputValue, username: this.state.username})
    this.setState({inputValue: ''})
  }

  render() {
    let messages = this.state.messages.map( (msg, i) => {
      return <p key={ i }>{msg.username}: { msg.msg }</p>;
    })
    return (
      <div className="App">
        <h1>/</h1>
        <h2>React/socket.io Chats</h2>
        <input onChange={this.username} placeholder='username' type='' className=''/>
        <form onSubmit={ this.sendMessage.bind(this) }>
          <input 
            onChange={ this.handleChange }
            value={ this.state.inputValue }
            type='' className=''/>
          <button
            type='submit' 
            className=''>connect</button>
        </form>
        <button onClick={()=> axios.get('/test')}>Sha-BAM</button>
       { messages }
      </div>
    );
  }
}

export default App;
