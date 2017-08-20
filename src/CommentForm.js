//CommentForm.js
import React, { Component } from 'react';
import style from './style';

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = { author: '', text: '' }
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleAuthorChange(e) {
    this.setState({ author: e.target.value });
  }

  handleTextChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(`${this.state.author} said "${this.state.text}"`);
  }

  render() {
    return (
      <form style={ style.commentForm } onSubmit={ this.handleSubmit }>
      <input
        type='text'
        placeholder='Your name'
        style={ style.commentFormAuthor }
        value={ this.state.author }
        onChange={ this.handleAuthorChange } />

      <input
        type='submit'
        style={ style.commentFormPost }
        value='Post' />
      </form>
    )
  }
}

export default CommentForm;