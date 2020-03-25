import React, { Component } from 'react';
import styled from 'styled-components';
import { Text } from 'react-native';

export default class ItemsLayout extends Component {
  
  
  
  render() {

    let pointsOfInterest = require('../data/POIs.json').cityName[this.props.cityName]

    let count = Object.keys(pointsOfInterest).length;
    let columnOne = [];
    let columnTwo = [];
    columnOne.push(<Text>{JSON.stringify(pointsOfInterest)}</Text>)
    // columnTwoValue = (count % 2)
    //   ? pointsOfInterest[count / 2 : count - 1]
    //   : 
    columnTwo.push(<Text>{Object.keys(pointsOfInterest).length % 2}</Text>)

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