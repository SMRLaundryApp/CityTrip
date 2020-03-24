import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, Alert } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import userLocationPin from './images/userLocation.png';
import styles from './Style';

class Map extends Component {
  render() {
    // Function which will always be executed
    let userLocation = undefined;
    if(this.props.userlocation !== undefined &&
      this.props.userlocation.latitude !== undefined &&
      this.props.userlocation.longitude !== undefined) {
        userLocation =
        <Marker 
        title='User location'
        image={userLocationPin}
        coordinate={{
          latitude: this.props.userlocation.latitude,
          longitude: this.props.userlocation.longitude
        }}/>}

    return (
      // Shows stuff
      <MapView
      style={{width:'100%', height:'80%'}}
      initialRegion={{
        latitude: 52.152285,
        longitude: 5.3,
        latitudeDelta: 4,
        longitudeDelta: 4
      }}>
        {userLocation}
      </MapView>
    )
  }
}

export default Map