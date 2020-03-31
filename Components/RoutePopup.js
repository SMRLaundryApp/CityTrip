import React, { Component } from 'react'
import { Text, ScrollView, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import styled from 'styled-components'
import MapView, { Marker } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'
import GOOGLE_MAPS_APIKEY from '../private'

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
        return [pointsOfInterest[Number(route.split('#')[1])].coords]
      })
    )
    mapPOIs = mapPOIs[0]
    let mapWayPoints = []
    for (let i = 1; i < mapPOIs.length - 1; i++) {
      mapWayPoints.push(mapPOIs[i])
    }
    let mapDirections = undefined
    // mapDirections = (
    //   <MapViewDirections
    //     origin={mapPOIs[0]}
    //     waypoints={mapWayPoints}
    //     destination={mapPOIs[mapPOIs.length - 1]}
    //     apikey={GOOGLE_MAPS_APIKEY}
    //     strokeWidth={3}
    //     strokeColor='hotpink'
    //   />
    // );

    return (
      <View style={{ flex: 1 }}>
        {/* <TouchableOpacity
          style={{
            backgroundColor:'red',
            height: 25,
            width:50,
            alignSelf:'flex-end'
          }}
          onPress={() => this.closeModal()}
        >
          <Text style={{textAlign:'center', textAlignVertical:'center', color:'white', height:'100%', fontSize:12, fontWeight:'bold'}}>Close</Text>
        </TouchableOpacity> */}
        <Title>{routes[this.state.id].name} Route</Title>
        <MapView
          style={{
            width: '100%',
            height: '50%',
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
        <Text style={{ color: 'white' }}>
          {routes[this.state.id].description}
        </Text>
        <Text
          style={{
            textAlign: 'center',
            color: 'white',
            fontSize: 15,
            fontWeight: 'bold',
            marginTop: 15,
          }}
        >
          Start at:
        </Text>
        <Clear>
          <TouchableOpacity style={{ backgroundColor: '#19B092', padding: 10 }}>
            <ButtonText>
              {
                pointsOfInterest[
                  Number(routes[this.state.id].POIs[0].split('#')[1])
                ].name
              }
            </ButtonText>
          </TouchableOpacity>
          <Text style={{ textAlign: 'center', color: 'white', margin: 5 }}>
            or
          </Text>
          <TouchableOpacity style={{ backgroundColor: '#19B092', padding: 10 }}>
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
      </View>
    )
  }
}

const Clear = styled.View``

const Title = styled.Text`
  padding-bottom: 5px;
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
`

const ButtonText = styled.Text`
  color: white;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`
