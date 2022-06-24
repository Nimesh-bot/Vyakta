import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { disabled, HeadingText, Paragraph, primary } from '../Global'
import { mobile } from '../responsive/media'

const Card = styled.div`
    width: 12rem;
    margin: 1rem;
    height: 20rem;
    display: flex;
    flex-direction: column;
    border-radius: 4px;

    ${mobile({
        width: "90%",
    })}
`
const ImageContainer = styled.div`
    width: 100%;
    min-height: 14rem;
    flex: 3;
    border-radius: 4px;
    overflow: hidden;
`
const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
    transition: all 0.3s ease-in-out;

    &:hover {
        transform: scale(1.1);
    }
`
const Details = styled.div`
    flex: 1;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: start;
`
const ExtraDiv = styled.div`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: flex;
    flex-direction: column;
    margin: 1rem 0;
`
const Span = styled.span`
    color: ${disabled};
    font-size: 0.75rem;
    text-transform: lowercase;
`

const Cards = ({ image, title, author, type, id }) => {
    let navigate = useNavigate();

    const handleClick = () => {
        navigate(`/view/${id}`)
    }
    return (
        <Card onClick={handleClick}>
            <ImageContainer>
                <Image src={image}/>
            </ImageContainer>
            <Details>
                <ExtraDiv>
                    <HeadingText size="1rem" weight="300">{title}</HeadingText>
                    <Paragraph size="0.75rem" color={`${primary}`}><Span>by </Span>{author}</Paragraph>
                </ExtraDiv>
                
                <ExtraDiv >
                    <HeadingText color={`${disabled}`} size="1rem" weight="300">{type}</HeadingText>
                </ExtraDiv>
            </Details>
        </Card>
    )
}

export default Cards