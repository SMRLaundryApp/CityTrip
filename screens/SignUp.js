import React, { Component } from 'react'
import styled from 'styled-components'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { CheckBox } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'


function GoToButton({ App, state }) {
  const navigation = useNavigation()
  global.name = state.name

  // if(state.password === state.password_check){
  //   console.log("Great succes")
  // }

  return (
    <TouchableOpacity onPress={() => {navigation.navigate('App'),console.log(state.name, state.mail, state.password, state.password_check, state.tof)}}>
      <Butoon>
        <Butoontext>Sign up</Butoontext>
      </Butoon>
    </TouchableOpacity>
  )
}

export default class SignUp extends Component {
  state = {
    name: null,
    mail: null,
    password: null,
    password_check: null,
    tof: false,
  }

  render() {
    return (
      <Screen source={require('../assets/test_background.jpg')}>
        <Container>
          <Title>Sign up</Title>
          <InputTitle>First name:</InputTitle>
          <Inputfield placeholder={'  First name'}  value={this.state.name} onChangeText={name => this.setState({ name })} />
          <InputTitle>E-mail address:</InputTitle>
          <Inputfield placeholder={'  E-mail address'}  value={this.state.mail} onChangeText={mail => this.setState({ mail })}/>
          <InputTitle>Password:</InputTitle>
          <Inputfield placeholder={'  Password'} secureTextEntry={true}  value={this.state.password} onChangeText={password => this.setState({ password })}/>
          <InputTitle>Repeat password:</InputTitle>
          <Inputfield
            placeholder={'  Repeat password'}
            secureTextEntry={true}
            secureTextEntry={true}  value={this.state.password_check} onChangeText={password_check => this.setState({ password_check })}
          />
          <CheckBox
            center
            title="I agree with the terms of use"
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={this.state.tof}
            onPress={() => this.setState({ tof: !this.state.tof })}
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
  background-color: #19B092;
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
