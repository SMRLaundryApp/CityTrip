import React, { Component } from 'react';
import { FlatList, Text, View, Alert, NativeModules } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import styles from './Style';
import data from './data/POIs.json';
import cityIds from './data/CityIds.json';
import routes from './data/Routes.json';

class POI extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data
    };
  }

  // componentDidMount() {
  //   this.setState({
  //     data
  //   })
  // }

  render() {    

    let test = this.state.data.map(function(idPOI, index) {
      return(
          <Text style={styles.calloutTitleText}>{idPOI.id}</Text>
      )
    });

    // let coordsPOI

    return (
      // <Marker coordinate={{latitude:this.state.dataSource.coords.latitude, longitude:this.state.dataSource.coords.longitude}} pinColor='orange' >
      //   <Callout>
          // <View>
            <Text /*style={styles.calloutTitleText}*/>{test}</Text>
          // </View>
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
