import React from 'react'
import { Link, useLocation } from "react-router-dom";

import { bg, primary, secondary } from '../Global'
import { HiHome, HiViewGrid } from "react-icons/hi";
import { IoIosAddCircle } from "react-icons/io";
import styled from 'styled-components';
import { mobile, tablet } from '../responsive/media';

const Container = styled.div`
    display: flex;
    width: 4vw;
    height: 100vh;
    flex-direction: column;
    justify-content: center;
    background-color: ${bg};
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9;

    ${tablet({
        width: "8vw",
    })}

    ${mobile({
        width: "100vw",
        top: "initial",
        left: "initial",
        flexDirection: "row",
        height: "6vh"
    })}
`
const IconWrapper = styled.div`
  padding: 1.5rem 0;
  background-color: ${props => props.bg};
  display: flex;
  align-items: center;
  justify-content: center;

  ${mobile({
    padding: "0.5rem",
    flex: 1
  })}
` 

const QuickNav = () => {
    let location = useLocation();
    let currentLocation = location.pathname;
    
    const getActive = (curr) => {
        if(currentLocation ===  curr) {
            return `${primary}`;
        }
        else{
            return `${secondary}`;
        }
    }

    return (
        <Container>
            <IconWrapper bg={getActive('/home')}>
                <Link to="/home">       
                    <HiHome color='#efefef' fontSize={18}/>
                </Link>
            </IconWrapper>

            <IconWrapper bg={getActive('/add')}>
                <Link to="/add">
                    <IoIosAddCircle color='#efefef' fontSize={18}/>
                </Link>
            </IconWrapper>

            <IconWrapper bg={getActive(`/category/1` || `/category/2` || `/category/3`)}>
                <Link to="/category/1">
                    <HiViewGrid color='#efefef' fontSize={18}/>
                </Link>
            </IconWrapper>
        </Container>
    )
}

export default QuickNav