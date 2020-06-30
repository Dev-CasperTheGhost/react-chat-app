import React, { Component } from 'react';

export default class Index extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
    };
  }

  onChange = (e) => {
    this.setState({
      username: e.target.value,
    });
  };

  render() {
    const { username } = this.state;
    return (
      <div className='username-container'>
        <form action='/chat'>
          <h3>Please enter a username</h3>
          <div className='form-group'>
            <label htmlFor='username'>Enter Username</label>
            <input
              className='form-input'
              type='text'
              name='username'
              id='username'
              onChange={this.onChange}
              value={username}
              required
            />
          </div>
          <div className='form-group'>
            <button className='submit-btn' type='submit'>
              Enter chat!
            </button>
          </div>
        </form>
      </div>
    );
  }
}
