import React, { Component } from 'react'
import { TouchableOpacity, Text } from 'react-native'
import styled from 'styled-components'
import MapView, { Marker } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'
import GOOGLE_MAPS_APIKEY from '../private'
import userLocationPin from '../assets/userLocation.png'
import Constants from 'expo-constants'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'

const GEOLOCATION_OPTIONS = {
  accuracy: 6,
  // timeInterval : 5000
  distanceInterval: 10,
}

export default class RouteExtension extends Component {
  state = {
    id: Number(this.props.id.split('#')[1]),
    region: undefined,
    location: { coords: { latitude: 0, longitude: 0 } },
    errorMessage: null,
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
    // console.log(location);
  }

  render() {
    let userLocation = (
      <Marker
        title="User location"
        image={userLocationPin}
        coordinate={{
          latitude: this.state.location.coords.latitude,
          longitude: this.state.location.coords.longitude,
        }}
      />
    )

    let pointsOfInterest = require('../data/POIs.json')
    let routes = require('../data/Routes.json')

    let POIs = routes[this.state.id].POIs.map((route, index) => {
      return (
        <Marker
          key={index}
          title={pointsOfInterest[Number(route.split('#')[1])].name}
          pinColor="#19B092"
          coordinate={{
            latitude:
              pointsOfInterest[Number(route.split('#')[1])].coords.latitude,
            longitude:
              pointsOfInterest[Number(route.split('#')[1])].coords.longitude,
          }}
        />
      )
    })

    let mapPOIs = []
    mapPOIs.push(
      routes[this.state.id].POIs.map((route) => {
        return {
          latitude:
            pointsOfInterest[Number(route.split('#')[1])].coords.latitude,
          longitude:
            pointsOfInterest[Number(route.split('#')[1])].coords.longitude,
        }
      })
    )
    mapPOIs = mapPOIs[0]
    let mapWayPoints = []
    for (let i = 1; i < mapPOIs.length - 1; i++) {
      mapWayPoints.push(mapPOIs[i])
    }
    let mapDirections = (
      <MapViewDirections
        origin={mapPOIs[0]}
        waypoints={mapWayPoints}
        destination={mapPOIs[mapPOIs.length - 1]}
        apikey={GOOGLE_MAPS_APIKEY}
        strokeWidth={3}
        strokeColor="hotpink"
        mode="WALKING"
      />
    )

    return (
      <Clear>
        <MapView
          style={{
            width: '100%',
            height: 250
          }}
          initialRegion={routes[this.state.id].region}
          onRegionChangeComplete={(region) => {this.setState({region: region})}}
          region={this.state.region}
          // moveOnMarkerPress={false}
          // zoomControlEnabled={false}
          zoomEnabled={false}
          // zoomTapEnabled={false}
          // rotateEnabled={false}
        >
          {POIs}
          {mapDirections}
          {userLocation}
        </MapView>
        <TouchableOpacity
          style={{
            backgroundColor:'#19B092',
            width: 25,
            height: 25,
            borderRadius: 100,
            position: 'absolute',
            justifyContent: 'center',
            right: 5,
            top: 5
          }}
          onPress={() => {
            this.setState({
              region: {
                latitude: this.state.region.latitude,
                longitude: this.state.region.longitude,
                latitudeDelta: this.state.region.latitudeDelta * 0.5,
                longitudeDelta: this.state.region.longitudeDelta * 0.5
              }
            })
          }}
        >
          <Text style={{ color:'white', fontWeight: 'bold', textAlign: 'center' }}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor:'#19B092',
            width: 25,
            height: 25,
            borderRadius: 100,
            position: 'absolute',
            justifyContent: 'center',
            right: 5,
            top: 35
          }}
          onPress={() => {
            this.setState({
              region: {
                latitude: this.state.region.latitude,
                longitude: this.state.region.longitude,
                latitudeDelta: this.state.region.latitudeDelta * 2,
                longitudeDelta: this.state.region.longitudeDelta * 2
              }
            })
          }}
        >
          <Text style={{ color:'white', fontWeight: 'bold', textAlign: 'center' }}>-</Text>
        </TouchableOpacity>
        <Description>{routes[this.state.id].description}</Description>
        {/* <StartAt>Start at:</StartAt>
        <Clear>
          <TouchableOpacity
            style={{
              alignSelf: 'center',
              borderRadius: 100,
              backgroundColor: '#19B092',
              padding: 10,
              width: screenWidth * 0.7,
            }}
          >
            <ButtonText>{pointsOfInterest[Number(routes[this.state.id].POIs[0].split('#')[1])].name}</ButtonText>
          </TouchableOpacity>
          <OrText>or</OrText>
          <TouchableOpacity
            style={{
              alignSelf: 'center',
              borderRadius: 100,
              backgroundColor: '#19B092',
              padding: 10,
              width: screenWidth * 0.7,
            }}
          >
            <ButtonText>{pointsOfInterest[Number(routes[this.state.id].POIs[routes[this.state.id].POIs.length - 1].split('#')[1])].name}</ButtonText>
          </TouchableOpacity>
        </Clear> */}
      </Clear>
    )
  }
}

const Clear = styled.View``

const Title = styled.Text`
  padding-bottom: 10px;
  color: #fff;
  font-size: 28px;
  font-weight: bold;
  text-align: center;
`

const Description = styled.Text`
  margin-top: 5px;
  margin-bottom: 0px;
  color: white;
  text-align: justify;
`

const StartAt = styled.Text`
  text-align: center;
  color: white;
  font-weight: bold;
  margin-bottom: 5px;
`

const OrText = styled.Text`
  text-align: center;
  color: white;
  margin: 5px;
`

const ButtonText = styled.Text`
  color: white;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`
