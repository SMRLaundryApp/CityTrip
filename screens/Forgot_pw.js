import React, { Component } from 'react'
import styled from 'styled-components'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { CheckBox } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'

const axios = require('axios').default
axios.defaults.baseURL = 'https://citytrip.trifall.net/api'

function GoToButton({ App, state }) {
  const navigation = useNavigation()

  postForgotPW = () => {
    let email = state.mail

    axios
      .post('', { email: email })
      .then(function (response) {
        console.log(response), navigation.navigate('Login')
      })
      .catch(function (error) {
        alert(error)
      })
  }

  return (
    <TouchableOpacity
      onPress={() => {
        postForgotPW()
      }}
    >
      <Butoon>
        <Butoontext>Recover password</Butoontext>
      </Butoon>
    </TouchableOpacity>
  )
}

export default class Forgot_pw extends Component {
  state = {
    mail: '',
  }

  render() {
    return (
      <Screen source={require('../assets/test_background.jpg')}>
        <Container>
          <Title>Forgot password</Title>
          <InputTitle>E-mail address:</InputTitle>
          <Inputfield
            placeholder={'  E-mail address'}
            value={this.state.mail}
            onChangeText={(mail) => this.setState({ mail })}
          />

          <GoToButton state={this.state} />
        </Container>
      </Screen>
    )
  }
}

const Screen = styled.ImageBackground`
  flex: 1;
`

const Container = styled.View`
  height: 85%;
  width: 90%;
  align-self: center;
  margin-top: 20%;
`

const Inputfield = styled.TextInput`
  background-color: white;
  margin-left: 10px;
  margin-bottom: 20px;
  margin-right: 10px;
  height: 40px;
  border-radius: 2px;
`

const Title = styled.Text`
  align-self: center;
  color: #fff;
  font-size: 40px;
  font-weight: 400;
  margin: 20px;
  text-shadow: 2px 2px 4px #4d4d4d;
  margin-bottom: 40px;
`

const InputTitle = styled.Text`
  align-self: auto;
  color: #fff;
  margin-left: 10px;
  margin-bottom: 5px;
  font-size: 20px;
  font-weight: 400;
  text-shadow: 1px 1px 2px #4d4d4d;
`

const Butoon = styled.View`
  align-self: center;
  width: 80%;
  height: 42px;
  background-color: #19b092;
  border-radius: 5px;
  margin: 10px;
  margin-top: 20%;
`

const Butoontext = styled.Text`
  align-self: center;
  font-size: 28px;
  font-weight: 400;
  color: #fff;
`
