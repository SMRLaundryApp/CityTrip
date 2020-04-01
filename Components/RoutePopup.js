import React, { Component } from 'react'
import { Text, ScrollView, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import styled from 'styled-components'
import MapView, { Marker } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'
import GOOGLE_MAPS_APIKEY from '../private'
import { Dimensions } from 'react-native'

const screenWidth = Dimensions.get('window').width

export default class RoutePopup extends Component {
  state = {
    id: Number(this.props.id.split('#')[1]),
  }

  constructor(props) {
    super(props)
    // this.setState({ id: Number(this.props.id.split("#")[1]) })
  }

  render() {
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
      <Container>
        <Title>{routes[this.state.id].name}</Title>
        <MapView
          style={{
            width: '100%',
            height: '40%',
          }}
          initialRegion={routes[this.state.id].region}
          moveOnMarkerPress={false}
          zoomControlEnabled={false}
          zoomEnabled={false}
          zoomTapEnabled={false}
          rotateEnabled={false}
          scrollEnabled={false}
        >
          {POIs}
          {mapDirections}
        </MapView>
        <Description>{routes[this.state.id].description}</Description>
        <StartAt>Start at:</StartAt>
        <Clear>
          <TouchableOpacity
            style={{
              borderRadius: 100,
              backgroundColor: '#19B092',
              padding: 10,
              width: screenWidth * 0.7,
            }}
          >
            <ButtonText>
              {
                pointsOfInterest[
                  Number(routes[this.state.id].POIs[0].split('#')[1])
                ].name
              }
            </ButtonText>
          </TouchableOpacity>
          <OrText>or</OrText>
          <TouchableOpacity
            style={{
              borderRadius: 100,
              backgroundColor: '#19B092',
              padding: 10,
              width: screenWidth * 0.7,
            }}
          >
            <ButtonText>
              {
                pointsOfInterest[
                  Number(
                    routes[this.state.id].POIs[
                      routes[this.state.id].POIs.length - 1
                    ].split('#')[1]
                  )
                ].name
              }
            </ButtonText>
          </TouchableOpacity>
        </Clear>
      </Container>
    )
  }
}

const Clear = styled.View``

const Container = styled.View`
  flex: 1;
  padding: 5px;
  background-color: #888;
  opacity: 0.8;
  flex-direction: column;
  align-items: center;
`

const Title = styled.Text`
  padding-top: 5px;
  padding-bottom: 10px;
  color: #fff;
  font-size: 28px;
  font-weight: bold;
  text-align: center;
`

const Description = styled.Text`
  margin-top: 5px;
  color: white;
  text-align: justify;
`

const StartAt = styled.Text`
  text-align: center;
  color: white;
  font-size: 25px;
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
