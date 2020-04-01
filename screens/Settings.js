import React, { Component } from 'react'
import Welcomebar from '../Components/Welcomebar'
import styled from 'styled-components'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

function GoToButton({ App }) {
  const navigation = useNavigation();

  return(
    <TouchableOpacity onPress ={() => navigation.navigate('Login')}>
      <Butoon>
        <Butoontext>Sign out</Butoontext>
      </Butoon>
    </TouchableOpacity>
  )
}

export default class Settings extends Component {
  render() {
    return (
      <Container>
        <Welcomebar />
        <Message>Settings tab will be added in the near future</Message>
        <GoToButton />
      </Container>
    )
  }
}

const Container = styled.View``

const Message = styled.Text`
  padding: 100px;
  text-align: center;
`

const Butoon = styled.View`
  align-self: center;
  width: 80%;
  height: 42px;
  background-color: #1dc9a6;
  border-radius: 5px;
  margin: 10px;
`


const Butoontext = styled.Text`
  align-self: center;
  font-size: 28px;
  font-weight: 400;
  color: #fff;
`
