import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
import UserLocation from './UserLocation';
import geolocation from 'react-geolocation';
import Delay from 'react-delay'


const UserReaction = ({ reaction }) => <div><h1>{reaction}</h1></div>;

class Map extends Component {

  constructor(props) {
    super(props);
  
    let center = {
      lat: 63.123,
      lng: 20.123
    }
    
    this.state = {
      center: {
        lat: center.lat,
        lng: center.lng
      },
      zoom: 11
    };
  }
    render() {
      return (
        <div style={{ height: '100vh', width: '100%' }}>
          <GoogleMapReact 
          bootstrapURLKeys={{ key: 'AIzaSyBky1lvKcJb9ipHrJGwBzzsS2BpCEA8XYI'}}
          defaultCenter={{lat: this.props.mapCoords.coords.latitude, lng: this.props.mapCoords.coords.longitude}}
          { ...this.props.children }
          defaultZoom={this.state.zoom}
          //defaultZoom={11}
          >

        <UserReaction
          lat={this.props.mapCoords.coords.latitude}
          lng={this.props.mapCoords.coords.longitude}
          reaction={'x'}
          
          />
        </GoogleMapReact>
        
        </div>
      );
    }

}

export default Map;



  /*
  componentWillMount() {
    if('geolocation' in navigator){
      console.log('Successss!')
    }
    let _this = this
    navigator.geolocation.getCurrentPosition(function(position){
      _this.setState({lat: position.coords.latitude, lng: position.coords.longitude})
      console.log(_this.state.lat);


    })

    
  }*/







  
  /*static defaultProps = {
    center: {
      lat: 25,
      lng: 30
    }, zoom: 11
  };*/