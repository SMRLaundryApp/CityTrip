import React, { Component } from 'react'
import styled from 'styled-components'
import {
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native-gesture-handler'

export default ({ navigation }) => (
  <Screen source={require('../assets/test_background.jpg')}>
    <Container>
      <Image source={require('../assets/logo_citytrip.png')} />
    </Container>
    <Container>
      <Appname>Citytrip</Appname>
      <Quote>Explore places!</Quote>
      <TouchableOpacity onPress={() => navigation.push('SignUp')}>
        <Butoon>
          <Butoontext>Sign up</Butoontext>
        </Butoon>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.push('SignIn')}>
        <Buttoon2>
          <Butoontext>Sign in</Butoontext>
        </Buttoon2>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Forgot_pw')}>
        <Txt>I forgot my password</Txt>
      </TouchableOpacity>
    </Container>
  </Screen>
)

const Screen = styled.ImageBackground`
  flex: 1;
`

const Container = styled.View`
  flex: 1;
`

const Appname = styled.Text`
  position: relative;
  align-self: center;
  color: #fff;
  font-size: 50px;
  font-weight: 600;
  margin-top: 1%;
  text-shadow: 2px 2px 4px #4d4d4d;
`

const Quote = styled.Text`
  align-self: center;
  color: #fff;
  font-size: 20px;
  font-weight: 400;
  margin-bottom: 10%;
  text-shadow: 2px 2px 4px #4d4d4d;
`

const Txt = styled(Quote)`
  margin-bottom: 0px;
`

const Image = styled.Image`
  align-self: center;
  transform: scale(0.6, 0.6);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
`

const Butoon = styled.View`
  align-self: center;
  width: 80%;
  height: 42px;
  background-color: #1dc9a6;
  border-radius: 5px;
  margin: 10px;
`

const Buttoon2 = styled(Butoon)`
  background-color:  #19B092;
`

const Butoontext = styled.Text`
  align-self: center;
  font-size: 28px;
  font-weight: 400;
  color: #fff;
`
