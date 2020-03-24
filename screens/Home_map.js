import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import styled from 'styled-components';
import Welcomebar from '../Components/Welcomebar'



export default class Home_map extends React.Component{
    state = {
        location: { coords: { latitude: 52.19, longitude: 4.43}},
        errorMessage: null,
      };
    
      constructor(props) {
        super(props);
        if (Platform.OS === 'android' && !Constants.isDevice) {
          this.setState({
            errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
          });
        } else {
          this._getLocationAsync();
        }
      }
    
      _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
          this.setState({
            errorMessage: 'Permission to access location was denied',
          });
        }
    
        let location = await Location.getCurrentPositionAsync({accuracy: 6});
        this.setState({ location });
      };
    
    
      render() {
        let longitudeD;
        let latitudeD;
        if (this.state.errorMessage) {
          text = this.state.errorMessage;
        } else if (this.state.location) {
          longitudeD = this.state.location.coords.longitude;
          latitudeD = this.state.location.coords.latitude;
        }
    
        return (
          <Container>
            <Welcomebar />
            
    
            {/* <Title style={styles.title}>Citrytrip inc.</Title>
            <Title style={styles.paragraph}>{'Longitude: '}{JSON.stringify(this.state.location.coords.longitude)}</Title>
            <Title style={styles.paragraph}>{'Latitude: '}{JSON.stringify(this.state.location.coords.latitude)}</Title> */}
    
            <MapView style={styles.mapView}
              initialRegion = {{
                longitude: longitudeD, 
                latitude: latitudeD,
                longitudeDelta: 1.010,
                latitudeDelta: 1.010,
              }}
            >
              {/* <Marker
              coordinate={{
                latitude: this.state.location.coords.latitude,
                longitude: this.state.location.coords.longitude
              }}
              title={'Kaka'}
              description={'Roekoe roekoe'}
              /> */}
    
            </MapView>
            {/* <Subtitle>Rijnsburg</Subtitle>
              <ItemsLayout>
                <ColumnOne>
                  <Card />
                </ColumnOne>
                <ColumnTwo>
                  <Card />
                </ColumnTwo>
              </ItemsLayout> */}
              
            </Container>
        );
      }
    }
    
    const Container = styled.View`
        flex: 1;
        background-color: white;
    `;
    
    const Subtitle = styled.Text`
        font-size: 20px;
        color: #3c4560;
        font-weight: 500;
        margin-top: 10px;
        margin-left: 25px;
        text-transform: uppercase;
    `;
    
    const ItemsLayout = styled.View`
        flex-direction: row;
        flex: 50;
    `;
    
    const ColumnOne = styled.View``;
    
    const ColumnTwo = styled.View``;
    
    const styles = StyleSheet.create({
      mapView: {
        height: '100%',
        width: '100%',
        // height: '80%'
      },
    });