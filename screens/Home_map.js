import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import styled from 'styled-components';
import Welcomebar from '../Components/Welcomebar';
import Map from '../Components/Map';

export default class Home_map extends React.Component{
    
    
      render(){
    
        return (
          <Container>
            <Welcomebar />
            
            <Map showUserLocation={true} />
  
              
            </Container>
        );
      }
    }
    
    const Container = styled.View`
        flex: 1;
        background-color: white;
    `;
    
