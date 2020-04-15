import React, { Component } from 'react'
import MapView, { Marker } from 'react-native-maps'
import userLocationPin from '../assets/userLocation.png'
import POI_Marker_Windmill from '../assets/POI_Marker_Windmill.png'
import POI_Marker_Castle from '../assets/POI_Marker_Castle.png'
import Constants from 'expo-constants'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'

// TODO: Use the user location from react-native-maps instead of expo-location

const GEOLOCATION_OPTIONS = {
  accuracy: 6,
  // timeInterval : 5000
  distanceInterval: 10,
}

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

export default class Map extends Component {
  state = {
    location: { coords: { latitude: 0, longitude: 0 } },
    errorMessage: null,
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
    this.setState({ mountedLocation: Location.watchPositionAsync(GEOLOCATION_OPTIONS, this.locationChanged) })
  }

  locationChanged = (location) => {
    this.setState({ location })
  }

  componentWillUnmount() {
    // Location.watchPositionAsync must be turned off or somehow unmounted
    this.state.mountedLocation._55.remove()
    // console.log(this.state.mountedLocation)
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
    let POIs = pointsOfInterest.map((POI, index) => {
      let pass = false
      let userCategories = filterCategories()
      for (let i = 0; i < userCategories.length; i++) {
        for (let j = 0; j < POI.category.length; j++) {
          if (POI.category[j] === userCategories[i]) {
            pass = true
          }
        }
      }
      if (pass) {
        let imagePOI = undefined
        if      (POI.category[0] === "mills")   {imagePOI = POI_Marker_Windmill}
        else{ if(POI.category[0] === "castles") {imagePOI = POI_Marker_Castle}}
        return (
          <Marker
            key={index}
            title={POI.name}
            pinColor="#19B092"
            image={imagePOI}
            coordinate={{
              latitude: POI.coords.latitude,
              longitude: POI.coords.longitude,
            }}
          />
        )
      }
    })

    return (
      <MapView
        style={{ width: '100%', height: '100%' }}
        initialRegion={{
          latitude: 52.152285,
          longitude: 5.3,
          latitudeDelta: 4,
          longitudeDelta: 4,
        }}
      >
        {userLocation}
        {POIs}
      </MapView>
    )
  }
}
