import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, PermissionsAndroid, Platform, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import styles from './Style';
import Map from './Map';


export default class App extends Component {

  render() {

    return (
      <View style={styles.container}>
        <Map showUserLocation={true} />
      </View>
    );
  }
}
