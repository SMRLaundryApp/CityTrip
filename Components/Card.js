import React, { Component } from 'react';
import styled from 'styled-components';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Dimensions } from 'react-native';

// TODO: Change <Title /> to the location as the crow flies

const screenWidth = Dimensions.get('window').width;
const cardWidth = screenWidth / 2 - 20;
const cardHeight = screenWidth * 0.55;


export default class Card extends Component {

  constructor(props) {
    super(props);
    this.state = {
      imageHeight: screenWidth / 3 + 24
    }
  }

  onLayout = event => {
    this.setState({imageHeight: screenWidth / 3 + 24 - Math.round(event.nativeEvent.layout.height)});
  }
	
	render() {

    let card = [];
    card.push(
			<TouchableWithoutFeedback delayPressIn={5} delayPressOut={5} delayLongPress={5} onPress={() => console.log('roekoeroekoe')}>
				<Container width={cardWidth} height={cardHeight}>
					<Cover height={this.state.imageHeight}>
						<Image source={{uri:this.props.image}} />
					</Cover>
					<Content>
						<Title >{this.props.title}</Title>
						{/* <CityName>{this.props.cityName}</CityName> */}
						<CityName>{cardHeight - this.state.imageHeight}</CityName>
					</Content>
				</Container>
			</TouchableWithoutFeedback>
    );
    let titleSize = [];
    titleSize.push(
      <Title onLayout={this.onLayout} style={{opacity:0}} >{this.props.title}</Title>
    )
    
    

		return (
      <Clear>
        <Invisible width={cardWidth} >
          {titleSize}
        </Invisible>
        <Clear>
          {card}
        </Clear>
      </Clear>
    )
  }
}

const Invisible = styled.View`
  align-self: center;
  position: absolute;
`;

const Clear = styled.View``;

const Container = styled.View`
	align-self: center;
	background: #888;
	border-radius: 14px;
	margin: 5%;
	margin-top: 10px;
	box-shadow: 0 5px 15px rgba(0, 0, 0, 0.30); /*This particular line doesn't seem to do anything in android OS*/
`;

const Cover = styled.View`
  width: 100%;
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
  overflow: hidden;
`;

const Image = styled.Image`
  width: 100%;
  height: 100%;
`;

const Content = styled.View`
  padding-top: 10px;
  flex-direction: column;
  align-items: center;
  height: 60px;
`;

const Title = styled.Text`
  padding-left: 5px;
  padding-right: 5px;
  margin-top: 4px;
  color: #FFF;
  font-size: 18px;
	font-weight: 600;
	text-align: center;
`;

const CityName = styled.Text`
	color: #b8b3c3;
	font-size: 15px;
	font-weight: 600;
	margin-top: 4px;
`;
