// City.js
import React, { Component } from 'react';
import style from './style';
import marked from 'marked';

class City extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      zavg: props.zavg
    };
  }

  rawMarkup() {
    let rawMarkup = marked(this.props.children.toString());
    return { __html: rawMarkup };
  }

  render() {
    return(
      <div style={ style.commet }>
        <h3>{ this.props.author }</h3>
        <span dangerouslySetInnerHTML={ this.rawMarkup() } />
      </div> 
    )
  }
}

export default City;