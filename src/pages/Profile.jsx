import React from 'react'
import HeadingBar from '../components/HeadingBar'
import QuickNav from '../components/QuickNav'
import User from '../components/User'
import { Container, FlexBox } from '../Global'

const Profile = () => {
  return (
    <Container>
      <FlexBox flex="0.5">
        <QuickNav />
      </FlexBox>
      <FlexBox flex="3">
        <HeadingBar />
        <User />
        
      </FlexBox>
    </Container>
  )
}

export default Profile