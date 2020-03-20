import React from 'react';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, PermissionsAndroid, Platform } from 'react-native';
// import Geolocation from '@react-native-community/geolocation';



export default class App extends React.Component {
  render() {
    
    // Geolocation.getCurrentPosition(info => console.log(info));
    
    return (
      <View style={styles.container}>
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
    height: '100%',
  },
});
