import React, { Component } from 'react'
import { Text, View, TouchableHighlightBase } from 'react-native'
import styled from 'styled-components'
import Card from './Card'
import Constants from 'expo-constants'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'

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

function sortDistance(info) {
  let items = [0]
  for (let i = 0; i < info[0].length; i++) {
    for (let j = 0; j < items.length; j++) {
      if (info[0][i][0] > items[j]) {
        items.splice(j, 0, info[0][i])
        break
      }
    }
  }
  items.pop()
  items.reverse()
  return items
}

export default class ItemsLayout extends Component {
  state = {
    location: { coords: { latitude: undefined, longitude: undefined } },
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
    let pointsOfInterest = require('../data/POIs.json')

    let name = this.props.cityName
    let columnOne = []
    let columnTwo = []
    let userLocation = this.state.location.coords
    let POIs = []
    let load = <Text> Loading... </Text>
    let sortedPointsOfInterest = []

    if (
      this.state.location.coords.latitude !== undefined &&
      this.state.location.coords.longitude !== undefined
    ) {
      load = undefined
      POIs.push(
        pointsOfInterest.map(function (POI) {
          let userDistance = getDistance(
            userLocation.latitude,
            userLocation.longitude,
            POI.coords.latitude,
            POI.coords.longitude
          ).toFixed(2)
          return [userDistance, POI.id]
        })
      )
      let sortedPOIs = sortDistance(POIs)
      for (let i = 0; i < sortedPOIs.length; i++) {
        sortedPointsOfInterest.push(
          pointsOfInterest[Number(sortedPOIs[i][1].split('#')[1])]
        )
      }
      columnOne.push(
        sortedPointsOfInterest.map(function (POI, index) {
          let userDistance = getDistance(
            userLocation.latitude,
            userLocation.longitude,
            POI.coords.latitude,
            POI.coords.longitude
          ).toFixed(2)
          if (index % 2 !== 1) {
            return (
              <Card
                cityName={name}
                title={POI.name}
                image={POI.image.url}
                distance={userDistance}
              />
            )
          }
        })
      )
      columnTwo.push(
        sortedPointsOfInterest.map(function (POI, index) {
          let userDistance = getDistance(
            userLocation.latitude,
            userLocation.longitude,
            POI.coords.latitude,
            POI.coords.longitude
          ).toFixed(2)
          if (index % 2 === 1) {
            return (
              <Card
                cityName={name}
                title={POI.name}
                image={POI.image.url}
                distance={userDistance}
              />
            )
          }
        })
      )
    }

    return (
      <Layout>
        {load}
        <ColumnOne>{columnOne}</ColumnOne>
        <ColumnTwo>{columnTwo}</ColumnTwo>
      </Layout>
    )
  }
}

const Layout = styled.View`
  flex-direction: row;
  margin-bottom: 170px;
`

const ColumnOne = styled.View`
  align-items: center;
  width: 50%;
`

const ColumnTwo = styled.View`
  align-items: center;
  width: 50%;
`
