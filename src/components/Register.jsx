import axios from 'axios'
import React, { useState } from 'react'
import styled from 'styled-components'
import Snackbar from '../assets/Snackbar'
import { Atag, Button, HeadingText, InputField, Label, Paragraph, primary, Span, text } from '../Global'
import { mobile } from '../responsive/media'
import { isEmail } from "validator";


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
const Form = styled.form`
    width: 60%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

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

const Register = ({ event }) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('#00C897');

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [isRevealed, setIsRevealed] = useState(false);
    const [isRevealedConfirm, setIsRevealedConfirm] = useState(false);

    const handleSubmit = async(e) => {
        e.preventDefault();

        const userData = {
            username: username,
            email: email,
            password: password,
        }
        if(username === '' && email === '' && password === '' && confirmPassword === '') {
            setOpen(true);
            setMessage('Please enter all the fields');
            setSeverity('#FF5252');
        }
        else if(!isEmail(email)) {
            setOpen(true);
            setMessage('Please enter a valid email');
            setSeverity('#FF5252');
        }
        else if(password.length < 8) {
            setOpen(true);
            setMessage('Password must be at least 8 characters');
            setSeverity('#FF5252');
        }
        else if(password !== confirmPassword) {
            setOpen(true);
            setMessage('Password does not match');
            setSeverity('#FF5252');
        }
        else {
            await axios.post('https://admin-vyakta.onrender.com/api/auth/register', userData, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            }).then(res => {
                setOpen(true);
                setMessage('Registration Successful');
            }).catch( err => {
                setMessage(err.response.data);
                setOpen(true);
                setSeverity('#FF5252');
            })
        }
    }

    return (
        <Container>
            <Wrapper>
                <HeadingText margin="2rem 0">Vyakta</HeadingText>
                <Form>

                    <Label width="100%">Username</Label>
                    <InputField bg="#000" onChange={(e) => setUsername(e.target.value)}/>
                    
                    <Label width="100%">Email</Label>
                    <InputField bg="#000" type="email" onChange={(e) => setEmail(e.target.value)}/>
                    
                    {/* <Label width="100%">DOB</Label>
                    <InputField bg="#000" type="date" onChange={(e) => setDate(e.target.value)}/> */}
                    
                    <Label width="100%">Password</Label>
                    <div style={{position: "relative", width: "100%"}}>
                        <InputField bg="#000" onChange={(e) => setPassword(e.target.value)} type={isRevealed ? "text" : "password"} />
                        <Icon 
                            title={isRevealed ? 'Hide Password' : 'Show Password'}
                            src={isRevealed ? showPwd : hidePwd}
                            alt='Visibility Icon'
                            onClick={() => setIsRevealed(!isRevealed)}
                        />
                    </div>
                    
                    <Label width="100%">Confirm Password</Label>
                    <div style={{position: "relative", width: "100%"}}>
                        <InputField bg="#000" onChange={(e) => setConfirmPassword(e.target.value)} type={isRevealedConfirm ? "text" : "password"} />
                        <Icon 
                            title={isRevealedConfirm ? 'Hide Password' : 'Show Password'}
                            src={isRevealedConfirm ? showPwd : hidePwd}
                            alt='Visibility Icon'
                            onClick={() => setIsRevealedConfirm(!isRevealedConfirm)}
                        />
                    </div>
                    
                    <br />
                    <Button bg={`${primary}`} color={`${text}`} onClick={handleSubmit}>Register</Button>
                    <br />
                    <Atag to="/register">
                        <Paragraph color={`${text}`} size="0.75rem">
                            Already have an account? &nbsp;
                            <Span color={`${primary}`} onClick={event}>
                                Login
                            </Span>
                        </Paragraph>
                    </Atag>
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

export default Register