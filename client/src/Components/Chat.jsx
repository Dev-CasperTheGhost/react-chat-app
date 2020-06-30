import React, { Component } from 'react';
import io from 'socket.io-client';
import qs from 'qs';
const socket = io('http://localhost:3001');

export default class Chat extends Component {
  constructor() {
    super();

    this.state = {
      message: '',
      username: '',
      messages: [],
    };
  }

  componentDidMount() {
    socket.on('message', (message) => {
      this.setState({
        messages: [...this.state.messages, message],
      });

      const chatMessages = document.querySelector('.chat-messages');
      chatMessages.scrollTop = chatMessages.scrollHeight;
    });

    const { username } = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true,
    });

    this.setState({
      username: username,
    });

    socket.emit('joined', { username, id: socket.id });
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { message } = this.state;

    if (message === '' || !message) return;

    socket.emit('chatMessage', message);

    // Clear input
    this.setState({
      message: '',
    });
  };

  render() {
    const { message, messages, username } = this.state;
    const messagesMapped = messages.map((item, index) => {
      return (
        <div key={index} className='message'>
          <div className='message-header'>
            {item.username === username ? 'You' : item.username}
          </div>
          <div className='message-body'>{item.message}</div>
        </div>
      );
    });
    return (
      <div className='chat-container'>
        <div className='chat'>
          <div className='chat-header'>
            <h2>Chat</h2>
          </div>
          <div className='chat-messages'>{messagesMapped}</div>
          <form onSubmit={this.onSubmit} className='chat-form'>
            <input
              className='form-input send-input'
              type='text'
              name='message'
              id='message'
              value={message}
              onChange={this.onChange}
              placeholder='Enter message...'
              required
            />
            <button className='send-message form-input' type='submit'>
              Send
            </button>
          </form>
        </div>
      </div>
    );
  }
}
