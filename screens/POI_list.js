import React, { Component } from 'react'
import Welcomebar from '../Components/Welcomebar'
import styled from 'styled-components'
import { ScrollView } from 'react-native'
import CardsLayout from '../Components/CardsLayout'

export default class POI_list extends Component {
  render() {
    return (
      <Container>
        <Welcomebar />
        <ScrollView>
          <CardsLayout cityName={this.props.city} />
        </ScrollView>
      </Container>
    )
  }
}

const Container = styled.View``
