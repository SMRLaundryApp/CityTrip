import React, { Component } from 'react';
import { Text, View, Alert } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import userLocationPin from '../assets/userLocation.png';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
// import UserLocation from './UserLocation';

const GEOLOCATION_OPTIONS = {
  accuracy: 6,
  // timeInterval : 5000
  distanceInterval: 10
};

export default class Map extends Component {

  state = {
    location: { coords: { latitude: 0, longitude: 0}},
    errorMessage: null,
  };

  constructor(props) {
    super(props);
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }
    Location.watchPositionAsync(GEOLOCATION_OPTIONS, this.locationChanged);
  };

  locationChanged = (location) => {
    this.setState({ location })
  }

  render() {
    // Function which will always be executed
    let UserLocation = undefined;
    if (this.props.showUserLocation) {
      UserLocation =
      <Marker 
      title='User location'
      image={userLocationPin}
      coordinate={{
        latitude: this.state.location.coords.latitude,
        longitude: this.state.location.coords.longitude
      }}/>
    }

    return (
      // Shows stuff
      <MapView
      style={{width:'100%', height:'100%'}}
      initialRegion={{
        latitude: 52.152285,
        longitude: 5.3,
        latitudeDelta: 4,
        longitudeDelta: 4
      }}>
        {UserLocation}
      </MapView>
    )
  }
}