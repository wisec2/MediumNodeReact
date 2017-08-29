// CityBox.js
import React, { Component } from 'react';
import CityList from './CityList';
import CityForm from './CityForm';
import axios from 'axios';
// import DATA from './data/data';
import style from './style';

class CityBox extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] }
    this.getCityResults = this.getCityResults.bind(this);
  }

  getCityResults() {
    axios.get(this.props.url).then(res => {
      this.setState({data: res.data});
    })
  }

  render() {
    return (
      <div style={ style.commentBox }>
        <h2> Comments: </h2>
        <CityList data={this.state.data}/>
        <CityForm />
      </div>
    )
  }
}

export default CityBox;