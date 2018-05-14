import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import Map from './Map';
import UserLocation from './UserLocation';
import {GeolocationProps ,geolocation} from 'react-geolocation';
import Loading from './Loading.js';


export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = { coords: undefined };
    this.getCoords();
    
  }

  renderMap(coords) {
    return coords ? (<Map mapCoords={coords}/>) : <Loading/>;
  }

  fetchCoords() {
   let fetchedCoords = null
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve);
    });
  }

  async getCoords(){
    console.log('fetching');

    const coords = await this.fetchCoords();
    console.log('coords found:',coords);
    this.setState(previousState => {
      return { coords: coords};
    });
  }



  render() {
    const coords = this.state.coords
    return (
      <div className="container">
        {this.renderMap(coords)}
      
      </div>
    );
  }


}
