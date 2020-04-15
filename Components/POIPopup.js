import React, { Component } from 'react'
import styled from 'styled-components'
import { Linking, Dimensions, TouchableOpacity } from 'react-native'
import Axios from 'axios'

const axios = require('axios').default
axios.defaults.baseURL = 'https://citytrip.trifall.net/api'

const screenWidth = Dimensions.get('window').width

export default class POIPopup extends Component {
  state = {
    POIName: "",
    POICity: "",
    POIDescription: "",
    POIHyperlink: ""
  }

  render() {
    let info = undefined

    if (this.props.title !== "Add POI") {
      let visible = (this.props.hyperlink !== undefined) ? {position:'relative', opacity:1} : {position:'absolute', opacity:0};
      info = (
        <Clear>
          <Table>
            <ColumnOne>
              <ColumnText>{this.props.distance} km</ColumnText>
            </ColumnOne>
            <ColumnTwo>
              <ColumnText>{this.props.city}</ColumnText>
            </ColumnTwo>
          </Table>
          <Description>{this.props.description}</Description>
          <Clear style={{ visible }}>
            <Hyperlink onPress={() => Linking.openURL(this.props.hyperlink)}>
              Read more
            </Hyperlink>
          </Clear>
        </Clear>
      )
    }
    else {
      info = (
        <Clear style={{ marginTop: 5, marginBottom: 4 }}>
          <Table>
            <InputTitle style={{ marginTop: 5 }} >Location:</InputTitle>
            <InputTitle style={{ fontSize: 15, marginLeft: 9, marginTop: 8, marginBottom: 5 }}>Current location</InputTitle>
          </Table>
          <Table>
            <InputTitle>Name:</InputTitle>
            <Inputfield
              style={{ width: screenWidth - 165 }}
              placeholder={'Enter POI name'}
              value={this.state.POIName}
              onChangeText={(POIName) => this.setState({ POIName })}
            />
          </Table>
          <Table>
            <InputTitle>City:</InputTitle>
            <Inputfield
              style={{ width: screenWidth - 165 }}
              placeholder={'Enter POI city'}
              value={this.state.POICity}
              onChangeText={(POICity) => this.setState({ POICity })}
            />
          </Table>
          <Table>
            <InputTitle>Description:</InputTitle>
            <Inputfield
              style={{ width: screenWidth - 165 }}
              placeholder={'Enter POI description'}
              value={this.state.POIDescription}
              onChangeText={(POIDescription) => this.setState({ POIDescription })}
            />
          </Table>
          <Table>
            <InputTitle>Hyperlink:</InputTitle>
            <Inputfield
              style={{ width: screenWidth - 165 }}
              placeholder={'Enter hyperlink'}
              value={this.state.POIHyperlink}
              onChangeText={(POIHyperlink) => this.setState({ POIHyperlink })}
            />
          </Table>
          <Table>
            <InputTitle>Take picture:</InputTitle>
            <TouchableOpacity
              style={{ height: 30, width: screenWidth - 165, borderRadius: 2, backgroundColor: 'white', alignItems: 'center', marginLeft: 10 }}
            >
              <CameraButton source={{ uri: "https://image.freepik.com/free-icon/camera-symbol_318-1953.jpg" }} />
            </TouchableOpacity>
          </Table>
          <TouchableOpacity
            style={{ height: 30, borderRadius: 100, backgroundColor: '#19b092', alignSelf: 'center', padding: 5, paddingHorizontal: 20, margin: 10, marginLeft: 15  }}
            onPress={() => {
              if (this.state.POIName.length < 1 || this.state.POICity.length < 1 || this.state.POIDescription.length < 1) {
                alert("You forgot to fill in the POI name, city or description.")
              }
              else {
                Axios
                .post('/point_of_interests', { name: this.state.POIName, city: this.state.POICity, description: this.state.POIDescription, link: this.state.POIHyperlink })
                .then(response => {console.log(response.data)})
                .catch(error => {console.log(error)})
              }
            }}
          >
            <UploadButton>Upload POI</UploadButton>
          </TouchableOpacity>
        </Clear>
      )
    }
    return (
      <Clear>
        <Cover>
          <Image source={{ uri: this.props.image }} />
        </Cover>
        <Content>
          <Title>{this.props.title}</Title>
          {info}
        </Content>
      </Clear>
    )
  }
}

const Clear = styled.View``

const Cover = styled.View`
  margin-top: 5px;
  margin-horizontal: 5px;
`

const Image = styled.Image`
  width: 100%;
  height: 250px;
  border-radius: 14px;
`

const Content = styled.View``

const Title = styled.Text`
  color: white;
  font-size: 20px;
  text-align: center;
  font-weight: bold;
`

const Table = styled.View`
  flex-direction: row;
`

const ColumnOne = styled.View`
  align-items: center;
  width: 50%;
`

const ColumnTwo = styled.View`
  align-items: center;
  width: 50%;
`

const ColumnText = styled.Text`
  color: #b8b3c3;
  font-size: 15px;
  font-weight: 600;
  margin-top: 4px;
`

const Description = styled.Text`
  padding: 5px;
  padding-bottom: 0px;
  color: white;
  text-align: justify;
`

const Hyperlink = styled.Text`
  color: #19b092;
  margin-bottom: 5px;
  text-align: center;
  text-decoration: underline;
`

const InputTitle = styled.Text`
  align-self: auto;
  color: #fff;
  margin-left: 5px;
  font-size: 20px;
  font-weight: 400;
  width: 115px;
`

const Inputfield = styled.TextInput`
  background-color: white;
  padding: 5px
  margin-left: 10px;
  margin-bottom: 5px;
  margin-right: 10px;
  height: 30px;
  border-radius: 2px;
`
 const CameraButton = styled.Image`
  width: 30px;
  height: 30px;
  border-radius: 100px;
 `

 const UploadButton = styled.Text`
  font-size: 15px;
  color: white;
  text-align: center;
 `