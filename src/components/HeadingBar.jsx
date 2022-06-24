import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { HiSearch } from 'react-icons/hi'
import axios from 'axios'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

import { HeadingText, text, InputField, Atag, Paragraph, primary } from '../Global'
import { mobile } from '../responsive/media'
import { useNavigate } from 'react-router-dom'

const Container = styled.div`
  width: 88%;
  display: flex;
  height: 5vh;
  justify-content: space-between;
  align-items: center;
  margin: 1rem 0;
  flex-wrap: wrap;

  ${mobile({
    flexDirection: "column",
    height: "auto",
    justifyContent: "start",
    alignItems: "center",
    margin: "5rem 0",
    width: "100%"
  })}
`
const SearchWrapper = styled.div`
  width: 10rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${mobile({
    width: "100%",
  })}
`
const Wrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: ${props => props.justify};
  align-items: center;
  margin-right: 5rem;

  ${mobile({
    width: `${props => props.mobileWidth}`,
    margin: "1rem 0 0 0",
  })}
`
const Avatar = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 4px;
  margin: 0 1rem;
`
const DropDown = styled.div`
  width: auto;
  position: absolute;
  top: 2.5rem;
  right: -1rem;
  background-color: #000;
  border-radius: 8px;
  visibility: hidden;
  padding: 1rem;
  display: flex;
  align-items: center;
`
const AvatarWrapper = styled.div`
  position: relative;

  &:hover ${DropDown} {
    visibility: visible;
  }
`

const HeadingBar = () => {
  const [profile, setProfile] = useState('');
  const [search, setSearch] = useState('');
  const user = localStorage.getItem('userId');

  useEffect(() => {
    axios.get(`https://admin-vyakta.onrender.com/api/users/${user}`)
      .then(res => {
        setProfile(res.data.profilePicture)
      })
      .catch(err => console.log(err))
  }, [user])

  let navigate = useNavigate();
  const handleProfile = () => {
    navigate(`/profile/${user}`)
  }

  const handleSearch = () => {
    navigate(`/search/${search}`)
  }

  const handleLogout = () => {
    localStorage.removeItem('userId');
    navigate('/')
    window.location.reload();
  }

  return (
    <Container>
      <Wrapper>
        <Atag href="/home">
          <HeadingText color={`${text}`} weight="500" font="Lobster Two" size="2rem">Vyakta</HeadingText>
        </Atag>
      </Wrapper>
      <Wrapper justify="end" mobileWidth="100%">
          <SearchWrapper>
              <InputField placeholder="Search" onChange={(e) => {setSearch(e.target.value)}}/>
              <HiSearch color='#fff' onClick={handleSearch}/>    
          </SearchWrapper>
          <AvatarWrapper>
            <Avatar
              src={profile}
              alt="profile"
              onClick={handleProfile}
            />
            <DropDown>
              <LogoutOutlinedIcon style={{color: `${primary}`}}/>
              <Paragraph color={`${primary}`} onClick={handleLogout}>Logout</Paragraph>
            </DropDown>
          </AvatarWrapper>
      </Wrapper>
    </Container>
  )
}

export default HeadingBar;