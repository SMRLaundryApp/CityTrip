import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Card from '../Components/Card';
import Welcomebar from '../Components/Welcomebar';
import styled from 'styled-components';
import { ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function POI_list({ }){

    return (
        <Container>
            <Welcomebar />
            <Subtitle>Rijnsburg</Subtitle>
            <ScrollView>
            <ItemsLayout>
                <ColumnOne>
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                </ColumnOne>
                <ColumnTwo>
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                </ColumnTwo>
            </ItemsLayout>
            </ScrollView>
        </Container>
    )
}


const Container = styled.View``;

const Subtitle = styled.Text`
	font-size: 20px;
	color: #3c4560;
	font-weight: 500;
	margin-top: 10px;
	margin-left: 25px;
    margin-bottom: 10px;
	text-transform: uppercase;
`;

const ItemsLayout = styled.View`
	flex-direction: row;
    flex: 50;
    margin-bottom: 170px;
`;

const ColumnOne = styled.View`
    /* margin-left: 3%; */
    align-items: center;
    width: 50%;
`;

const ColumnTwo = styled.View`
    /* margin-right: 3%; */
    align-items: center;
    width: 50%;
`;

