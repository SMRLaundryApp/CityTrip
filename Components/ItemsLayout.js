import React, { Component } from 'react';
import styled from 'styled-components';
import { Text } from 'react-native';
import Card from './Card';

// TODO: Change the custom columns to table from react native (react-native-table-component)

export default class ItemsLayout extends Component {
  
  
  
  render() {

    let pointsOfInterest = require('../data/POIs.json').cityName[this.props.cityName]

    let name = this.props.cityName;
    let count = Object.keys(pointsOfInterest).length;
    let columnOne = [];
    let columnTwo = [];
    let columnOneValue = [];
    let columnTwoValue = [];

    columnOneValue.push(pointsOfInterest.map(function(POI, index) {
      if (index % 2 !== 1) {
        return (
          <Card cityName={name} title={POI.name} image={POI.image.url} />
        )
      }
    }));
    columnTwoValue.push(pointsOfInterest.map(function(POI, index) {
      if (index % 2 === 1) {
        return (
          <Card cityName={name} title={POI.name} image={POI.image.url} />
        )
      }
    }));

    columnOne.push(<Text>{JSON.stringify(pointsOfInterest)}</Text>)
    // columnTwoValue = (count % 2)
    //   ? pointsOfInterest[count / 2 : count - 1]
    //   : 
    columnTwo.push(<Text>{Object.keys(pointsOfInterest).length % 2}</Text>)

    return (
      <Layout>
        <ColumnOne>
          {columnOneValue}
        </ColumnOne>
        <ColumnTwo>
          {columnTwoValue}
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