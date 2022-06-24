import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { dark, HeadingText, Paragraph, primary, text } from '../Global'
import { mobile } from '../responsive/media'

const Container = styled.div`
    width: 80%;
    height: 8vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 3rem 5rem 2rem 0;

    ${mobile({
        flexDirection: "column",
        width: "100%",
        margin: "2rem 0",
        display: "none"
    })}
`

const Card = styled.div`
    flex: 1;
    margin: 0 1rem;
    height: 100%;
    display: flex;
    justify-content: space-between;
    border-radius: 4px;
    align-items: center;
    background-color: ${dark};   
    
    ${mobile({
        margin: "1rem 0",
        width: "80%"
    })}
`
const Avatar = styled.img`
    flex: 1;
    width: 3rem;
    height: 100%;
    border-radius: 4px;
    object-fit: cover;
`
const Details = styled.div`
    flex: 3;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

// DummyData
const dummyData = [
    {
        id: 1,
        name: 'Hotaru',
        rank: 1,
        avatar: 'https://i.pinimg.com/236x/09/90/4d/09904d5bdf2973e131a57c653f4800b0.jpg'
    },
    {
        id: 2,
        name: 'Supreme_112',
        rank: 2,
        avatar: 'https://i.pinimg.com/236x/8e/53/35/8e5335cad5b528eb1f2aacec57dbc071.jpg'
    },
    {
        id: 3,
        name: 'Natsume',
        rank: 3,
        avatar: 'https://i.pinimg.com/236x/32/dc/4a/32dc4ae8977ad2c903fce7975e638b2b.jpg'
    },
    {
        id: 4,
        name: 'Nick Official',
        rank: 4,
        avatar: 'https://i.pinimg.com/236x/f3/43/c1/f343c1929e4062a3afdedbce946a2f91.jpg'
    },
    {
        id: 5,
        name: '--1to',
        rank: 5,
        avatar: 'https://i.pinimg.com/236x/ce/f7/ba/cef7ba935206b75cce4006dbb39d1904.jpg'
    },
]

const TopRanked = () => {
    const [users, setUsers] = useState([]);
    const [post, setPosts] = useState([]);

    useEffect(() => {
        const getAllUsers = async () => {
            const res = await axios.get('https://admin-vyakta.onrender.com/api/users/');
            setUsers(res.data);
        }
        const getAllPosts = async () => {
            const res = await axios.get('https://admin-vyakta.onrender.com/api/posts/all');
            setPosts(res.data);
        }
        getAllPosts();
        getAllUsers();
    }, [])

    return (
        <Container>
            {dummyData.map((data, index) => (
                <Card key={index}>
                    <Avatar src={data.avatar}/>
                    <Details>
                        <HeadingText color={`${text}`} size="1rem" weight="300">{data.name}</HeadingText>
                        <Paragraph size="0.75rem" color={`${primary}`}>#Rank {data.rank}</Paragraph>
                    </Details>
                </Card>
            ))}
        </Container>
    )
}

export default TopRanked