import React, { Component } from 'react'
import styled from 'styled-components'
import RouteCard from './RouteCard'
import { ScrollView } from 'react-native-gesture-handler'

function filterCategories() {
  let userCategories = global.userData.user.categories.map((categoryAPI) => {
    if       (categoryAPI === '/api/categories/2')  {return ('statues')}
    else {if (categoryAPI === '/api/categories/3')  {return ('architecture')}
    else {if (categoryAPI === '/api/categories/4')  {return ('museums')}
    else {if (categoryAPI === '/api/categories/5')  {return ('amusementparks')}
    else {if (categoryAPI === '/api/categories/6')  {return ('mills')}
    else {if (categoryAPI === '/api/categories/7')  {return ('nightlife')}
    else {if (categoryAPI === '/api/categories/8')  {return ('placesofworship')}
    else {if (categoryAPI === '/api/categories/9')  {return ('food')}
    else {if (categoryAPI === '/api/categories/10') {return ('castles')}}}}}}}}}
  })
  return userCategories
}

export default class RoutesLayout extends Component {
  render() {
    let pointsOfInterest = require('../data/POIs.json')
    let routes = require('../data/Routes.json')

    let routesList = routes.map((route, index) => {
      let pass = false
      let userCategories = filterCategories()
      for (let i = 0; i < userCategories.length; i++) {
        if (route.category === userCategories[i]) {
          pass = true
        }
      }
      // Determine if begin or end POI is closer if route is lineair
      // Determine which POI is closed if route is cirular
      // let userDistance = getDistance(userLocation.latitude, userLocation.longitude, POI.coords.latitude, POI.coords.longitude).toFixed(2);
      let image = pointsOfInterest[route.POIs[0]].image.url
      if (pass) {
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
      }
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
