import React from 'react';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, PermissionsAndroid, Platform } from 'react-native';
// import Geolocation from '@react-native-community/geolocation';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';



export default class App extends React.Component {

  state = {
    location: null,
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

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };

  _getCurrentLocationAsync = async () => {

  };

  render() {

    // Geolocation.getCurrentPosition(info => console.log(info));
    
    return (
      <View style={styles.container}>
        <Text>{JSON.stringify(this.state.location)}</Text>
        <MapView
          style={styles.mapStyle}
          initialRegion={{
            latitude: 52.001957,
            longitude: 4.367028,
            latitudeDelta: 0.015,
            longitudeDelta: 0.015,
          }}
        >

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
