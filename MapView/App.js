import React from 'react';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, PermissionsAndroid, Platform } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

const GEOLOCATION_OPTIONS = {
  accuracy: 3,
  timeInterval : 5000
  // distanceInterval: 1
};
const colorOfmyLocationMapMarker = 'blue';

export default class App extends React.Component {

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
    this.setState({location})
  }

  render() {
    
    return (
      <View style={styles.container}>
        <Text>Longitude: {JSON.stringify(this.state.location.coords.longitude)}</Text>
        <Text>Latitude: {JSON.stringify(this.state.location.coords.latitude)}</Text>
        <Text>Timestamp: {JSON.stringify(this.state.location.timestamp)}</Text>
        <MapView
          style={styles.mapStyle}
          initialRegion={{
            latitude: 52.001957,
            longitude: 4.367028,
            latitudeDelta: 0.015,
            longitudeDelta: 0.015,
          }}
        >
          <Marker
            pinColor='violet'
            title='My House'
            description='This is the house where Bart lives'
            rotation={90.0}
            coordinate={{
              latitude: this.state.location.coords.latitude,
              longitude: this.state.location.coords.longitude
            }}>
          </Marker>
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: '100%',
    height: '80%',
  },
});
