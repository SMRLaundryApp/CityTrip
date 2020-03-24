import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Home_map from './screens/Home_map';
import POI_list from './screens/POI_list';
import Routes_list from './screens/Routes_list';
import Settings from './screens/Settings';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';

function HomeScreen() {
  return(
    <Home_map />
  )
}

function POI_Nearby() {
  return (
    <POI_list />
  );
}

function Routes_Nearby() {
  return (
    <Routes_list />
  );
}

function SettingsScreen() {
  return (
    <Settings />
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Map" component={HomeScreen} />
        <Tab.Screen name="POI Nearby" component={POI_Nearby} />
        <Tab.Screen name="Routes Nearby" component={Routes_Nearby} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}