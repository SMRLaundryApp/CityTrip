import React, { Component } from 'react'
import styled from 'styled-components'
import { Linking } from 'react-native'

export default class POIPopup extends Component {
  render() {
    return (
      <Clear>
        <Cover>
          <Image source={{ uri: this.props.image }}/>
        </Cover>
        <Content>
          <Title>{this.props.title}</Title>
          <Table>
            <ColumnOne><ColumnText>{this.props.distance} km</ColumnText></ColumnOne>
            <ColumnTwo><ColumnText>{this.props.city}</ColumnText></ColumnTwo>
          </Table>
          <Description>{this.props.description}</Description>
          {/* <Hyperlink linkDefault={true} ><Text>{this.props.hyperlink}</Text></Hyperlink> */}
          <Hyperlink onPress={() => Linking.openURL(this.props.hyperlink)} >Read more</Hyperlink>
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

const Content = styled.View`

`

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
  color: blue;
  margin-bottom: 5px;
  text-align: center;
  text-decoration: underline;
`