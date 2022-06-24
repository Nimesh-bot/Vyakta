import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import CategoryShow from '../components/CategoryShow'
import HeadingBar from '../components/HeadingBar'
import QuickNav from '../components/QuickNav'
import { Container, FlexBox, HeadingText } from '../Global'
import { mobile } from '../responsive/media'

const Wrapper = styled.div`
  width: ${props => props.width || "88%"};
  margin: ${props => props.margin}; 
  display: flex;
  flex-direction: ${props => props.flexDirection || "row"};
  justify-content: ${props => props.justify};
  align-items: center;
  gap: 0.75rem;

  ${mobile({
    width: "100%",
  })}
`
const Tab = styled.div`
  margin: 0 auto;
  width: 66%;

  ${mobile({
    width: "100%"
  })}
`

const category = [
  {
    id: 1,
    name: "Fan Art",
  },
  {
    id: 2,
    name: "Fan Edit",
  },
  {
    id: 3,
    name: "Cosplay",
  },

]

const Categories = ({ cat }) => {
  cat = useParams();
  let val = parseInt(cat.value);
  const [value, setValue] = useState(val);
  console.log(value)

  return (
    <Container>
      <FlexBox flex="0.5">
        <QuickNav />
      </FlexBox>
      <FlexBox flex="3">
        <HeadingBar />

        <Wrapper margin="5rem 0" justify="center" flexDirection="column">
          <Tab>
            <Wrapper width="100%" justify="space-between">
              {category.map((item, index) => (
                <HeadingText weight="500" size="1rem" key={index} onClick={()=>setValue(item.id)}>{item.name}</HeadingText>
              ))}
            </Wrapper>
          </Tab>
          <br />
          {
            value === 1 
            ? 
            <CategoryShow cat="Art" /> 
            : 
            value === 2 
            ? 
            <CategoryShow cat="Edit" /> 
            : 
            value === 3 
            ?
            <CategoryShow cat="Cosplay" />
            :
            null
          }
          
        </Wrapper>
      </FlexBox>
    </Container> 
  )
}

export default Categories