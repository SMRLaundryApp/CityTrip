import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, Alert } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import userLocationPin from './images/userLocation.png';
import styles from './Style';

class Map extends Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {

  //   };
  // }

  render() {
    // Function which will always be executed
    // userlocation = this.props;

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
        <Marker
        title='User location'
        image={userLocationPin}
        coordinate={{
          // latitude: 52.124730,
          // longitude: 4.657368
          latitude: this.props.userlocation.latitude,
          longitude: this.props.userlocation.longitude
        }} />
        {/* {POIs} */}
      </MapView>
    )
  }
}

export default Map