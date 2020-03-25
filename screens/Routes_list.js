import React from 'react'
import Card from '../Components/Card'
import Welcomebar from '../Components/Welcomebar'
import styled from 'styled-components'

export default function Routes_list({}) {
  return (
    <Container>
      <Welcomebar />
      <Subtitle>Rijnsburg</Subtitle>
      <ItemsLayout>
        <ColumnOne>
          <Card />
        </ColumnOne>
        <ColumnTwo>
          <Card />
        </ColumnTwo>
      </ItemsLayout>
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
  text-transform: uppercase;
`

const ItemsLayout = styled.View`
  flex-direction: row;
  flex: 50;
`

const ColumnOne = styled.View`
  margin-left: 3%;
`

const ColumnTwo = styled.View`
  margin-right: 3%;
`
