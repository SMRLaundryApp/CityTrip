import React, { Component } from 'react'
import styled from 'styled-components'
import { Linking, Dimensions, Text, TouchableOpacity } from 'react-native'

const screenWidth = Dimensions.get('window').width

export default class POIPopup extends Component {
  state = {
    POIName: undefined,
    POICity: undefined,
    POIDescription: undefined,
    POIHyperlink: undefined
  }

  render() {
    let info = undefined

    if (this.props.title !== "Add POI") {
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
          <Hyperlink onPress={() => Linking.openURL(this.props.hyperlink)}>
            Read more
          </Hyperlink>
        </Clear>
      )
    }
    else {
      info = (
        <Clear style={{ marginTop: 5, marginBottom: 4 }}>
          <Table>
            <InputTitle style={{ marginTop: 5 }}>Location:</InputTitle>
            <TouchableOpacity style={{ height: 30, width: screenWidth - 165, borderRadius: 100, backgroundColor:'#19b092', alignItems:'center', margin: 5, padding: 3, marginLeft: 10 }}>
              <Text style={{ color:'white', textAlign:'center', fontSize: 18 }}>Get current location</Text>
            </TouchableOpacity>
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
            <InputTitle style={{ marginTop: 10 }}>Take picture</InputTitle>
            <TouchableOpacity
              style={{ height: 50, width: 50, borderRadius: 100, backgroundColor:'white', alignItems:'center', marginLeft: 10 }}
            >
              <CameraButton source={{ uri: "https://image.freepik.com/free-icon/camera-symbol_318-1953.jpg" }} />
            </TouchableOpacity>
          </Table>
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
  margin-left: 10px;
  font-size: 20px;
  font-weight: 400;
  width: 110px;
  /*text-shadow: 1px 1px 2px #4d4d4d;*/
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
  width: 50px;
  height: 50px;
  border-radius: 100px;
 `