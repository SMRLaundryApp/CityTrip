import React, { Component } from 'react'
import styled from 'styled-components'
import Welcomebar from '../Components/Welcomebar'
import Map from '../Components/Map'

export default class Home_map extends Component {
  render() {
    return (
      <Container>
        <Welcomebar />
        <Map />
      </Container>
    )
  }
}

const Container = styled.View`
  flex: 1;
  background-color: white;
`
