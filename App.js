import 'react-native-gesture-handler'
import React from 'react'
import Home_map from './screens/Home_map'
import POI_list from './screens/POI_list'
import Routes_list from './screens/Routes_list'
import Settings from './screens/Settings'
import Login from './screens/Loginscreen'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'

//Prettier command: prettier --print-width 80 --no-semi --single-quote --trailing-comma es5 --write ./App.js

function HomeScreen() {
  return(
    <Home_map showUserLocation={true}/>
  )
}

function POI_Nearby() {
  return (
    // TODO: use Google Maps API to get current city from longitude and latitude coordinates
    <POI_list city = 'Leiden'/>
  )
}

function Routes_Nearby() {
  return <Routes_list />
}

function SettingsScreen() {
  return <Settings />
}

function loginScreen() {
  return <Login />
}
const Tab = createBottomTabNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName

            if (route.name === 'Map') {
              iconName = focused ? 'ios-map' : 'ios-map'
            } else if (route.name === 'POI Nearby') {
              iconName = focused ? 'ios-pin' : 'ios-pin'
            } else if (route.name === 'Routes Nearby') {
              iconName = focused ? 'ios-walk' : 'ios-walk'
            } else if (route.name === 'Settings') {
              iconName = focused ? 'ios-list-box' : 'ios-list-box'
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />
          },
        })}
        tabBarOptions={{
          activeTintColor: 'seagreen',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Map" component={HomeScreen} />
        <Tab.Screen name="POI Nearby" component={POI_Nearby} />
        <Tab.Screen name="Routes Nearby" component={Routes_Nearby} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
        <Tab.Screen name ="Login" component={loginScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
