import React, { Component } from 'react'
import styled from 'styled-components'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { CheckBox } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'

const axios = require('axios').default
axios.defaults.baseURL = 'https://citytrip.trifall.net/api'

function filterCategories() {
  let userCategories = global.userData.user.categories.map((categoryAPI) => {
    if (categoryAPI === '/api/categories/2') {
      return '2'
    } else {
      if (categoryAPI === '/api/categories/3') {
        return '3'
      } else {
        if (categoryAPI === '/api/categories/4') {
          return '4'
        } else {
          if (categoryAPI === '/api/categories/5') {
            return '5'
          } else {
            if (categoryAPI === '/api/categories/6') {
              return '6'
            } else {
              if (categoryAPI === '/api/categories/7') {
                return '7'
              } else {
                if (categoryAPI === '/api/categories/8') {
                  return '8'
                } else {
                  if (categoryAPI === '/api/categories/9') {
                    return '9'
                  } else {
                    if (categoryAPI === '/api/categories/10') {
                      return '10'
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  })
  return userCategories
}

function GoToButton({ App, state }) {
  const navigation = useNavigation()

  postLogin = () => {
    let name = state.login
    let pw = state.password
    axios
      .post('/login', { login: name, password: pw })
      .then(function (response) {
        ;(global.userData = response.data),
          (global.cards = filterCategories()),
          (global.name = response.data.user.username),
          navigation.navigate('App')
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
          <InputTitle>Username:</InputTitle>
          <Inputfield
            placeholder={'Enter your username'}
            value={this.state.mail}
            onChangeText={(login) => this.setState({ login })}
          />
          <InputTitle>Password:</InputTitle>
          <Inputfield
            placeholder={'Enter your password'}
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
  padding: 5px;
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
