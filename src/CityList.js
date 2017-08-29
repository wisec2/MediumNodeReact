//CityList.js
import React, { Component } from 'react';
import City from './City';
import style from './style';

class CityList extends Component {
  render() {
    let cityNodes = this.props.data.map(city => {
      return (
        // <Comment author={ comment.author } key={ comment.id }>
          // { comment.text }
        // </Comment>

        <City name={ city.name } zavg={ city.zavg }>
          { city.name }
        </City>
      )
    })

    return(
      <div style={ style.commentlist }>
        { cityNodes }
      </div>
    )
  }
}

export default CityList;