import React, { Component } from 'react'
import styled from 'styled-components'
import {
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native-gesture-handler'
import { TextInput } from 'react-native'
import { CheckBox } from 'react-native-elements'

export default ({ navigation }) => (
  <Screen source={require('../assets/test_background.jpg')}>
    <Container>
      <Title>Sign-up</Title>
      <InputTitle>E-mail address:</InputTitle>
      <Inputfield placeholder={'E-mail address'} />
      <InputTitle>Password:</InputTitle>
      <Inputfield placeholder={'Password'} />
      <InputTitle>Repeat password:</InputTitle>
      <Inputfield placeholder={'Repeat password'} />
      <CheckBox center title="I agree with the terms of use" />
    </Container>
  </Screen>
)

const Screen = styled.ImageBackground`
  flex: 1;
`

const Container = styled.View`
  background-color: #888;
  height: 85%;
  width: 90%;
  align-self: center;
  margin-top: 20%;
  opacity: 0.8;
`

const Inputfield = styled.TextInput`
  background-color: white;
  margin-left: 20px;
  margin-bottom: 20px;
  margin-right: 20px;
  height: 40px;
`

const Title = styled.Text`
  align-self: center;
  color: #fff;
  font-size: 40px;
  font-weight: 400;
  margin: 20px;
  text-shadow: 2px 2px 4px #000;
`

const InputTitle = styled.Text`
  align-self: auto;
  color: #fff;
  margin-left: 20px;
  margin-bottom: 5px;
  font-size: 20px;
  font-weight: 400;
  text-shadow: 1px 1px 2px #000;
`

const Butoon = styled.View`
  align-self: center;
  width: 80%;
  height: 42px;
  background-color: #88c868;
  border-radius: 100px;
  margin: 10px;
`

const Buttoon2 = styled(Butoon)`
  background-color: #61a93d;
`

const Butoontext = styled.Text`
  align-self: center;
  font-size: 28px;
  font-weight: 400;
  color: #fff;
  text-shadow: 2px 2px 4px #888;
`
