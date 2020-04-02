import React, { Component } from 'react'
import styled from 'styled-components'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { CheckBox, Input } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { Linking } from 'react-native'

function GoToButton({ App, state }) {
  const navigation = useNavigation()
  global.name = state.name

  // if(state.password === state.password_check){
  //   console.log("Great succes")
  // }

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('App'),
          console.log(
            state.name,
            state.mail,
            state.password,
            state.password_check,
            state.tof
          )
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
    name: null,
    mail: null,
    password: null,
    password_check: null,
  }

  render() {
    return (
      <Screen source={require('../assets/test_background.jpg')}>
        <Container>
          <Title>Sign up</Title>
          <InputTitle>First name:</InputTitle>
          <Inputfield
            placeholder={'  First name'}
            value={this.state.name}
            onChangeText={(name) => this.setState({ name })}
          />
          <InputTitle>E-mail address:</InputTitle>
          <Inputfield
            placeholder={'  E-mail address'}
            value={this.state.mail}
            onChangeText={(mail) => this.setState({ mail })}
          />
          <InputTitle>Password:</InputTitle>
          <Inputfield
            placeholder={'  Password'}
            secureTextEntry={true}
            value={this.state.password}
            onChangeText={(password) => this.setState({ password })}
          />
          <InputTitle>Repeat password:</InputTitle>
          <Inputfield
            placeholder={'  Repeat password'}
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
