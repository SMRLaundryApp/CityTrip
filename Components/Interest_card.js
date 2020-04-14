import React, { Component } from 'react'
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
    pressed: undefined,
    bg_color: '#888',
  }

  constructor(props) {
    super(props)
  }

  render() {

    if (this.props.pressed !== this.state.pressed) {
      this.setState({pressed: this.props.pressed})
      this.setState({bg_color: (this.props.pressed) ? '#19B092' : '#888' })
    }

    return (
      <Clear>
        <Container
          style={{
            borderBottomRightRadius: 14,
            backgroundColor: this.state.bg_color,
          }}
          width={cardWidth}
          height={cardHeight}
        >
          <Cover style={{ borderBottomLeftRadius: 14 }} width={imageWidth}>
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
