import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Welcomebar from '../Components/Welcomebar';
import styled from 'styled-components';


export default function Camera({ }){

    return (
        <Container>
            <Welcomebar />
            <Message>Camera will be added later</Message>
        </Container>
    )
}


const Container = styled.View``;

const Message = styled.Text`
    padding: 100px;
    text-align: center;
`;