import React from 'react';
import MapView, { Callout, Marker } from 'react-native-maps';
import { enableScreens } from 'react-native-screens';
import { StyleSheet, Text, View, ScrollView, Dimensions, PermissionsAndroid, Platform, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import userLocationPin from './images/userLocation.png';

enableScreens();

const GEOLOCATION_OPTIONS = {
  accuracy: 6,
  // timeInterval : 5000
  distanceInterval: 1
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

    // let location = await Location.getCurrentPositionAsync(GEOLOCATION_OPTIONS);
    // this.setState({ location });
    Location.watchPositionAsync(GEOLOCATION_OPTIONS, this.locationChanged);
  };

  locationChanged = (location) => {
    this.setState({ location })
  }

  render() {
    
    let longitudeD;
    let latitudeD;
    if (this.state.location) {
      longitudeD = this.state.location.coords.longitude;
      latitudeD  = this.state.location.coords.latitude;
      timestampD = this.state.location.timestamp;
    }

    return (
      <View style={styles.container}>
        <Text>Longitude: {longitudeD}</Text>
        <Text>Latitude: {latitudeD}</Text>
        <Text>Timestamp: {timestampD}</Text>
        <MapView
          style={styles.mapStyle}
          region={{
            latitude: latitudeD,
            longitude: longitudeD,
            latitudeDelta: 0.035,
            longitudeDelta: 0.035,
          }}
        >
          <Marker
            title='User Location'
            image={userLocationPin}
            coordinate={{
              latitude: this.state.location.coords.latitude,
              longitude: this.state.location.coords.longitude
            }}>
          </Marker>
          <Marker
            pinColor='violet'
            coordinate={{
              latitude: 52.123456,
              longitude: 4.63935
            }}>
            <Callout
              onPress={() => {
                // Put some code here to change to a different view/page with the wanted information
                alert('You pressed it! :O')
              }}
              style={styles.plainView}>
              <View>
                <Text style={styles.calloutTitleText}>Weteringpad</Text>
                <Text>Het Weteringpad is een langgerekt groengebied ...</Text>
                <Text style={styles.hyperlinkText}>Press to read more</Text>
              </View>
            </Callout>
          </Marker>
        </MapView>
        <TouchableOpacity
          style={styles.buttonRefreshGPS}
          onPress={() => {
            async () => {
              let location = await Location.getCurrentPositionAsync(GEOLOCATION_OPTIONS);
              this.setState({ location });
            }
          }}>
          <Text>Refresh GPS</Text>
        </TouchableOpacity>
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
  buttonRefreshGPS: {
    backgroundColor: 'red',
    margin: 5,
    padding: 10,
    borderRadius: 5,
    width: 100,
  },
  buttonRefreshGPSText: {
    fontSize: 20,
    color: '#fff',
    alignSelf: 'center',
  },
  plainView: {
    width: 165,
    // height: 150,
  },
  calloutTitleText: {
    fontWeight: 'bold',
  },
  hyperlinkText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});
