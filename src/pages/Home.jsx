import React from 'react'
import ExploreCategories from '../components/ExploreCategories'
import HeadingBar from '../components/HeadingBar'
import QuickNav from '../components/QuickNav'
import Random from '../components/Random'
import { Container, FlexBox, HeadingText } from '../Global'

const Home = () => {
  return (
    <Container>
      <FlexBox flex="0.5">
        <QuickNav />
      </FlexBox>
      <FlexBox flex="3">
        <HeadingBar />

        {/* Populars */}
        <br />
        <HeadingText style={{margin: "1rem"}} weight="300">POPULARS</HeadingText>
        <Random x="4"/>

        {window.screen.width > 395 && 
          (
            <>
              <ExploreCategories/>
            </>
          )
        }
        
        {/* Random */}
        <br />
        <HeadingText style={{margin: "1rem"}} weight="300">DISCOVER</HeadingText>
        <Random />

      </FlexBox>
    </Container>
  )
}

export default Home