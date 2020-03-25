import React, { Component } from 'react';
import styled from 'styled-components';
import { TouchableOpacity } from 'react-native-gesture-handler';
 


export default class Card extends Component {
	
	render() {

		let card = [];
		card.push(
			<TouchableOpacity  onLongPress={() => console.log('roekoeroekoe')}>
				<Container>
					<Cover>
						<Image source={{uri:this.props.image}} />
					</Cover>
					<Content>
						<Title>{this.props.title}</Title>
						<CityName>{this.props.cityName}</CityName>
					</Content>
				</Container>
			</TouchableOpacity>
		)

		return (
			<Clear>
				{card}
			</Clear>
		)
	}
}

const Clear = styled.View``;

const Container = styled.View`
	align-self: center;
	background: #888;
	height: 200px;
	width: 100%;
	border-radius: 14px;
	margin: 5%;
	margin-top: 20px;
	box-shadow: 0 5px 15px rgba(0, 0, 0, 0.30); /*This particular line doesn't seem to do anything in android OS*/

`;

const Cover = styled.View`
	width: 100%;
	height: 120px;
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
	color: #FFF;
	font-size: 16px;
	font-weight: 600;
	align-items: center;
`;

const CityName = styled.Text`
	color: #b8b3c3;
	font-size: 15px;
	font-weight: 600;
	margin-top: 4px;
`;