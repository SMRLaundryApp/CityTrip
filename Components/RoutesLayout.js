import React, { Component } from 'react'
import styled from 'styled-components'
import RouteCard from './RouteCard'
import { ScrollView } from 'react-native-gesture-handler'

export default class RoutesLayout extends Component {
  render() {
    let pointsOfInterest = require('../data/POIs.json')
    let routes = require('../data/Routes.json')

    let routesList = routes.map((route, index) => {
      // Determine if begin or end POI is closer if route is lineair
      // Determine which POI is closed if route is cirular
      // let userDistance = getDistance(userLocation.latitude, userLocation.longitude, POI.coords.latitude, POI.coords.longitude).toFixed(2);
      let image = pointsOfInterest[route.POIs[0]].image.url
      return (
        // Give route POIs with RouteCard and let the coordinates of those POIs be imported in RoutePopup
        <RouteCard
          key={index}
          length={route.length}
          duration={route.duration}
          title={route.name}
          image={image}
          id={route.id}
        />
      )
    })

    return (
      <ScrollView
        style={{ marginBottom: 120, overflow: 'scroll' }}
        pinchGestureEnabled={false}
      >
        <Column>{routesList}</Column>
      </ScrollView>
    )
  }
}

const Column = styled.View`
  align-items: center;
  width: 100%;
`
