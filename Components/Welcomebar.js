import React, { Component } from 'react'
import styled from 'styled-components'

function getDayTime() {
  var today = new Date()
  var curHr = today.getHours()
  var moment = undefined

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

function getName() {
  if (global.name === null) {
    return 'Lazy user'
  }

  if (global.name != '') {
    return global.name
  }
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
  render() {
    var inputName = getName()
    return (
      <Container>
        <UserName>{inputName}</UserName>
      </Container>
    )
  }
}
export default class Welcomebar extends Component {
  render() {
    return (
      <Container>
        <Titlebar>
          <Avatar source={require('../assets/icon_new.png')} />
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
