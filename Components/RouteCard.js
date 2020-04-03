import React, { Component } from 'react'
import { TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import styled from 'styled-components'
import { Dimensions } from 'react-native'
import RouteExtension from './RouteExtension'

const screenWidth = Dimensions.get('window').width
const cardWidth = screenWidth - 20
const cardHeight = screenWidth / 4
const imageWidth = screenWidth / 3

export default class RouteCard extends Component {
  state = {
    isModalVisible: false,
    isRouteVisible: false,
    id: this.props.id,
  }

  constructor(props) {
    super(props)
  }

  openModal = () => {
    this.setState({ isModalVisible: true })
  }

  closeModal = () => {
    this.setState({ isModalVisible: false })
  }

  toggleRoute = () => {
    this.setState({ isRouteVisible: !this.state.isRouteVisible })
  }

  render() {
    let durationHours = Math.floor((this.props.duration / 5).toFixed(0) / 12)
    let durationMinutes = ((this.props.duration / 5).toFixed(0) % 12) * 5
    let duration = ''
    if (durationHours >= 1) {
      duration += durationHours.toString() + ' hour'
      if (durationHours > 1) duration += 's'
      duration += ' '
    }
    if (durationMinutes > 0) duration += durationMinutes.toString() + ' minutes'

    let routeExtension = undefined;
    let radius = 14;

    if (this.state.isRouteVisible) {
      routeExtension = (
        <RouteContainer width={cardWidth} >
          <RouteExtension id={this.props.id} />
        </RouteContainer>
      )
      radius = 0;
    }
    else {
      radius = 14;
    }

    return (
      <Clear>
        <TouchableWithoutFeedback
          delayPressIn={5}
          delayPressOut={5}
          delayLongPress={5}
          onPress={() => {
            this.toggleRoute()
          }}
        >
          <Container style={{ borderBottomRightRadius: radius }} width={cardWidth} height={cardHeight}>
            <Cover style={{ borderBottomLeftRadius: radius }} width={imageWidth}>
              <Image source={{ uri: this.props.image }} />
            </Cover>
            <Content left={imageWidth} height={cardHeight} width={cardWidth - imageWidth} >
              <Title>{this.props.title}</Title>
              <Info>{this.props.length} km | {duration}</Info>
            </Content>
          </Container>
        </TouchableWithoutFeedback>
        {routeExtension}
      </Clear>
    )
  }
}

const Clear = styled.View``

const Container = styled.View`
  align-self: center;
  background: #888;
  border-radius: 14px;
  margin-top: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3); /*This particular line doesn't seem to do anything in android OS*/
`

const Cover = styled.View`
  position: absolute;
  height: 100%;
  border-top-left-radius: 14px;
  overflow: hidden;
`

const Image = styled.Image`
  width: 100%;
  height: 100%;
`

const Content = styled.View`
  justify-content: center;
  position: absolute;
  flex-direction: column;
  align-items: center;
`

const Title = styled.Text`
  padding-bottom: 5px;
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
`

const Info = styled.Text`
  color: #b8b3c3;
  font-size: 15px;
  font-weight: 600;
  margin-top: 4px;
`

const RouteContainer = styled.View`
  padding: 10px;
  padding-bottom: 0px;
  background-color: #aaa;
  border-bottom-left-radius: 14px;
  border-bottom-right-radius: 14px;
`