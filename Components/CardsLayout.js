import React, { Component } from 'react'
import styled from 'styled-components'
import Card from './Card'
import Constants from 'expo-constants'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import { TouchableOpacity } from 'react-native-gesture-handler'

const axios = require('axios').default
const baseURL = 'https://citytrip.trifall.net'

const GEOLOCATION_OPTIONS = {
  accuracy: 6,
  distanceInterval: 10,
}

function toRadians(degree) {
  return (Math.PI / 180) * degree
}

function getPOIs() {
  // let POIs = undefined
  axios
    .get('/api/point_of_interests')
    .then(function (response) {
      ;(global.POIs = response.data['hydra:member'])
    })
    .catch(function (error) {
      console.log(error)
    })
    // console.log(global.POIs)
    return global.POIs
  //Add badge

  // return (
  //   <TouchableOpacity
  //     onPress={() => {
  //       postLogin()
  //       // console.log(state.mail, state.password, state.rp)
  //     }}
  //   >
  //     <Butoon>
  //       <Butoontext>Sign in</Butoontext>
  //     </Butoon>
  //   </TouchableOpacity>
  // )
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
  let ids = []
  let distances = [0.0]
  for (let i = 0; i < info.length; i++) {
    for (let j = 0; j < distances.length; j++) {
      if (Number(info[i][0]) > Number(distances[j])) {
        distances.splice(j, 0, info[i][0])
        ids.splice(j, 0, info[i][1])
        break
      }
    }
  }
  ids.reverse()
  // distances.reverse()
  // distances.shift()
  return ids
}

export default class CardsLayout extends Component {
  state = {
    location: { coords: { latitude: 52.193818, longitude: 4.435738 } },
    gotPOIs: false,
    points_of_interest: [],
    coordinates: undefined,
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

  componentDidMount = () => {

    let categories = global.userData.user.categories
    // console.log(categories)
    console.log('\n')

    global.poi = []
    global.coordinates = []
    categories.map((categorie, index) => {
      axios
        .get(baseURL + categorie)
        .then(response => {
          response.data.pointOfInterests.map((point) => {
            let alreadyAdded = false
            global.poi.map((poi, index) => {
              if (poi === point) alreadyAdded = true
            })
            if (alreadyAdded === false) {
              global.poi.push(point)
              axios
                .get(baseURL + point)
                .then(response => {
                  global.coordinates.push(response.data.coordinates[0])
                })  
              // this.setState({points_of_interest: global.poi.sort()})
            }
            
          })
        })
        .catch(error => console.log('categories ', error))
      if (index + 1 === categories.length) {
        this.setState({points_of_interest: global.poi.sort()})
      }
    })

  }

  render() {
    let pointsOfInterest = require('../data/POIs.json');

    let columnOne = undefined
    let columnTwo = undefined
    let userLocation = this.state.location.coords
    let POIs = []
    let load = <Loading> Getting user location... </Loading>
    let sortedPointsOfInterest = []

    let addPOI = undefined

    // if (this.state.points_of_interest !== undefined) console.log('testing ', this.state.points_of_interest)

    if (
      this.state.location.coords.latitude !== undefined &&
      this.state.location.coords.longitude !== undefined &&
      this.state.points_of_interest.length > 0
    ) {
      console.log('pois:', this.state.points_of_interest.length)
      load = undefined
      addPOI = <Card title="Add POI" />
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
      POIs = POIs[0]
      let sortedPOIs = sortDistance(POIs)
      for (let i = 0; i < sortedPOIs.length; i++) {
        sortedPointsOfInterest.push(pointsOfInterest[sortedPOIs[i]])
        // sortedPointsOfInterest.push(PointsOfInterest[sortedPOIs[i]])
      }

      columnTwo = this.state.points_of_interest.map((POI, index) => {
        // let userDistance = POIs[index][0]
        if (index % 2 !== 1) {
          return (
            <Card
              key={index}
              api={POI}
            />
          )
        }
      })

      columnOne = this.state.points_of_interest.map((POI, index) => {
        // let userDistance = POIs[index][0]
        if (index % 2 === 1) {
          return (
            <Card
              key={index}
              api={POI}
            />
          )
        }
      })

      // columnTwo = sortedPointsOfInterest.map((POI, index) => {
      //   let userDistance = POIs[sortedPOIs[index]][0]
      //   if (index % 2 !== 1) {
      //     return (
      //       <Card
      //         key={index}
      //         city={POI.city}
      //         title={POI.name}
      //         image={POI.image.url}
      //         distance={userDistance}
      //         description={POI.description}
      //         hyperlink={POI.hyperlink}
      //       />
      //     )
      //   }
      // })
      // columnOne = sortedPointsOfInterest.map((POI, index) => {
      //   let userDistance = POIs[sortedPOIs[index]][0]
      //   if (index % 2 === 1) {
      //     return (
      //       <Card
      //         key={index}
      //         city={POI.city}
      //         title={POI.name}
      //         image={POI.image.url}
      //         distance={userDistance}
      //         description={POI.description}
      //         hyperlink={POI.hyperlink}
      //       />
      //     )
      //   }
      // })
    }

    return (
      <Layout>
        {/* <TouchableOpacity 
          onPress={() => {
            let temp = this.state.points_of_interest.sort();
            let Delete = [];
            Delete = temp.map((value, index) => {
              if (index !== temp.length) {
                if (value === temp[index + 1]) {
                  return index
                }
              }
            })
            Delete.map((value) => {
              if (value !== undefined) {
                temp.splice(value, 1)
              }
            })
            this.setState({points_of_interest: temp})
            console.log('lol ', this.state.points_of_interest)
            console.log('test', global.coordinates)
          }}
            
          style={{backgroundColor:'black', height:50, width: 50}}
        /> */}
        {load}
        <ColumnOne>{addPOI}{columnOne}</ColumnOne>
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

const Loading = styled.Text``
