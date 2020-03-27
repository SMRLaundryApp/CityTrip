import React, { Component } from 'react'
import Welcomebar from '../Components/Welcomebar'
import styled from 'styled-components'

export default class Settings extends Component {
  render() {
    return (
      <Container>
        <Welcomebar />
        <Message>Settings tab will be added in the near future</Message>
      </Container>
    )
  }
}

const Container = styled.View``

const Message = styled.Text`
  padding: 100px;
  text-align: center;
`
