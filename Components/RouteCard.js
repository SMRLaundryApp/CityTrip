import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { TouchableWithoutFeedback, TouchableOpacity } from 'react-native-gesture-handler'
import styled from 'styled-components'
import { Dimensions } from 'react-native'
import Modal from 'react-native-modal';
import MapView, { Marker } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'
import GOOGLE_MAPS_APIKEY from '../private'

const screenWidth = Dimensions.get('window').width
const cardWidth = screenWidth - 20
const cardHeight = screenWidth / 4
const imageWidth = screenWidth / 3

export default class RouteCard extends Component {

  state = {
    isModalVisible: false,
  }

  constructor(props) {
    super(props);
  }

  openModal = () => {
    this.setState({ isModalVisible: true })
  }

  closeModal = () => {
    this.setState({ isModalVisible: false })
  }

  render() {
    let pointsOfInterest = require('../data/POIs.json');
    let routes = require('../data/Routes.json');

    let durationHours = Math.floor((this.props.duration / 5).toFixed(0) / 12);
    let durationMinutes = (this.props.duration / 5).toFixed(0) % 12 * 5;
    let duration = "";
    if (durationHours >= 1) {
      duration += durationHours.toString() + " hour";
      if (durationHours > 1) duration += "s";
      duration += " ";
    }
    if (durationMinutes > 0) duration += durationMinutes.toString() + " minutes";

    let POIs = routes[Number(this.props.id.split("#")[1])].POIs.map((route, index) => {
      return (
        <Marker
          key = {index}
          title={pointsOfInterest[Number(route.split("#")[1])].name}
          pinColor= '#19B092'
          coordinate= {{
            latitude: pointsOfInterest[Number(route.split("#")[1])].coords.latitude,
            longitude: pointsOfInterest[Number(route.split("#")[1])].coords.longitude,
          }}
        />
      )
    });

    let mapPOIs = [];
    mapPOIs.push(routes[Number(this.props.id.split("#")[1])].POIs.map((route) => {
      return(
        [pointsOfInterest[Number(route.split("#")[1])].coords]
      )
    }));
    mapPOIs = mapPOIs[0];
    let mapWayPoints = [];
    for (let i = 1; i < mapPOIs.length - 1; i++) {
      mapWayPoints.push(mapPOIs[i]);
    }
    // mapWayPoints = mapWayPoints.pop().shift();
    console.log(mapPOIs);
    console.log(mapWayPoints);
    console.log(GOOGLE_MAPS_APIKEY);
    let mapDirections = undefined;
    // let mapDirections = (
    //   <MapViewDirections 
    //     origin={mapPOIs[0]}
    //     waypoints={mapWayPoints}
    //     destination={mapPOIs[mapPOIs.length - 1]}
    //     apikey={GOOGLE_MAPS_APIKEY}
    //     strokeWidth={3}
    //     strokeColor='hotpink'
    //   />
    // );

    return (
      <Clear>
        <TouchableWithoutFeedback
          delayPressIn={5}
          delayPressOut={5}
          delayLongPress={5}
          onPress={() => {
            console.log('roekoeroekoe');
            this.openModal();
          }}
        >
          <Container width={cardWidth} height={cardHeight}>
            <Cover width={imageWidth}>
              <Image source={{uri: this.props.image}} />
            </Cover>
            <Content left={imageWidth} height={cardHeight} width={cardWidth - imageWidth} >
              <Title>{this.props.title}</Title>
              <Info>{this.props.length} km  |  {duration}</Info>
            </Content>
          </Container>
        </TouchableWithoutFeedback>
        <Modal
          animationIn="slideInRight"
          animationOut="slideOutRight"
          isVisible={this.state.isModalVisible}
          style={{
            maxHeight:300
          }}
          onBackdropPress={() => this.closeModal()}
        >
          <View style={{ flex: 1 }}>
            <Title>{routes[Number(this.props.id.split("#")[1])].name} Route</Title>
            <MapView 
              style={{width:'100%', height:'100%'}}
              initialRegion={routes[Number(this.props.id.split("#")[1])].region}
              moveOnMarkerPress={false}
              zoomControlEnabled={false}
              zoomEnabled={false}
              zoomTapEnabled={false}
              rotateEnabled={false}
              scrollEnabled={false}
            >
              {POIs}
              {mapDirections}
            </MapView>
            <Clear style={{margin:'3%'}}/>
            <TouchableOpacity
              style={{
                backgroundColor:'red',
                height: 50,
                width:'40%',
                alignSelf:'flex-end'
              }}
              onPress={() => this.closeModal()}
            >
              <Text style={{textAlign:'center', textAlignVertical:'center', color:'white', height:'100%', fontSize:24, fontWeight:'bold'}}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </Clear>
    )
  }
}

const Clear = styled.View``

const Container = styled.View`
  align-self: center;
  background: #888;
  border-radius: 14px;
  margin: 0%;
  margin-top: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3); /*This particular line doesn't seem to do anything in android OS*/
`

const Cover = styled.View`
  position: absolute;
  height: 100%;
  border-top-left-radius: 14px;
  border-bottom-left-radius: 14px;
  overflow: hidden;
`

const Image = styled.Image`
  width: 100%;
  height: 100%;
`

const Content = styled.View`
justify-content: center;
  position: absolute;
  flex-direction: column;
  align-items: center;
`

const Title = styled.Text`
  padding-bottom: 5px;
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
`

const Info = styled.Text`
  color: #b8b3c3;
  font-size: 15px;
  font-weight: 600;
  margin-top: 4px;
`
