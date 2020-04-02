import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
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
      <Clear>
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
        >
          {POIs}
          {mapDirections}
        </MapView>
        <Description>{routes[this.state.id].description}</Description>
        <StartAt>Start at:</StartAt>
        <Clear>
          <TouchableOpacity style={{ alignSelf:'center', borderRadius: 100, backgroundColor: '#19B092', padding: 10, width: screenWidth * 0.7 }}>
            <ButtonText>{pointsOfInterest[Number(routes[this.state.id].POIs[0].split('#')[1])].name}</ButtonText>
          </TouchableOpacity>
          <OrText>or</OrText>
          <TouchableOpacity style={{ alignSelf:'center', borderRadius: 100, backgroundColor: '#19B092', padding: 10, width: screenWidth * 0.7 }}>
            <ButtonText>{pointsOfInterest[Number(routes[this.state.id].POIs[routes[this.state.id].POIs.length - 1].split('#')[1])].name}</ButtonText>
          </TouchableOpacity>
        </Clear>
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
