import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
// import {TiCamera} from 'react-icons/ti'

import HeadingBar from '../components/HeadingBar'
import QuickNav from '../components/QuickNav'
import { StateContext } from '../context/StateContext'
import { Container, Button, FlexBox, HeadingText, InputField, primary, text, Paragraph, disabled } from '../Global'
import { mobile } from '../responsive/media'

const Form = styled.form`
  width: 60%;
  display: flex;
  flex-direction: column;

  ${mobile({
    width: "98%"
  })}
`
const Label = styled.label`
  font-size: 0.75rem;
  color: ${disabled};
  margin-bottom: 0.5rem;
`
const TextArea = styled.textarea`
  max-width: 100%;
  min-width: 100%;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  border: none;
  background-color: #000;
  color: ${text};
  min-height: 6rem;
`
const Select = styled.select`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  background-color: #000;
  color: ${text};
  border: none; 
`
// const ImageContainer = styled.div`
//   border-radius: 4px;
//   padding: 0 1rem;
//   display: flex;
//   justify-content: start;
//   align-items: center;
//   height: 30vh;
//   background-color: #000;

// `
// const Wrapper = styled.div`
//   width: 100%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   gap: 1rem;
// `
// const Image = styled.img`
//   width: 10rem;
//   height: 10rem;
//   border-radius: 4px;
//   object-fit: cover;
// `
// const ImageWrapper = styled.div`
//   display: flex;
//   justify-content: start;
//   align-items: end;
//   gap: 1rem;
// `

const Add = () => {
  // const [image, setImage] = useState(null);
  const { open, setOpen, message, setMessage, severity, setSeverity, userId } = useContext(StateContext)

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  
  let navigate = useNavigate();
  
  const handleSubmit = async(e) => {
    e.preventDefault();


    const postData = {
      userId: userId,
      title: title,
      desc: description,
      category: category,
      img: image,
    }

    try{
      if(title === '' || description === '' || category === '' || category === 'Select One' || image === '') {
        setMessage('Please fill out all fields')
        setSeverity('#f44336')
        setOpen(true)
      }
      else if(title.length > 50) {
        setMessage('Title must be less than 50 characters')
        setSeverity('#f44336')
        setOpen(true)
      }
      else {
        await axios.post('https://admin-vyakta.onrender.com/api/posts/', postData, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
          }
        }).then(res => {
          setTitle('');
          setDescription('');
          setCategory('');
          setImage('');
          navigate('/home');
        }).catch(err => {
          setOpen(true);
          setMessage('Error adding post');
          setSeverity('#f44336')
        })
      }
    }
    catch(err) {
      setMessage(err.message)
      setSeverity('#f44336')
      setOpen(true)
    }
  }

  return (
    <Container>
      <FlexBox flex="0.5">
        <QuickNav />
      </FlexBox>
      <FlexBox flex="3">
        <HeadingBar />

        <HeadingText margin="5rem 0 2rem 0" weight="500" size="1rem">EXPRESS YOURSELF</HeadingText>
        <Form>
          <Label>Title</Label>
          <InputField bg="#000" name='Title' onChange={(e) => setTitle(e.target.value)}/>
          
          <Label>Description</Label>
          <TextArea name='Description' rows='4' onChange={(e) => setDescription(e.target.value)}/>
          
          <Label>Category</Label>
          <Select onChange={(e) => setCategory(e.target.value)}>
            <option selected disabled>Select One</option>
            <option value="Art">Art</option>
            <option value="Edit">Edit</option>
            <option value="Cosplay">Cosplay</option>
          </Select>

          <Label>Image Url</Label>
          <InputField bg="#000" name='Image' onChange={(e) => setImage(e.target.value)}/>

          {/* <Label>Image</Label> */}
          {/* <ImageContainer>
            {image ?
              <ImageWrapper>
                <Image src = {URL.createObjectURL(image)} />
                <Paragraph color={`${primary}`} size="0.75rem" onClick={() => setImage(null)}>Remove</Paragraph>
              </ImageWrapper>
              :
              <Wrapper>
                <label htmlFor='file'>
                  <TiCamera color={`${primary}`} size="2rem" />
                </label>
                <Paragraph size="0.75rem" color="#fff">Upload an Image</Paragraph>
                <InputField type="file" id="file" accept=".png, .jpeg, .jpg" onChange={(e) => setImage(e.target.files[0])} hidden/>
              </Wrapper>
            }
          </ImageContainer> */}

          <Button bg={`${primary}`} color={`${text}`} onClick={handleSubmit}>SUBMIT</Button>
          {
            open &&
            <Paragraph color={severity}>{message}</Paragraph>
          }
        </Form>
      </FlexBox>
    </Container>
  )
}

export default Add