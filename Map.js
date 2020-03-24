import React, { Component } from 'react';
import { Text, View, Alert } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import styles from './Style';

class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    // Function which will always be executed

    return (
      // Shows stuff
      <MapView
      style={styles.mapStyle}
      initialRegion={{
        latitude: 52.152285,
        longitude: 5.3,
        latitudeDelta: 4,
        longitudeDelta: 4
      }}>
        {/* {POIs} */}
      </MapView>
    )
  }
}

export default Map