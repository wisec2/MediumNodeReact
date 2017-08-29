//CommentForm.js
import React, { Component } from 'react';
import style from './style';

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = { city: '', dist: '' }
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleDistanceChange = this.handleDistanceChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleCityChange(e) {
    this.setState({ city: e.target.value });
  }

  handleDistanceChange(e) {
    this.setState({ dist: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(`${this.state.city} said "${this.state.dist}"`);
  }

  render() {
    return (
      <form style={ style.commentForm } onSubmit={ this.handleSubmit }>
      <input
        type='text'
        placeholder='City'
        style={ style.commentFormAuthor }
        value={ this.state.city }
        onChange={ this.handleCityChange } />

      <input
        type='text'
        placeholder='Distance (mi)'
        style={ style.commentFormList }
        value={ this.state.dist }
        onChange={ this.handleDistanceChange } />

      <input
        type='submit'
        style={ style.commentFormPost }
        value='Search' />
      </form>
    )
  }
}

export default CommentForm;