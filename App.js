import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import styled from 'styled-components';
import Categories from './Components/Categories'
import Card from './Components/Card'
import { ScrollView } from 'react-native';

const items = [
	{ text: 'Map' },
  { text: 'POI Nearby' },
  { text: 'Add POI'},
  { text: 'Test 1'},
  { text: 'Settings' },
];

export default class App extends React.Component {
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
        <Titlebar>
          <Avatar source={require('./assets/avatar.jpg')} />
          <Title>Welcome back,</Title>
          <Name>Coleslaw</Name>
        </Titlebar>
        
        <ScrollView horizontal={true} style={{
		        padding: 20,
		        paddingLeft: 12,
		        paddingTop: 15,
		        flexDirection: 'row'
	          }}
	showsHorizontalScrollIndicator={false}>
	      {items.map((category, index) => (
							<Categories name={category.text} key={index} />
						))}
        </ScrollView>

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
          <Marker
          coordinate={{
            latitude: this.state.location.coords.latitude,
            longitude: this.state.location.coords.longitude
          }}
          title={'Kaka'}
          description={'Roekoe roekoe'}
          />

        </MapView>

        <Subtitle>Rijnsburg</Subtitle>
          <ItemsLayout>
            <ColumnOne>
              <Card />
            </ColumnOne>
            <ColumnTwo>
              <Card />
            </ColumnTwo>
          </ItemsLayout>
        
        </Container>
    );
  }
}

const Container = styled.View`
	flex: 1;
	background-color: white;
`;

const Titlebar = styled.View`
	width: 100%;
	margin-top: 50px;
	padding-left: 80px;
`;

const Avatar = styled.Image`
	width: 44px;
	height: 44px;
	background: black;
	border-radius: 22px;
	margin-left: 20px;
	position: absolute;
	top: 0;
	left: 0;
`;

const Title = styled.Text`
	font-size: 20px;
	font-weight: 500;
	color: #b8bece;
`;

const Name = styled.Text`
	font-size: 20px;
	color: #3c4560;
	font-weight: bold;
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
	flex: 1;
`;

const ColumnOne = styled.View``;

const ColumnTwo = styled.View``;

const styles = StyleSheet.create({
  mapView: {
    flex: 60,
    width: '100%',
    // height: '80%'
  },
});
