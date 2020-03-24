import React, { Component } from 'react';
import MapView, { Callout, Marker } from 'react-native-maps';
import { StyleSheet, Text, View, ScrollView, Dimensions, PermissionsAndroid, Platform, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import styles from './Style';
import Map from './Map';


export default class App extends Component {

  render() {

    return (
      <View style={styles.container}>
        <Map 
        userlocation={{
          latitude: 52.124730,
          longitude: 4.657368
        }}
        />
      </View>
    );
  }
}
