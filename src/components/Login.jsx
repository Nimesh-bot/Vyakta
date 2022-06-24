import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Snackbar from '../assets/Snackbar'
import { Button, HeadingText, InputField, Label, Paragraph, primary, Span, text } from '../Global'
import { mobile } from '../responsive/media'

import showPwd from '../assets/icons/visibility-on.svg'
import hidePwd from '../assets/icons/visibility-off.svg'

const Container = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url("https://wallpapercave.com/wp/wp6442276.jpg");
    background-size: cover;
    background-blend-mode: darken;
    flex-direction: column;
`
const Wrapper = styled.div`
    width: 100%;
    margin: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const InputContainer = styled.div`
    width: 100%;
`
const Form = styled.form`
    width: 60%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 1rem;

    ${mobile({
        width: "90%"
    })}
`
const Icon = styled.img`
    width: 1.5rem;
    height: 1.5rem;
    position: absolute;
    right: 0.75rem;
    top: 0.25rem;
    margin: 0.25rem;
    color: #fff;
`

const Login = ({ event }) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('#00C897');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isRevealed, setIsRevealed] = useState(false);

    let navigate = useNavigate();

    const saveToken = (title, data) => {
        localStorage.setItem(title, data);
    }

    const handleLogin = async(e) => {
        e.preventDefault();

        const data = {
            email: email,
            password: password
        }

        if(email === '' && password === '') {
            setOpen(true);
            setMessage('Please enter your email and password');
            setSeverity('#FF5252');
        }
        
        await axios.post('https://admin-vyakta.onrender.com/api/auth/login', data, {
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            },
        }).then(res => {
            saveToken('userId', res.data._id);
            setOpen(true);
            setSeverity('#00C897');
            setMessage('Login Successful. We are redirecting you to home');
            navigate('/home');
            window.location.reload(true);
        }).catch(err => {
            setMessage(err.response.data);
            setOpen(true);
            setSeverity('#FF5252');
        })
    }

  return (
    <Container>
        <Wrapper>
            <HeadingText margin="2rem 0">Vyakta</HeadingText>
            <Form>
                <InputContainer>
                    <Label width="100%">Email</Label>
                    <InputField bg="#000" type="email" onChange={(e) => setEmail(e.target.value)}/>
                </InputContainer>

                <InputContainer>
                    <Label width="100%">Password</Label>
                    <div style={{position: "relative"}}>
                        <InputField bg="#000" onChange={(e) => setPassword(e.target.value)} type={isRevealed ? "text" : "password"} />
                        <Icon 
                            title={isRevealed ? 'Hide Password' : 'Show Password'}
                            src={isRevealed ? showPwd : hidePwd}
                            alt='Visibility Icon'
                            onClick={() => setIsRevealed(!isRevealed)}
                        />
                    </div>
                </InputContainer>

                <Button bg={`${primary}`} color={`${text}`} onClick={handleLogin}>Login</Button>
                <Paragraph color={`${text}`} size="0.75rem">
                    Don't have an account? &nbsp;
                    <Span color={`${primary}`} onClick={event}>
                        Register
                    </Span>
                </Paragraph>
            </Form>
        </Wrapper>

        {
            open &&
            <Snackbar 
                handleOpen={() => setOpen(!open)}
                message={message}
                severity={severity}
            />
        }
    </Container>
  )
}

export default Login