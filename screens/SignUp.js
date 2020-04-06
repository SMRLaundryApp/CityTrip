import React, { Component } from 'react'
import styled from 'styled-components'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { CheckBox, Input } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { Linking } from 'react-native'

const axios = require('axios').default
axios.defaults.baseURL = 'https://citytrip.trifall.net/api'

function GoToButton({ App, state }) {
  const navigation = useNavigation()

  postSignup = () => {
    let u_name = state.username
    let email = state.mail
    let pw = state.password
    let pw_check = state.password_check

    if (pw != pw_check) {
      alert('Passwords do not match')
    }
    else if (pw.split('').length < 8){
      alert('Password is too short (must at least contain 8 characters)')
    }
    else if (!email.includes('@')) {
      alert('E-mail address is not an address')
    } 
    else {
      axios
        .post('/Users/maker', { username: u_name, email: email, password: pw })
        .then(function (response) {
          if (response.data.user.username === u_name) {
            ;(global.name = response.data.user.username),
              navigation.navigate('App')
          } else if (response.data.error) {
            alert(response.data.error)
          }
        })
        .catch(function (error) {
          alert(error)
        })
    }
  }

  return (
    <TouchableOpacity
      onPress={() => {
        postSignup()
      }}
    >
      <Butoon>
        <Butoontext>Sign up</Butoontext>
      </Butoon>
    </TouchableOpacity>
  )
}

export default class SignUp extends Component {
  links = {
    ToF: 'https://youtu.be/zvkmLnS4sAQ',
    PP: 'https://youtu.be/-9SXtQqVp9Q',
  }
  state = {
    username: '',
    mail: '',
    password: '',
    password_check: '',
  }

  render() {
    return (
      <Screen source={require('../assets/test_background.jpg')}>
        <Container>
          <Title>Sign up</Title>
          <InputTitle>Username:</InputTitle>
          <Inputfield
            placeholder={'  Enter username:'}
            value={this.state.name}
            onChangeText={(username) => this.setState({ username })}
          />
          <InputTitle>E-mail address:</InputTitle>
          <Inputfield
            placeholder={'  Enter e-mail address:'}
            value={this.state.mail}
            onChangeText={(mail) => this.setState({ mail })}
          />
          <InputTitle>Password:</InputTitle>
          <Inputfield
            placeholder={'  Enter password:'}
            secureTextEntry={true}
            value={this.state.password}
            onChangeText={(password) => this.setState({ password })}
          />
          <InputTitle>Repeat password:</InputTitle>
          <Inputfield
            placeholder={'  Repeat password:'}
            secureTextEntry={true}
            secureTextEntry={true}
            value={this.state.password_check}
            onChangeText={(password_check) => this.setState({ password_check })}
          />
          <Footer>
            By signing up, you agree to Citytrips
            <Link onPress={() => Linking.openURL(this.links.ToF)}>
              {' '}
              Terms of Use
            </Link>
            <Footer> and </Footer>
            <Link onPress={() => Linking.openURL(this.links.PP)}>
              {' '}
              Privacy policy.
            </Link>
          </Footer>
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

const Footer = styled(InputTitle)`
  font-size: 14px;
`

const Link = styled(Footer)`
  color: #19b092;
  text-decoration: underline;
  text-shadow: 1px 1px 0px #fff;
`

const Butoon = styled.View`
  align-self: center;
  width: 80%;
  height: 42px;
  background-color: #19b092;
  border-radius: 5px;
  margin: 10px;
  margin-top: 15%;
`

const Butoontext = styled.Text`
  align-self: center;
  font-size: 28px;
  font-weight: 400;
  color: #fff;
`
