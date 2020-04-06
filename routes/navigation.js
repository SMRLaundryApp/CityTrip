import 'react-native-gesture-handler'
import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { Ionicons } from '@expo/vector-icons'

import Home_map from '../screens/Home_map'
import POI_list from '../screens/POI_list'
import Routes_list from '../screens/Routes_list'
import Settings from '../screens/Settings'
import Login from '../screens/Loginscreen'
import SignUp from '../screens/SignUp'
import SignIn from '../screens/SignIn'
import Forgot_pw from '../screens/Forgot_pw'
import Interests from '../screens/Interest_clicker'

//Prettier command: prettier --print-width 80 --no-semi --single-quote --trailing-comma es5 --write ./App.js

const Tab = createBottomTabNavigator()
const TabScreen = () => (
  <Tab.Navigator
    initialRouteName="Devel-login"
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName

        if (route.name === 'Map') {
          iconName = 'ios-map'
        } else if (route.name === 'POI Nearby') {
          iconName = 'ios-pin'
        } else if (route.name === 'Routes Nearby') {
          iconName = 'ios-walk'
        } else if (route.name === 'Settings') {
          iconName = 'ios-list-box'
        }

        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />
      },
    })}
    tabBarOptions={{
      activeTintColor: '#19B092',
      inactiveTintColor: 'gray',
    }}
  >
    <Tab.Screen name="Map" component={Home_map} />
    <Tab.Screen name="POI Nearby" component={POI_list} />
    <Tab.Screen name="Routes Nearby" component={Routes_list} />
    <Tab.Screen name="Settings" component={Settings} />
  </Tab.Navigator>
)

const AuthStack = createStackNavigator()
const AuthStackScreen = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen
      name="Interest_clicker"
      component={Interests}
      options={{ animationEnabled: false }}
    />
    <AuthStack.Screen
      name="Login"
      component={Login}
      options={{ animationEnabled: false }}
    />
    <AuthStack.Screen
      name="SignUp"
      component={SignUp}
      options={{ animationEnabled: false }}
    />
    
    <AuthStack.Screen
      name="SignIn"
      component={SignIn}
      options={{ animationEnabled: false }}
    />
    <AuthStack.Screen
      name="Forgot_pw"
      component={Forgot_pw}
      options={{ animationEnabled: false }}
    />
  </AuthStack.Navigator>
)

const RootStack = createStackNavigator()
const RootStackScreen = ({ userToken }) => (
  <RootStack.Navigator screenOptions={{ headerShown: false }}>
    <RootStack.Screen name="Auth" component={AuthStackScreen} />
    <RootStack.Screen name="App" component={TabScreen} />
  </RootStack.Navigator>
)

export default () => {
  return (
    <NavigationContainer>
      <RootStackScreen />
    </NavigationContainer>
  )
}
