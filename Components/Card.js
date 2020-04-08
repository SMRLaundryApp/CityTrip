import React, { Component } from 'react'
import styled from 'styled-components'
import { TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import { Dimensions } from 'react-native'
import Modal from 'react-native-modal'
import POIPopup from './POIPopup'

const axios = require('axios').default
const baseURL = 'https://citytrip.trifall.net'

const screenWidth = Dimensions.get('window').width
const cardWidth = screenWidth / 2 - 20
const cardHeight = screenWidth / 3 + 78

export default class Card extends Component {
  state = {
    isModalVisible: false,
    api: undefined,
    imageHeight: screenWidth / 3,
    distanceToUser: undefined,
    title: undefined,
    distance: undefined,
    image: undefined,
    city: undefined,
    description: undefined,
    link: undefined,
    distance: undefined
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

  onLayout = (event) => {
    this.setState({
      imageHeight:
        screenWidth / 3 + 24 - Math.round(event.nativeEvent.layout.height),
    })
  }

  componentDidMount() {
    // console.log('test')
    // console.log(this.props.api)
    // if (this.state.api !== this.state.oldApi) {
    //   this.setState({oldApi: this.state.api})
    //   axios
    //     .get(baseURL + this.state.api)
    //     .then(response => {
    //       console.log(response.data.id)
    //     })
    //     .catch(error => console.log("Card api error:", error))
    // }
  }

  render() {
    let card = undefined
    let titleSize = undefined
    let popup = undefined
    // console.log('card', this.props.api)

    if (this.state.api !== this.state.oldApi) {
      this.setState({oldApi: this.state.api})
      axios
        .get(baseURL + this.state.api)
        .then(response => {
          this.setState({
            title: response.data.name,
            image: response.data.image,
            distance: response.data.id,
            city: response.data.city,
            description: response.data.description,
            link: response.data.link
          })
          // console.log(response.data.name)
        })
        .catch(error => console.log("Card api error:", error))
    }

    if (this.props.title !== "Add POI") {
      // console.log('card', this.props.api)
      // if (this.props.api === undefined) {
      //   card = (
      //     <TouchableWithoutFeedback
      //       delayPressIn={5}
      //       delayPressOut={5}
      //       delayLongPress={5}
      //       onPress={() => {
      //         this.openModal()
      //       }}
      //     >
      //       <Container width={cardWidth} height={cardHeight}>
      //         <Cover height={this.state.imageHeight}>
      //           <Image source={{ uri: this.props.image }} />
      //         </Cover>
      //         <Content>
      //           <Title>{this.props.title}</Title>
      //           <Distance>{this.props.distance} km</Distance>
      //         </Content>
      //       </Container>
      //     </TouchableWithoutFeedback>
      //   )
      //   titleSize = (
      //     <Title onLayout={this.onLayout} style={{ opacity: 0 }}>
      //       {this.props.title}
      //     </Title>
      //   )
      //   popup = (
      //     <POIPopup
      //       image={this.props.image}
      //       title={this.props.title}
      //       distance={this.props.distance}
      //       city={this.props.city}
      //       description={this.props.description}
      //       hyperlink={this.props.hyperlink}
      //     />
      //   )
      // }
      // else {
        if (this.state.api === undefined) {
          this.setState({api: this.props.api})
        }
        card = (
          <TouchableWithoutFeedback
            delayPressIn={5}
            delayPressOut={5}
            delayLongPress={5}
            onPress={() => {
              this.openModal()
            }}
          >
            <Container width={cardWidth} height={cardHeight}>
              <Cover height={this.state.imageHeight}>
                <Image source={{ uri: this.state.image }} />
              </Cover>
              <Content>
                <Title>{this.state.title}</Title>
                <Distance>{this.state.distance} km</Distance>
              </Content>
            </Container>
          </TouchableWithoutFeedback>
        )
        titleSize = (
          <Title onLayout={this.onLayout} style={{ opacity: 0 }}>
            {this.state.title}
          </Title>
        )
        popup = (
          <POIPopup
            image={this.state.image}
            title={this.state.title}
            distance={this.state.distance}
            city={this.state.city}
            description={this.state.description}
            hyperlink={this.state.link}
          />
        )
      }
    // }
    else {
      card = (
        <TouchableWithoutFeedback
          delayPressIn={5}
          delayPressOut={5}
          delayLongPress={5}
          onPress={() => {
            this.openModal()
          }}
        >
          <Container width={cardWidth} height={cardHeight}>
            <Cover height={this.state.imageHeight}>
              <Image source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSOMvWBpRMftyw9jBpY5UF4itFNueeEk3osqfYLye028OLQuRGL&usqp=CAU" }} />
            </Cover>
            <Content>
              <Title>{this.props.title}</Title>
              <Distance>Current location</Distance>
            </Content>
          </Container>
        </TouchableWithoutFeedback>
      )
      titleSize = (
        <Title onLayout={this.onLayout} style={{ opacity: 0 }}>
          {this.props.title}
        </Title>
      )
      popup = (
        <POIPopup
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSOMvWBpRMftyw9jBpY5UF4itFNueeEk3osqfYLye028OLQuRGL&usqp=CAU"
          title={this.props.title}
        />
      )
    }

    return (
      <Clear>
        <Invisible width={cardWidth}>{titleSize}</Invisible>
        <Clear>{card}</Clear>
        <Modal
          animationIn="slideInRight"
          animationOut="slideOutRight"
          isVisible={this.state.isModalVisible}
          style={{
            backgroudColor: '#888',
          }}
        >
          <Container
            style={{
              padding: 4,
              margin: 0,
              marginTop: 0,
              width: screenWidth - 20,
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: '#19B092',
                alignSelf: 'flex-end',
                height: 20,
                width: 20,
                borderRadius: 10,
              }}
              onPress={() => {
                this.closeModal()
              }}
            >
              <CloseButton>×</CloseButton>
            </TouchableOpacity>
            {popup}
          </Container>
        </Modal>
      </Clear>
    )
  }
}

const Invisible = styled.View`
  align-self: center;
  position: absolute;
`

const Clear = styled.View``

const Container = styled.View`
  align-self: center;
  background: #888;
  border-radius: 14px;
  margin: 5%;
  margin-top: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3); /*This particular line doesn't seem to do anything in android OS*/
`

const Cover = styled.View`
  width: 100%;
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
  overflow: hidden;
`

const Image = styled.Image`
  width: 100%;
  height: 100%;
`

const Content = styled.View`
  padding-top: 10px;
  flex-direction: column;
  align-items: center;
  height: 60px;
`

const Title = styled.Text`
  padding-left: 5px;
  padding-right: 5px;
  margin-top: 4px;
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
`

const Distance = styled.Text`
  color: #b8b3c3;
  font-size: 15px;
  font-weight: 600;
  margin-top: 4px;
`

const CloseButton = styled.Text`
  text-align: center;
  color: white;
  font-weight: bold;
`
