import React, { Component } from 'react'
import MapView, { Marker } from 'react-native-maps'
import User_Marker from '../assets/User_Marker.png'
import POI_Marker_Windmill from '../assets/POI_Marker_Windmill.png'
import POI_Marker_Castle from '../assets/POI_Marker_Castle.png'
import POI_Marker_Placesofworship from '../assets/POI_Marker_Placesofworship.png'
import POI_Marker_Amusementparks from '../assets/POI_Marker_Amusementparks.png'
import POI_Marker_Statue from '../assets/POI_Marker_Statue.png'
import POI_Marker_Food from '../assets/POI_Marker_Food.png'
import POI_Marker_Nightlife from '../assets/POI_Marker_Nightlife.png'
import POI_Marker_Museums from '../assets/POI_Marker_Museums.png'
import POI_Marker_Architecture from '../assets/POI_Marker_Architecture.png'
import Constants from 'expo-constants'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'

const GEOLOCATION_OPTIONS = {
  accuracy: 6,
  distanceInterval: 10,
}

function filterCategories() {
  let userCategories = global.userData.user.categories.map((categoryAPI) => {
    if (categoryAPI === '/api/categories/2') {
      return 'statues'
    } else {
      if (categoryAPI === '/api/categories/3') {
        return 'architecture'
      } else {
        if (categoryAPI === '/api/categories/4') {
          return 'museums'
        } else {
          if (categoryAPI === '/api/categories/5') {
            return 'amusementparks'
          } else {
            if (categoryAPI === '/api/categories/6') {
              return 'mills'
            } else {
              if (categoryAPI === '/api/categories/7') {
                return 'nightlife'
              } else {
                if (categoryAPI === '/api/categories/8') {
                  return 'placesofworship'
                } else {
                  if (categoryAPI === '/api/categories/9') {
                    return 'food'
                  } else {
                    if (categoryAPI === '/api/categories/10') {
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

export default class Map extends Component {
  state = {
    location: { coords: { latitude: 52.189527, longitude: 4.435696 } },
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
    this.setState({
      mountedLocation: Location.watchPositionAsync(
        GEOLOCATION_OPTIONS,
        this.locationChanged
      ),
    })
  }

  locationChanged = (location) => {
    this.setState({ location })
  }

  componentWillUnmount() {
    this.state.mountedLocation._55.remove()
  }

  render() {
    let userLocation = (
      <Marker
        title="User location"
        image={User_Marker}
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
        if (POI.category[0] === 'mills') {
          imagePOI = POI_Marker_Windmill
        } else {
          if (POI.category[0] === 'castles') {
            imagePOI = POI_Marker_Castle
          } else {
            if (POI.category[0] === 'placesofworship') {
              imagePOI = POI_Marker_Placesofworship
            } else {
              if (POI.category[0] === 'amusementparks') {
                imagePOI = POI_Marker_Amusementparks
              } else {
                if (POI.category[0] === 'statues') {
                  imagePOI = POI_Marker_Statue
                } else {
                  if (POI.category[0] === 'food') {
                    imagePOI = POI_Marker_Food
                  } else {
                    if (POI.category[0] === 'nightlife') {
                      imagePOI = POI_Marker_Nightlife
                    } else {
                      if (POI.category[0] === 'museums') {
                        imagePOI = POI_Marker_Museums
                      } else {
                        if (POI.category[0] === 'architecture') {
                          imagePOI = POI_Marker_Architecture
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
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
