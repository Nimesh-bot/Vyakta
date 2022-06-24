import React from 'react'
import { useParams } from 'react-router-dom'
import HeadingBar from '../components/HeadingBar'
import QuickNav from '../components/QuickNav'
import Random from '../components/Random'
import { Container, FlexBox, HeadingText } from '../Global'

const SearchResult = () => {
    const {search} = useParams();

    return (
        <Container>
            <FlexBox flex="0.5">
                <QuickNav />
            </FlexBox>
            <FlexBox flex="3">
                <HeadingBar />
                <br />
                <HeadingText weight="300">Search Result</HeadingText>
                <br />
                <Random search={search}/>
            </FlexBox>
        </Container>
  )
}

export default SearchResult