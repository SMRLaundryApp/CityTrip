import React, { Component } from 'react'
import { Text, View, TouchableHighlightBase } from 'react-native'
import styled from 'styled-components'
import RouteCard from './RouteCard';

export default class RoutesLayout extends Component {

  render(){
    let pointsOfInterest = require('../data/POIs.json');
    let routes = require('../data/Routes.json');

    let routesList = routes.map((route, index) => {
      // Determine if begin or end POI is closer if route is lineair
      // Determine which POI is closed if route is cirular
      // let userDistance = getDistance(userLocation.latitude, userLocation.longitude, POI.coords.latitude, POI.coords.longitude).toFixed(2);
      let image = pointsOfInterest[Number(route.POIs[0].split("#")[1])].image.url;
      return(
        <RouteCard
          key={index}
          length={route.length}
          duration={route.duration}
          title={route.name}
          image={image}
          id={route.id}
        /> // distance={1.2} />
      )
    })

    return(
      <Layout>
        {/* {load} */}
        {/* <Text> lol</Text> */}
        <Column>{routesList}</Column>
      </Layout>
    )
  }
}

const Layout = styled.View`
  flex-direction: row;
  margin-bottom: 170px;
`

const Column = styled.View`
  align-items: center;
  width: 100%;
`