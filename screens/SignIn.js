import React, { Component } from 'react'
import styled from 'styled-components'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { CheckBox } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'

const axios = require('axios').default
axios.defaults.baseURL = 'https://citytrip.trifall.net/api'

function GoToButton({ App, state }) {
  const navigation = useNavigation()

  postLogin = () => {
    let name = state.login
    let pw = state.password
    axios
      .post('/login', { login: name, password: pw })
      .then(function (response) {
        ;(global.userData = response.data), (global.name = response.data.user.username), navigation.navigate('App')
      })
      .catch(function (error) {
        alert(error)
      })
    //Add badge
  }

  return (
    <TouchableOpacity
      onPress={() => {
        postLogin()
        // console.log(state.mail, state.password, state.rp)
      }}
    >
      <Butoon>
        <Butoontext>Sign in</Butoontext>
      </Butoon>
    </TouchableOpacity>
  )
}

export default class SignIn extends Component {
  state = {
    login: '',
    password: '',
    rp: false,
  }

  render() {
    return (
      <Screen source={require('../assets/test_background.jpg')}>
        <Container>
          <Title>Sign in</Title>
          <InputTitle>E-mail address:</InputTitle>
          <Inputfield
            placeholder={'  Enter your e-mail address'}
            value={this.state.mail}
            onChangeText={(login) => this.setState({ login })}
          />
          <InputTitle>Password:</InputTitle>
          <Inputfield
            placeholder={'  Enter your password'}
            secureTextEntry={true}
            value={this.state.password}
            onChangeText={(password) => this.setState({ password })}
          />
          <CheckBox
            center
            title="Remember password"
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={this.state.rp}
            onPress={() => {
              this.setState({ rp: !this.state.rp })
            }}
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
  font-size: 60px;
  font-weight: 400;
  margin: 20px;
  text-shadow: 2px 2px 4px #4d4d4d;
  margin-bottom: 20px;
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
