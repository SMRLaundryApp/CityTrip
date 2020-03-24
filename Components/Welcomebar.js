import React from 'react';
import styled from 'styled-components';

//Code used to determine the time of the day, for greetings in the morning/afternoon/evening
var today = new Date()
var curHr = today.getHours()

function getDayTime(){
	if (curHr < 12) {
		console.log('Good morning')
	} else if (curHr < 18) {
		console.log('Good afternoon')
	} else {
		console.log('Good evening')
	}
}

const Welcombar = props => (
	<Container>
		<Titlebar>
          <Avatar source={require('../assets/avatar.jpg')} />
          <Title>Welcome back,</Title>
          <Name>Coleslaw</Name>
        </Titlebar>
	</Container>
);

export default Welcombar;

const Container = styled.View`
`;

const Titlebar = styled.View`
	width: 100%;
	margin-top: 50px;
	padding-left: 80px;
	margin-bottom: 10px;
`;

const Avatar = styled.Image`
	width: 44px;
	height: 44px;
	background: black;
	border-radius: 22px;
	margin-left: 20px;
	position: absolute;
	top: 0;
	left: 0;
`;

const Title = styled.Text`
	font-size: 20px;
	font-weight: 500;
	color: #b8bece;
`;

const Name = styled.Text`
	font-size: 20px;
	color: #3c4560;
	font-weight: bold;
`;