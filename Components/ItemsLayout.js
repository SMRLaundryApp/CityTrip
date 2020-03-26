import React, { Component } from 'react';
import styled from 'styled-components';
import Card from './Card';



export default class ItemsLayout extends Component {
 
  render() {

    let pointsOfInterest = require('../data/POIs.json').cityName[this.props.cityName];

    let name = this.props.cityName;
    let columnOne = [];
    let columnTwo = [];

    columnOne.push(pointsOfInterest.map(function(POI, index) {
      if (index % 2 !== 1) {
        return (
          <Card cityName={name} title={POI.name} image={POI.image.url} />
        )
      }
    }));
    columnTwo.push(pointsOfInterest.map(function(POI, index) {
      if (index % 2 === 1) {
        return (
          <Card cityName={name} title={POI.name} image={POI.image.url} />
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