import React, { Component } from 'react';
import styled from 'styled-components';
import Card from './Card';



function toRadians(degree) {
  return Math.PI / 180 * degree;
}

function getDistance(userLocationLatitude, userLocationLongitude, POILocationLatitude, POILocationLongitude) {
  var R = 6371;
  var lat1 = toRadians(userLocationLatitude);
  var lat2 = toRadians(POILocationLatitude);
  var dLat = toRadians(POILocationLatitude - userLocationLatitude);
  var dLng = toRadians(POILocationLongitude - userLocationLongitude);

  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

export default class ItemsLayout extends Component {
 
  render() {

    let pointsOfInterest = require('../data/POIs.json').cityName[this.props.cityName];

    let name = this.props.cityName;
    let columnOne = [];
    let columnTwo = [];
    let location = this.props.userLocation;

    columnOne.push(pointsOfInterest.map(function(POI, index) {
      userDistance = getDistance(location.latitude, location.longitude, POI.coords.latitude, POI.coords.longitude).toFixed(2);
      if (index % 2 !== 1) {
        return (
          <Card cityName={name} title={POI.name} image={POI.image.url} distance={userDistance} />
        )
      }
    }));
    columnTwo.push(pointsOfInterest.map(function(POI, index) {
      userDistance = getDistance(location.latitude, location.longitude, POI.coords.latitude, POI.coords.longitude).toFixed(2);
      if (index % 2 === 1) {
        return (
          <Card cityName={name} title={POI.name} image={POI.image.url} distance={userDistance} />
        )
      }
    }));

    return (
      <Layout>
        <ColumnOne>
          {columnOne}
        </ColumnOne>
        <ColumnTwo>
          {columnTwo}
        </ColumnTwo>
      </Layout>
    )
  }
}



const Layout = styled.View`
	flex-direction: row;
  margin-bottom: 170px;
`;

const ColumnOne = styled.View`
  align-items: center;
  width: 50%;
`;

const ColumnTwo = styled.View`
  align-items: center;
  width: 50%;
`;