import React from 'react';
import Welcomebar from '../Components/Welcomebar';
import styled from 'styled-components';
import { ScrollView } from 'react-native';
import ItemsLayout from '../Components/ItemsLayout';

export default function POI_list({ city }){

    return (
        <Container>
            <Welcomebar />
            <Subtitle>{city}</Subtitle>
            <ScrollView>
              <ItemsLayout cityName={city} />
            </ScrollView>
        </Container>
    )
}

const Container = styled.View``

const Subtitle = styled.Text`
  font-size: 20px;
  color: #3c4560;
  font-weight: 500;
  margin-top: 10px;
  margin-left: 25px;
  margin-bottom: 10px;
  text-transform: uppercase;
`
