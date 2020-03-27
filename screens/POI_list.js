import React, { Component } from 'react';
import Welcomebar from '../Components/Welcomebar';
import styled from 'styled-components';
import { ScrollView } from 'react-native';
import ItemsLayout from '../Components/ItemsLayout';
import Constants from 'expo-constants'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'

const GEOLOCATION_OPTIONS = {
  accuracy: 6,
  // timeInterval : 5000
  distanceInterval: 10,
}

export default class POI_list extends Component {

  state = {
    location: { coords: { latitude: undefined, longitude: undefined } }
  }

  constructor(props) {
    super(props)
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage:
          'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      })
    } else {
      this._getLocationAsync()
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION)
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      })
    }
    Location.watchPositionAsync(GEOLOCATION_OPTIONS, this.locationChanged)
  }

  locationChanged = (location) => {
    this.setState({ location })
  }

  render() {

    let user = { latitude: undefined, longitude: undefined };
    // let user = undefined;
    if (this.state.location.coords.latitude !== undefined && this.state.location.coords.longitude !== undefined) {
      user = { latitude: this.state.location.coords.latitude, longitude: this.state.location.coords.longitude };
    }

    return (
        <Container>
            <Welcomebar />
            <Subtitle>{this.props.city}</Subtitle>
            <ScrollView>
              <ItemsLayout cityName={this.props.city} userLocation={user} />
            </ScrollView>
        </Container>
    )
  }
}

const Container = styled.View``

const Subtitle = styled.Text`
  font-size: 20px;
  color: #3c4560;
  font-weight: 500;
  margin-top: 10px;
  margin-left: 25px;
  margin-bottom: 10px;
  text-transform: uppercase;
`
