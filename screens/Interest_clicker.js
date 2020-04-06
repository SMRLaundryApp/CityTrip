import React, { Component } from 'react'
import styled from 'styled-components'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler'
import { CheckBox } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import Welcomebar from '../Components/Welcomebar'
import Interest_card from '../Components/Interest_card'

const axios = require('axios').default
axios.defaults.baseURL = 'https://citytrip.trifall.net/api'

function GoToButton({ App, state }) {
    const navigation = useNavigation()
  
    return (
      <TouchableOpacity
        onPress={() => {navigation.navigate('App')}}
      >
        <Butoon>
          <Butoontext>Take me to the app!</Butoontext>
        </Butoon>
      </TouchableOpacity>
    )
  }

export default class Interests extends Component {
    render(){
        return(
            <Screen>
            <Welcomebar />
            <Message>Welcome to Citytrip! Please let us know which types of POI you're interested in so we can personalize your experience:</Message>
            <ScrollView>
                <Interest_card image={'https://heavenly-holland.com/wp-content/uploads/2017/05/windmillHaarlem01.jpg'} title={'Mills'} subtitle={'Watermills | Windmills | Tide mills | Threadmills'} />
                <Interest_card image={'https://cdn.getyourguide.com/img/tour_img-1737331-148.jpg'} title={'Statues'} subtitle={'Leaders | Writers | Gods | Sporting legends'} />
                <Interest_card image={'https://static.dezeen.com/uploads/2018/06/morpheus-hotel-zha-architects-architecture-photo-ivan-dupont_dezeen_2364_sq_b.jpg'} title={'Architecture'} subtitle={'Modern | Classic | Historical'}/>
                <Interest_card image={'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F9%2F96%2FRijksmuseum_Amsterdam_ca_1895_rotated.jpg%2F1200px-Rijksmuseum_Amsterdam_ca_1895_rotated.jpg&f=1&nofb=1'} title={'Musea'} subtitle={'Science and Technology | History | Art'} />
                <Interest_card image={'https://akosbalogh.com/wp-content/uploads/2015/01/church1.jpg'} title={'Worshipping houses'} subtitle={'Churches | Synagogues | Mosques | Temples'} />
                <Interest_card image={'https://d17sbgss5yk2qq.cloudfront.net/wp-content/uploads/sites/2/2019/08/meiland.jpg'} title={'Castles'} subtitle={'Rectangular keep | Shell keep | Concentric castle'} />
            </ScrollView>
            <GoToButton/>
            </Screen>
        )
    }
}

const Screen = styled.ImageBackground`
  flex: 1;
`
const Message = styled.Text`
  align-self: center;
  color: #b8bece;
  font-size: 18px;
  font-weight: 400;
  padding: 5%;
`

const Butoon = styled.View`
  align-self: center;
  width: 80%;
  height: 42px;
  background-color: #19b092;
  border-radius: 5px;
  margin: 20px;
`

const Butoontext = styled.Text`
  align-self: center;
  font-size: 28px;
  font-weight: 400;
  color: #fff;
`
