import React, { Component } from 'react'
import RoutesLayout from '../Components/RoutesLayout'
import Welcomebar from '../Components/Welcomebar'
import styled from 'styled-components'
import { ScrollView } from 'react-native-gesture-handler'

export default class Routes_list extends Component {
  render() {
    return (
      <Container>
        <Welcomebar />
        <Subtitle>{this.props.city}</Subtitle>
        <ScrollView>
          <RoutesLayout />
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
  text-transform: uppercase;
`
