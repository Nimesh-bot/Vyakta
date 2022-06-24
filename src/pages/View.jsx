import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { FaAngleLeft } from 'react-icons/fa'
import { Container, FlexBox, Paragraph, primary, text } from '../Global'
import QuickNav from '../components/QuickNav'
import HeadingBar from '../components/HeadingBar'
import ImageView from '../components/ImageView'


const Wrapper = styled.div`
  margin: 5rem 0; 
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 1rem;
`
const SubWrapper = styled.div`
  display: flex;
`

const View = () => {
  let navigate = useNavigate();
  
  const handleBack = () => {
    navigate('/home')
  }

  return (
    <Container>
      <FlexBox flex="0.5">
        <QuickNav />
      </FlexBox>
      <FlexBox flex="3">
        <HeadingBar />

        <Wrapper>
          <SubWrapper onClick={handleBack}>
            <FaAngleLeft color={`${primary}`} fontSize='large' />
            <Paragraph color={`${text}`}>Back to discovering</Paragraph>
          </SubWrapper> 

          <br />

          <ImageView />
        </Wrapper>
      </FlexBox>
    </Container> 
  )
}

export default View