import React, { Component } from 'react';
import { FlatList, Text, View, Alert, NativeModules } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import styles from './Style';
import value from './data/POIs.json';
import cityIds from './data/CityIds.json';
import routes from './data/Routes.json';

class POI extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: value
    };
  }

  // componentDidMount() {
  //   this.setState({
  //     data
  //   })
  // }

  render() {    

    let test = this.state.data.map((idPOI, index) => {
      return(
        <Text style={styles.calloutTitleText}>{idPOI.id}</Text>
      )
      console.log('test');
    });

    let test2 = this.state.data.map((coordsPOI, index) => {
      return(
        <Marker coordinate={{latitude:coordsPOI.coords.latitude, longitude:coordsPOI.coords.longitude}} pinColor='teal' >
          <Callout>
            <View>
              <Text style={styles.calloutTitleText}>{coordsPOI.name}</Text>
            </View>
          </Callout>
        </Marker>
      )
    });

    let test3 = this.state.data.map(function(namePOI, index) {
      return (
        <Text>{namePOI.name}</Text>
      )
    });

    return (
      // <Text>{count}</Text>

      // { printData }
      <MapView
          style={styles.mapStyle}
          region={{
            latitude: 52.159679,
            longitude: 4.490883,
            latitudeDelta: 0.03,
            longitudeDelta: 0.03,
          }}
        >
      {test2}
      </MapView>

      // <Marker coordinate={{latitude:this.state.dataSource.coords.latitude, longitude:this.state.dataSource.coords.longitude}} pinColor='orange' >
      //   <Callout>
      //     <View>
      //       <Text>{test}</Text>
      //     </View>
      //   </Callout>
      // </Marker>
      

      // <Marker coordinate={{
      // latitude:POIs.POI[0].coords.latitude,
      // longitude:POIs.POI[0].coords.longitude
      // }}
      // pinColor={'orange'} >
      //   <Callout>
      //     <View>
      //       <Text style={styles.calloutTitleText}>{POIs.POI[0].name}</Text>
      //     </View>
      //   </Callout>
      // </Marker>
    )
  }
}

export default POI
