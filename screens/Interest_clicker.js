import React, { Component } from 'react'
import styled from 'styled-components'
import {
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import Welcomebar from '../Components/Welcomebar'
import Interest_card from '../Components/Interest_card'

const axios = require('axios').default

function GoToButton({ App }) {
  const navigation = useNavigation()

  return (
    <TouchableOpacity
      onPress={() => {
        axios
          .post(
            'https://citytrip.trifall.net/api/CategoryAdding/' +
              global.userData.user.id.toString(10),
            { categories: global.cards }
          )
          .then((response) => {
            global.userData = response.data
          })
          .catch((error) => console.log('Error:', error))
        navigation.navigate('Loading')
      }}
    >
      <Butoon>
        <Butoontext>Take me to the app!</Butoontext>
      </Butoon>
    </TouchableOpacity>
  )
}

export default class Interests extends Component {
  state = {}

  render() {
    function checkCategory(value) {
      for (let i = 0; i < global.cards.length; i++) {
        if (global.cards[i] === value) {
          global.cards.splice(i, 1)
          return false
        }
      }
      global.cards.push(value)
      return true
    }

    if (this.state.first === undefined) {
      this.setState({ first: true })
      global.cards.map((category, index) => {
        if (category === '2') {
          this.setState({ statues: true })
        } else {
          if (category === '3') {
            this.setState({ architecture: true })
          } else {
            if (category === '4') {
              this.setState({ museums: true })
            } else {
              if (category === '5') {
                this.setState({ amusementparks: true })
              } else {
                if (category === '6') {
                  this.setState({ mills: true })
                } else {
                  if (category === '7') {
                    this.setState({ nightlife: true })
                  } else {
                    if (category === '8') {
                      this.setState({ placesofworship: true })
                    } else {
                      if (category === '9') {
                        this.setState({ food: true })
                      } else {
                        if (category === '10') {
                          this.setState({ castles: true })
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
    }

    return (
      <Screen>
        <Welcomebar />
        <Message>
          Welcome to Citytrip! Please let us know which types of POI you're
          interested in so we can personalize your experience:
        </Message>
        <ScrollView>
          <TouchableWithoutFeedback
            delayPressIn={5}
            delayPressOut={5}
            delayLongPress={5}
            onPress={() => {
              this.setState({ statues: checkCategory('2') })
            }}
          >
            <Interest_card
              image={
                'https://cdn.getyourguide.com/img/tour_img-1737331-148.jpg'
              }
              title={'Statues'}
              subtitle={'Leaders | Writers | Gods | Sporting legends'}
              pressed={this.state.statues}
            />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            delayPressIn={5}
            delayPressOut={5}
            delayLongPress={5}
            onPress={() => {
              this.setState({ architecture: checkCategory('3') })
            }}
          >
            <Interest_card
              image={
                'https://static.dezeen.com/uploads/2018/06/morpheus-hotel-zha-architects-architecture-photo-ivan-dupont_dezeen_2364_sq_b.jpg'
              }
              title={'Architecture'}
              subtitle={'Modern | Classic | Historical'}
              pressed={this.state.architecture}
            />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            delayPressIn={5}
            delayPressOut={5}
            delayLongPress={5}
            onPress={() => {
              this.setState({ museums: checkCategory('4') })
            }}
          >
            <Interest_card
              image={
                'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F9%2F96%2FRijksmuseum_Amsterdam_ca_1895_rotated.jpg%2F1200px-Rijksmuseum_Amsterdam_ca_1895_rotated.jpg&f=1&nofb=1'
              }
              title={'Museums'}
              subtitle={'Science and Technology | History | Art'}
              pressed={this.state.museums}
            />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            delayPressIn={5}
            delayPressOut={5}
            delayLongPress={5}
            onPress={() => {
              this.setState({ amusementparks: checkCategory('5') })
            }}
          >
            <Interest_card
              image={
                'https://images1.persgroep.net/rcs/CYMrgquSDpMRtfw7TneHCCJdktg/diocontent/70656713/_fitwidth/763?appId=2dc96dd3f167e919913d808324cbfeb2&quality=0.8'
              }
              title={'Amusement parks'}
              subtitle={'Rollercoasters | History parks | Zoo'}
              pressed={this.state.amusementparks}
            />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            delayPressIn={5}
            delayPressOut={5}
            delayLongPress={5}
            onPress={() => {
              this.setState({ mills: checkCategory('6') })
            }}
          >
            <Interest_card
              image={
                'https://heavenly-holland.com/wp-content/uploads/2017/05/windmillHaarlem01.jpg'
              }
              title={'Mills'}
              subtitle={'Watermills | Windmills | Tide mills | Threadmills'}
              pressed={this.state.mills}
            />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            delayPressIn={5}
            delayPressOut={5}
            delayLongPress={5}
            onPress={() => {
              this.setState({ nightlife: checkCategory('7') })
            }}
          >
            <Interest_card
              image={
                'https://belgradeatnight.com/wp-content/uploads/2018/04/Belgrade-nightlife-tips-for-how-to-survive.jpg'
              }
              title={'Nightlife'}
              subtitle={'Clubs | Bars | Concerts'}
              pressed={this.state.nightlife}
            />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            delayPressIn={5}
            delayPressOut={5}
            delayLongPress={5}
            onPress={() => {
              this.setState({ placesofworship: checkCategory('8') })
            }}
          >
            <Interest_card
              image={
                'https://akosbalogh.com/wp-content/uploads/2015/01/church1.jpg'
              }
              title={'Places of Worship'}
              subtitle={'Churches | Synagogues | Mosques | Temples'}
              pressed={this.state.placesofworship}
            />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            delayPressIn={5}
            delayPressOut={5}
            delayLongPress={5}
            onPress={() => {
              this.setState({ food: checkCategory('9') })
            }}
          >
            <Interest_card
              image={
                'https://www.thespruceeats.com/thmb/zrP2Lzmpmor9rgYlkmJv7jZNqkY=/4494x2528/smart/filters:no_upscale()/quick-and-easy-creamy-coleslaw-3053933-hero-01-5c29166bc9e77c0001d08c7f.jpg'
              }
              title={'Food'}
              subtitle={'Restaurants | Bistros | Snackbars'}
              pressed={this.state.food}
            />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            delayPressIn={5}
            delayPressOut={5}
            delayLongPress={5}
            onPress={() => {
              this.setState({ castles: checkCategory('10') })
            }}
          >
            <Interest_card
              image={
                'https://d17sbgss5yk2qq.cloudfront.net/wp-content/uploads/sites/2/2019/08/meiland.jpg'
              }
              title={'Castles'}
              subtitle={'Rectangular keep | Shell keep | Concentric castles'}
              pressed={this.state.castles}
            />
          </TouchableWithoutFeedback>
        </ScrollView>
        <GoToButton />
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
