import React, { Component } from 'react'
import { Text } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import styled from 'styled-components'
import { Dimensions } from 'react-native'

const screenWidth = Dimensions.get('window').width
const cardWidth = screenWidth - 20
const cardHeight = screenWidth / 4
const imageWidth = screenWidth / 3

export default class RouteCard extends Component {

  render() {
    let durationHours = Math.floor((this.props.duration / 5).toFixed(0) / 12);
    let durationMinutes = (this.props.duration / 5).toFixed(0) % 12 * 5;
    let duration = "";
    if (durationHours >= 1) {
      duration += durationHours.toString() + " hour";
      if (durationHours > 1) duration += "s";
      duration += " ";
    }
    if (durationMinutes > 0) duration += durationMinutes.toString() + " minutes";

    return (
      <Clear>
        <TouchableWithoutFeedback
          delayPressIn={5}
          delayPressOut={5}
          delayLongPress={5}
          onPress={() => console.log('roekoeroekoe')}
        >
          <Container width={cardWidth} height={cardHeight}>
            <Cover width={imageWidth}>
              <Image source={{ uri: this.props.image }} />
            </Cover>
            <Content left={imageWidth} height={cardHeight} width={cardWidth - imageWidth} >
              <Title>{this.props.title}</Title>
              <Info>{this.props.length} km  |  {duration}</Info>
            </Content>
          </Container>
        </TouchableWithoutFeedback>
      </Clear>
    )
  }
}

const Clear = styled.View``

const Container = styled.View`
  align-self: center;
  background: #888;
  border-radius: 14px;
  margin: 0%;
  margin-top: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3); /*This particular line doesn't seem to do anything in android OS*/
`

const Cover = styled.View`
  position: absolute;
  height: 100%;
  border-top-left-radius: 14px;
  border-bottom-left-radius: 14px;
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
