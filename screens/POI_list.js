import React, { Component } from 'react'
import Welcomebar from '../Components/Welcomebar'
import styled from 'styled-components'
import { ScrollView } from 'react-native'
import ItemsLayout from '../Components/ItemsLayout'

export default class POI_list extends Component {
  render() {
    return (
      <Container>
        <Welcomebar />
        <Subtitle>{this.props.city}</Subtitle>
        <ScrollView>
          <ItemsLayout cityName={this.props.city} />
        </ScrollView>
      </Container>
    )
  }
}

const Container = styled.View``

const Subtitle = styled.Text`
  font-size: 20px;
  color: #3c4560;
  font-weight: 500;
  margin-top: 10px;
  margin-left: 25px;
  margin-bottom: 10px;
  text-transform: uppercase;
`
