import React from 'react'
import styled from 'styled-components'
import Welcomebar from '../Components/Welcomebar'
import Map from '../Components/Map'

export default class Home_map extends React.Component {
  render() {
    return (
      <Container>
        <Welcomebar />
        <Map showUserLocation={this.props.showUserLocation}/>
      </Container>
    )
  }
}

const Container = styled.View`
  flex: 1;
  background-color: white;
`
