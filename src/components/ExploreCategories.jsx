import React from 'react'
import styled from 'styled-components'
import { tablet } from '../responsive/media'
import CategoryItem from './CategoryItem'

const Container = styled.div`
    width: 80%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 1rem 5rem 2rem 0;
    
    ${tablet({
        display: "none"
    })}
`

const categoriesData = [
    {
        id: 1,
        name: "Art",
        image: "https://i.pinimg.com/564x/6b/83/02/6b8302e5cecaf9f3d2677d74915708cd.jpg",
        description: "Explore the world of fan art, where artist represent the characters in their own way. Find the best fan art for your favorite characters, and create your own fan art too."
    },
    {
        id: 2,
        name: "Edit",
        image: "https://i.pinimg.com/564x/de/af/df/deafdfb54716e87bdf9a316c40e83fe1.jpg",
        description: "Explore the tweaks and turns of your favourite characters. See how editors change the way you view the art."
    },
    {
        id: 3,
        name: "Cosplay",
        image: "https://i.pinimg.com/736x/31/1b/86/311b86faa0ebcd2f13bf870511161aa7.jpg",
        description: "Explore the world of cosplay, where fans can create their own cosplay characters and share their creations with the world."
    }
]

const ExploreCategories = () => {
  return (
    <Container>
        {categoriesData.map((category, index) => (
            <CategoryItem item={category} key={index} />
        ))}
    </Container>
  )
}

export default ExploreCategories