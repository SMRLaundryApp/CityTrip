import React, { Component } from 'react';
import styled from 'styled-components';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';


export default class Login extends Component{
    render() {
      return (
        <Screen source={require('../assets/test_background.jpg')}>
        <Container>
          <Image source={require('../assets/logo_citytrip.png')} />
        </Container>
        <Container>
          <Appname>Citytrip</Appname>
          <Quote>Explore places!</Quote>
          <TouchableOpacity
            onPress={() => console.log('Sign_up button pressed')}
          >
            <Butoon>
              <Butoontext>Sign up</Butoontext>
            </Butoon>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => console.log('Sign_in button pressed')}
          >
            <Buttoon2>
              <Butoontext>Sign in</Butoontext>
            </Buttoon2>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => console.log('Forgot my password pressed')}
          >
            <Txt>I forgot my password</Txt>
          </TouchableOpacity>
        </Container>
      </Screen>
    )
  }
}

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
  text-shadow: 2px 2px 4px #000;
`

const Quote = styled.Text`
  align-self: center;
  color: #fff;
  font-size: 20px;
  font-weight: 400;
  margin-bottom: 10%;
  text-shadow: 2px 2px 4px #888;

`

const Txt = styled(Quote)`
  margin-bottom: 0px;
`

const Image = styled.Image`
  align-self: center;
  transform: scale(0.6, 0.6);
	box-shadow: 0 5px 15px rgba(0, 0, 0, 0.30);
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
