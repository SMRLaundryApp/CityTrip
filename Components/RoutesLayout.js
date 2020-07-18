import React, { Component } from 'react'
import styled from 'styled-components'
import RouteCard from './RouteCard'
import { ScrollView } from 'react-native-gesture-handler'

function filterCategories() {
  let userCategories = global.cards.map((categoryAPI) => {
    if (categoryAPI === '2') {
      return 'statues'
    } else {
      if (categoryAPI === '3') {
        return 'architecture'
      } else {
        if (categoryAPI === '4') {
          return 'museums'
        } else {
          if (categoryAPI === '5') {
            return 'amusementparks'
          } else {
            if (categoryAPI === '6') {
              return 'mills'
            } else {
              if (categoryAPI === '7') {
                return 'nightlife'
              } else {
                if (categoryAPI === '8') {
                  return 'placesofworship'
                } else {
                  if (categoryAPI === '9') {
                    return 'food'
                  } else {
                    if (categoryAPI === '10') {
                      return 'castles'
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
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
      let image = pointsOfInterest[route.POIs[0]].image.url
      if (pass) {
        return (
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
