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
        <ScrollView>
          <ItemsLayout cityName={this.props.city} />
        </ScrollView>
      </Container>
    )
  }
}

const Container = styled.View``


