import React, { useState } from 'react'
import styled from 'styled-components'
import { mobile, tablet } from '../responsive/media'

import bgVideo from '../assets/videos/background.mp4'
import { bg, primary, text } from '../Global'
import Login from '../components/Login'
import Register from '../components/Register'

// styles
const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  position: relative;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
`
const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
`
const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`
const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  
  background: rgb(0,0,0);
  background: linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(29,29,29,0.5772058823529411) 57%, rgba(0,0,0,0.1) 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
const HeadingText = styled.h1`
  font-size: ${props => props.size || "1.5rem"};
  color: ${props => props.color};
  text-transform: ${props => props.textTransform || "capitalize"};
`
const Paragraph = styled.p`
  font-size: ${props => props.size || "1rem"};
  color: ${props => props.color};
`
const ExtraDiv = styled.div`
  width: ${props => props.width};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1.5rem 0;
  opacity: ${props => props.opacity};

  ${mobile({
    width: "90%",
    textAlign: "center"
  })}
`
const Button = styled.button`
  padding: 0.75rem 1.5rem;
  position: relative;
  border-radius: 4px;
  background: ${primary};
  color: ${text};
  border: none;
  font-weight: 500;
  display: flex;
  margin: 1rem 0;
  align-items: center;
  justify-content: space-between;
` 
const FormWrapper = styled.div`
    width: 30vw;
    background-color: ${bg};
    height: 80vh;
    position: absolute;
    border-radius: 4px;
    left: 60vw;
    top: ${props => props.top};
    opacity: ${props => props.top === "10%" ? 1 : 0};
    transition: 0.5s ease-in-out;

    ${tablet({
      width: "90%",
      left: "5%",
    })}
`

const Start = () => {
    const [properties, setProperties] = useState({top: '100%', opacity: 1});
    const [login, setLogin] = useState(true);
    return (
      <Container>
          <Wrapper position="relative">
              <Video
                src={bgVideo}
                type="video/mp4"
                autoPlay
                loop
                muted
                controls={false}
              />   
              <Overlay>
                <ExtraDiv width="50%" opacity={properties.opacity}>
                  <HeadingText size="3rem" color="#EFEFEF" textTransform="uppercase">Vyakta</HeadingText>
                  <br />
                  <Paragraph color="#EFEFEF">
                    A community where you can express and explore hobbies and talents without any worries.
                    Share your hobbies and explore other's hobbies too.
                  </Paragraph>
            
                  <Button onClick={() => setProperties({top: "10%", opacity: 0})}>GET STARTED</Button>

                </ExtraDiv>

              </Overlay>   
          </Wrapper>
          
          <FormWrapper top={properties.top}>
              {login ? <Login event={() => setLogin(!login)}/> : <Register event={() => setLogin(!login)}/>}
          </FormWrapper>
      </Container>
  )
}

export default Start