import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';


export default class App extends React.Component {
  state = {
    location: { coords: { latitude: 52.19, longitude: 4.43}},
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

    let location = await Location.getCurrentPositionAsync({accuracy: 6});
    this.setState({ location });
  };

  render() {
    let longitudeD;
    let latitudeD;
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      longitudeD = this.state.location.coords.longitude;
      latitudeD = this.state.location.coords.latitude;
    }

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Citrytrip inc.</Text>
        <Text style={styles.paragraph}>{'Longitude: '}{JSON.stringify(this.state.location.coords.longitude)}</Text>
        <Text style={styles.paragraph}>{'Latitude: '}{JSON.stringify(this.state.location.coords.latitude)}</Text>
        <MapView style={styles.mapView}
          initialRegion = {{
            longitude: longitudeD, 
            latitude: latitudeD,
            longitudeDelta: 1.010,
            latitudeDelta: 1.010,
          }}
        >
          <Marker
          coordinate={{
            latitude: this.state.location.coords.latitude,
            longitude: this.state.location.coords.longitude
          }}
          title={'Kaka'}
          description={'Roekoe roekoe'}
          />

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
  mapView: {
    flex: 3,
    width: '100%',
    // height: '80%'
  },
  paragraph: {
    margin: 3,
    fontSize: 18,
    textAlign: 'center',
    color: '#888',
  },
  title: {
    fontSize: 30,
    color: '#888',
    marginTop: 40
  },
});
