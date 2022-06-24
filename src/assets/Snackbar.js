import React from 'react'
import styled from 'styled-components'
import { RiCloseFill } from 'react-icons/ri'
import { tablet } from '../responsive/media'

const Container = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 30vw;
    padding: 1rem;
    background-color: ${props => props.bg};
    border-radius: 4px;
    box-shadow: 0px 0px 10px rgba(0,0,0,0.5);
    display: flex;
    justify-content: space-between;
    align-items: center;

    ${tablet({
        width: '100%', 
    })}
`
const Text = styled.p`
    font-size: 0.75rem;
    color: white;
    font-weight: 500;
`

const Snackbar = ({message, severity, handleOpen}) => {
  return (
    <Container bg={severity}>
        <Text>{message}</Text>
        <RiCloseFill onClick={handleOpen} color="white"/>
    </Container>
  )
}

export default Snackbar