import React from 'react';
import styled from 'styled-components';


export default class Login extends React.Component{
    render(){
      return (
        <Container>
            <Image source={require('../assets/temp_logo.jpg')}/>
            <Appname>Citytrip</Appname>
            <Quote>Explore places!</Quote>
            
        </Container>
      );
    }
  }
  
   const Container = styled.View`
    flex: 1;
    background-color: white;
  `;

   const Appname = styled.Text`
    align-self: center;
    color: #888;
    font-size: 50px;
    font-weight: 600;
   `;

   const Quote = styled.Text`
    align-self: center;
    color: #888;
    font-size: 20px;
    font-weight: 400;
   `;

    const Image = styled.Image`
    align-self: center;
    width: 80%;
    height: 30%;
    margin: 20px;

    `;

    