import React from 'react';
import styled from 'styled-components';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';


export default class Login extends React.Component{
    render(){
      return (
        <Container>
            <Image source={require('../assets/temp_logo.jpg')}/>
            <Appname>Citytrip</Appname>
            <Quote>Explore places!</Quote>
            <TouchableOpacity onPress={() => console.log('Sign_up button pressed')}>
              <Butoon>
              <Butoontext>Sign up</Butoontext>
              </Butoon>
            </TouchableOpacity>
            <Divider>-or-</Divider>
            <TouchableOpacity onPress={() => console.log('Sign_in button pressed')}>
              <Buttoon2>
              <Butoontext>Sign in</Butoontext>
              </Buttoon2>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log('Forgot my password pressed')}>
              <Divider>I forgot my password</Divider>

            </TouchableOpacity>
        </Container>
      );
    }
  }
  
   const Container = styled.View`
    flex: 1;
    background-color:  #26734d;
  `;

   const Appname = styled.Text`
    align-self: center;
    color: #fff;
    font-size: 50px;
    font-weight: 600;
    margin-top: 10%;
    text-shadow: 2px 2px 4px #000;

    
   `;

   const Quote = styled.Text`
    align-self: center;
    color: #fff;
    font-size: 20px;
    font-weight: 400;
    margin-bottom: 25%;
   `;

   const Divider = styled(Quote)`
   margin-bottom: 0px;
   `

    const Image = styled.Image`
    align-self: center;
    width: 100%;
    height: 30%;
    margin-bottom: 20px;

    `;

    const Butoon = styled.View`
    align-self: center;
    width: 80%;
    height: 42px;
    background-color: #88C868;
    border-radius: 100px;
    margin: 10px;
    `;  

    const Buttoon2 = styled(Butoon)`
    background-color: #61a93d;
    `;

    const Butoontext = styled.Text`
    align-self: center;
    font-size: 28px;
    font-weight: 400;
    color: #fff;
    text-shadow: 2px 2px 4px #888;
    `;