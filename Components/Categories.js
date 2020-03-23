import React from 'react';
import styled from 'styled-components';
import { ScrollView } from 'react-native';

const Categories = props => <Name>{props.name}</Name>;

export default Categories;

const Container = styled.View``;

const Name = styled.Text`
	font-size: 20px;
	font-weight: 600;
	margin-left: 10px;
	margin-right: 15px;
	color: #bcbece;
`;