import React, { Component } from 'react'
import { TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import styled from 'styled-components'
import { Dimensions } from 'react-native'

const screenWidth = Dimensions.get('window').width
const cardWidth = screenWidth - 20
const cardHeight = screenWidth / 4
const imageWidth = screenWidth / 3


export default class Interest_card extends Component {
  state = {
    image: this.props.image,
    title: this.props.title,
    subtitle: this.props.subtitle,
    pressed: this.props.pressed,
    bg_color: '#888'
  }

  constructor(props) {
    super(props);
  }

  render(){
    return (
      <Clear>
        <TouchableWithoutFeedback
          delayPressIn={5}
          delayPressOut={5}
          delayLongPress={5}
          onPress={() => {
            (this.setState({bg_color: (this.state.bg_color === '#888') ? '#19B092' : '#888'}), this.setState({pressed: (this.state.pressed === false) ? true : false}))
          }}
        >
          <Container
            style={{ borderBottomRightRadius: 14, backgroundColor: this.state.bg_color }}
            width={cardWidth}
            height={cardHeight}
          >
            <Cover
              style={{ borderBottomLeftRadius: 14 }}
              width={imageWidth}
            >
              <Image source={{ uri: this.state.image }} />
            </Cover>
            <Content
              left={imageWidth}
              height={cardHeight}
              width={cardWidth - imageWidth}
            >
              <Title>{this.state.title}</Title>
              <Info>{this.state.subtitle}</Info>
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
  color: #ddd;
  font-size: 15px;
  font-weight: 600;
  margin-top: 0px;
  padding-left: 10px;
  padding-right: 10px;
  text-align: center;
`

const RouteContainer = styled.View`
  padding: 10px;
  padding-bottom: 0px;
  background-color: #aaa;
  border-bottom-left-radius: 14px;
  border-bottom-right-radius: 14px;
`
