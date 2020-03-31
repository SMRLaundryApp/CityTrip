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
        <ScrollView>
          <RoutesLayout />
        </ScrollView>
      </Container>
    )
  }
}

const Container = styled.View``
