import React, { Component } from 'react'
import styled from 'styled-components'

//Code used to determine the time of the day, for greetings in the morning/afternoon/evening
var today = new Date()
var curHr = today.getHours()
var moment

function getDayTime() {
  var today = new Date()
  var curHr = today.getHours()
  var moment

  if (curHr < 12 && curHr >= 6) {
    moment = 'Good morning'
  } else if (curHr < 18 && curHr >= 12) {
    moment = 'Good afternoon'
  } else if (curHr >= 18 && curHr <= 22) {
    moment = 'Good evening'
  } else {
    moment = 'Good night'
  }

  return moment
}

class Greeting extends Component {
  render() {
    var moment_day = getDayTime()
    return (
      <Container>
        <Title>{moment_day + ','}</Title>
      </Container>
    )
  }
}

class Name extends Component {
  render(){
    return(
      <Container>
        <UserName>{global.name}</UserName>
      </Container>
    )
  }
}
export default class Welcomebar extends Component {
  render() {
    return (
      <Container>
        <Titlebar>
          <Avatar source={require('../assets/avatar.jpg')} />
          <Greeting />
          <Name />
        </Titlebar>
      </Container>
    )
  }
}

const Container = styled.View``

const Titlebar = styled.View`
  width: 100%;
  margin-top: 40px;
  padding-left: 80px;
  margin-bottom: 10px;
`

const Avatar = styled.Image`
  width: 50px;
  height: 50px;
  background: black;
  border-radius: 25px;
  margin-left: 20px;
  position: absolute;
  top: 3px;
  left: 0;
`

const Title = styled.Text`
  font-size: 20px;
  font-weight: 500;
  color: #b8bece;
`

const UserName = styled.Text`
  font-size: 20px;
  color: #3c4560;
  font-weight: bold;
`
