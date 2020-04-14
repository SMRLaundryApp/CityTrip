import React, { Component } from 'react'
import { TouchableOpacity, Text } from 'react-native'
import styled from 'styled-components'
import MapView, { Marker, Callout } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'
import GOOGLE_MAPS_APIKEY from '../private'
import userLocationPin from '../assets/userLocation.png'
import Constants from 'expo-constants'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import Modal from 'react-native-modal'
import { Dimensions } from 'react-native'
import POIPopup from './POIPopup'

const screenWidth = Dimensions.get('window').width

const GEOLOCATION_OPTIONS = {
  accuracy: 6,
  // timeInterval : 5000
  distanceInterval: 10,
}

function toRadians(degree) {
  return (Math.PI / 180) * degree
}

function getDistance(
  userLocationLatitude,
  userLocationLongitude,
  POILocationLatitude,
  POILocationLongitude
) {
  let R = 6371
  let lat1 = toRadians(userLocationLatitude)
  let lat2 = toRadians(POILocationLatitude)
  let dLat = toRadians(POILocationLatitude - userLocationLatitude)
  let dLng = toRadians(POILocationLongitude - userLocationLongitude)

  let a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) * Math.sin(dLng / 2)
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return R * c
}

export default class RouteExtension extends Component {
  state = {
    id: this.props.id,
    region: undefined,
    location: { coords: { latitude: 0, longitude: 0 } },
    errorMessage: null,
    isModalVisible: false,
    image: undefined,
    title: undefined,
    distance: undefined,
    city: undefined,
    description: undefined,
    hyperlink: undefined,
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

  closeModal = () => {
    this.setState({ isModalVisible: false })
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
          // title={pointsOfInterest[route].name}
          pinColor="#19B092"
          coordinate={{
            latitude: pointsOfInterest[route].coords.latitude,
            longitude: pointsOfInterest[route].coords.longitude,
          }}
        >
          <Callout
            onPress={() => {
              this.setState({
                image: pointsOfInterest[route].image.url,
                title: pointsOfInterest[route].name,
                distance: getDistance(
                  this.state.location.coords.latitude,
                  this.state.location.coords.longitude,
                  pointsOfInterest[route].coords.latitude,
                  pointsOfInterest[route].coords.longitude
                ).toFixed(2),
                city: pointsOfInterest[route].city,
                description: pointsOfInterest[route].description,
                hyperlink: pointsOfInterest[route].hyperlink,
                isModalVisible: true,
              })
            }}
          >
            <MarkerTitle>{pointsOfInterest[route].name}</MarkerTitle>
            <MarkerInfo>Press to show POI information</MarkerInfo>
          </Callout>
        </Marker>
      )
    })

    let mapPOIs = []
    mapPOIs.push(
      routes[this.state.id].POIs.map((route) => {
        return {
          latitude: pointsOfInterest[route].coords.latitude,
          longitude: pointsOfInterest[route].coords.longitude,
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
        strokeColor="#13866f"
        mode="WALKING"
      />
    )

    return (
      <Clear>
        <MapView
          style={{
            width: '100%',
            height: 250,
          }}
          initialRegion={routes[this.state.id].region}
          onRegionChangeComplete={(region) => {
            this.setState({ region: region })
          }}
          region={this.state.region}
          zoomEnabled={false}
        >
          {POIs}
          {mapDirections}
          {userLocation}
        </MapView>
        <TouchableOpacity
          style={{
            backgroundColor: '#19B092',
            width: 25,
            height: 25,
            borderRadius: 100,
            position: 'absolute',
            justifyContent: 'center',
            right: 5,
            top: 5,
          }}
          onPress={() => {
            this.setState({
              region: {
                latitude: this.state.region.latitude,
                longitude: this.state.region.longitude,
                latitudeDelta: this.state.region.latitudeDelta * 0.5,
                longitudeDelta: this.state.region.longitudeDelta * 0.5,
              },
            })
          }}
        >
          <ZoomButton>+</ZoomButton>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: '#19B092',
            width: 25,
            height: 25,
            borderRadius: 100,
            position: 'absolute',
            justifyContent: 'center',
            right: 5,
            top: 35,
          }}
          onPress={() => {
            this.setState({
              region: {
                latitude: this.state.region.latitude,
                longitude: this.state.region.longitude,
                latitudeDelta: this.state.region.latitudeDelta * 2,
                longitudeDelta: this.state.region.longitudeDelta * 2,
              },
            })
          }}
        >
          <ZoomButton>-</ZoomButton>
        </TouchableOpacity>
        <Description>{routes[this.state.id].description}</Description>
        <Modal
          animationIn="slideInRight"
          animationOut="slideOutRight"
          isVisible={this.state.isModalVisible}
          style={{
            backgroudColor: '#888',
          }}
        >
          <Container
            style={{
              padding: 4,
              margin: 0,
              marginTop: 0,
              width: screenWidth - 20,
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: '#19B092',
                alignSelf: 'flex-end',
                height: 20,
                width: 20,
                borderRadius: 10,
              }}
              onPress={() => {
                this.closeModal()
              }}
            >
              <CloseButton>×</CloseButton>
            </TouchableOpacity>
            <POIPopup
              image={this.state.image}
              title={this.state.title}
              distance={this.state.distance}
              city={this.state.city}
              description={this.state.description}
              hyperlink={this.state.hyperlink}
            />
          </Container>
        </Modal>
      </Clear>
    )
  }
}

const Clear = styled.View``

const Container = styled.View`
  align-self: center;
  background: #888;
  border-radius: 14px;
  margin-top: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3); /*This particular line doesn't seem to do anything in android OS*/
`

const CloseButton = styled.Text`
  text-align: center;
  color: white;
  font-weight: bold;
`

const Description = styled.Text`
  margin-top: 5px;
  margin-bottom: 8px;
  color: white;
  text-align: justify;
`

const ZoomButton = styled.Text`
  color: white;
  font-weight: bold;
  text-align: center;
`

const MarkerTitle = styled.Text`
  text-align: center;
  font-weight: bold;
`

const MarkerInfo = styled.Text`
  text-align: center;
`
