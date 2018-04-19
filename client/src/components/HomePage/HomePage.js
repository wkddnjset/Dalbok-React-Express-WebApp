import React, { Component } from 'react';
import './HomePage.css'
import SearchBar from './SearchBar'
import Geolocation from './Geolocation'

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants:[],
    };
    console.log(this);
  }

  handleClose = () => this.setState({open: false});

  componentDidMount() {
    fetch('/api/restaurant')
      .then(res => res.json())
      .then(restaurant => this.setState({restaurant}, () => console.log('HomePage fetched..', restaurant)));
  }
  render() {
    return (

      <div id="demo">
        <SearchBar/>
        <Geolocation/>
      </div>
    );
  }
}

export default HomePage;
