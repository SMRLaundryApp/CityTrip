import React, { Component } from 'react'
import styled from 'styled-components'
import { useNavigation } from '@react-navigation/native'

function GoToHomescreen({ App, state }) {
  if (state.timerDone) {
    const navigation = useNavigation()
    navigation.navigate("App")
  }
  return (
    <Clear />
  )
}

export default class Loading extends Component {

  state = { timerDone: false }

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.timoutHandle = setTimeout(() => {this.setState({timerDone: true})}, 1000)
  }

  render() {

    return (
      <Screen source={require('../assets/test_background.jpg')}>
        <Container>
          <Image source={require('../assets/logo_citytrip.png')} />
        </Container>
        <Container>
          <GoToHomescreen state={this.state} />
          <Txt>Loading...</Txt>
        </Container>
      </Screen>
    )
  }
}

const Clear = styled.View`
  height: 200px;
`

const Screen = styled.ImageBackground`
  flex: 1;
`

const Container = styled.View`
  flex: 1;
`

const Txt = styled.Text`
  align-self: center;
  color: #fff;
  font-size: 20px;
  font-weight: 400;
  text-shadow: 2px 2px 4px #4d4d4d;
  margin-bottom: 0px;
`

const Image = styled.Image`
  align-self: center;
  transform: scale(0.6, 0.6);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
`
