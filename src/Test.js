import React from 'react';
import socketIOClient from 'socket.io-client';


export default class Test extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        socket: '',
        baseURL: `${process.env.REACT_APP_DM_ADD}/test`,
        username: '',
        inputValue: '',
        messages: []
      }
      this.handleChange = this.handleChange.bind(this);
      this.username = this.username.bind(this);
    }
  
    componentDidMount() {
      let socket = socketIOClient(this.state.baseURL);
      
      socket.on('get chat for test', (msg) => {
          console.log('got mesg', msg)
        this.setState({
          messages: [...this.state.messages, msg]
        })
      })
      this.setState({socket});
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
      this.state.socket.emit('new message', {msg: this.state.inputValue, username: this.state.username})
      this.setState({inputValue: ''})
    }
  
    render() {
      let messages = this.state.messages.map( (msg, i) => {
        return <p key={ i }>{msg.username}: { msg.msg }</p>;
      })
      return (
        <div className="App">
            <h1>/test</h1>
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
         { messages }
        </div>
      );
    }
  }