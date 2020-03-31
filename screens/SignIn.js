import React, { Component } from 'react'
import styled from 'styled-components'
import {
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native-gesture-handler'
import { TextInput, Linking } from 'react-native'
import { CheckBox, Input } from 'react-native-elements'

export default ({ navigation }) => (

  <Screen source={require('../assets/test_background.jpg')}>
    <Container>
      <Title>Sign-in</Title>
      <InputTitle>E-mail address:</InputTitle>
      <Inputfield placeholder={'E-mail address'} />
      <InputTitle>Password:</InputTitle>
      <Inputfield placeholder={'Password'} secureTextEntry={true} />
      <CheckBox 
      center 
      title="Remember password" 
      onPress={() => alert("You stupid?!")}
      />
      <Butoon>
        <Butoontext onPress={() => navigation.navigate("App")}>Sign-in</Butoontext>
      </Butoon>
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
  opacity: 0.9;
`

const Inputfield = styled.TextInput`
  background-color: white;
  margin-left: 10px;
  margin-bottom: 20px;
  margin-right: 10px;
  height: 40px;
`

const Title = styled.Text`
  align-self: center;
  color: #fff;
  font-size: 60px;
  font-weight: 400;
  margin: 20px;
  text-shadow: 2px 2px 4px #000;
  margin-bottom: 80px;
`

const InputTitle = styled.Text`
  align-self: auto;
  color: #fff;
  margin-left: 10px;
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
  margin-top: 20%;
`

const Butoontext = styled.Text`
  align-self: center;
  font-size: 28px;
  font-weight: 400;
  color: #fff;
  text-shadow: 2px 2px 4px #888;
`