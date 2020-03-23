import React from 'react';
import styled from 'styled-components';

const Card = props => (
	<Container>
		<Cover>
			<Image source={require('../assets/spinozahuis.jpg')} />
		</Cover>
		<Content>
			<Title>Spinozahuis</Title>
			<Streetname>Rijnsburg</Streetname>
		</Content>
	</Container>
);

export default Card;

const Container = styled.View`
	background: #888;
	height: 200px;
	width: 150px;
	border-radius: 14px;
	margin: 20px;
	margin-top: 20px;
	box-shadow: 0 5px 15px rgba(0, 0, 0, 0.30);
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
	font-size: 20px;
	font-weight: 600;
`;

const Streetname = styled.Text`
	color: #b8b3c3;
	font-size: 15px;
	font-weight: 600;
	margin-top: 4px;
`;