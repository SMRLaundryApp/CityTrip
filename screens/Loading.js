import React, { Component } from 'react'
import styled from 'styled-components'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler'

// const navigation = useNavigation()

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
          <Appname> </Appname>
          <Quote> </Quote>
          {/* <TouchableOpacity onPress={() => this.setState({done: true})}>
            <Butoon>
              <Butoontext>Sign up</Butoontext>
            </Butoon>
          </TouchableOpacity> */}
          <GoToHomescreen state={this.state} />
        <Txt>Loading...</Txt>
        </Container>
      </Screen>
    )
  }
}

const Clear = styled.View``

const Screen = styled.ImageBackground`
  flex: 1;
`

const Container = styled.View`
  flex: 1;
`

const Appname = styled.Text`
  position: relative;
  align-self: center;
  text-transform: uppercase;
  color: #fff;
  font-size: 45px;
  font-weight: 900;
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
  background-color: #19b092;
`

const Butoontext = styled.Text`
  align-self: center;
  font-size: 28px;
  font-weight: 400;
  color: #fff;
`
