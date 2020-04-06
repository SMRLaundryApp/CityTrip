import React, { Component } from 'react'
import styled from 'styled-components'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { CheckBox } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import Welcomebar from '../Components/Welcomebar'

const axios = require('axios').default
axios.defaults.baseURL = 'https://citytrip.trifall.net/api'

export default class Interests extends Component {
    render(){
        return(
            <Screen>

            </Screen>
        )
    }
}

const Screen = styled.ImageBackground`
  flex: 1;
`