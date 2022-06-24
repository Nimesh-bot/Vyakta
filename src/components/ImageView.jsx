import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaFire } from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { disabled, HeadingText, Paragraph, primary, text } from '../Global'
import { mobile } from '../responsive/media'

const Container = styled.div`
    width: 80%;
    display: flex;
    flex-direction: column;

    ${mobile({
        width: "98vw"
    })}
`
const Wrapper = styled.div`
    width: ${props => props.width || '100%'};
    margin: 1rem 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    column-gap: 1rem;
    align-items: center;

    ${mobile({
        flexDirection: `${props => props.mobileFlex}`,
    })}
`
const SubWrapper = styled.div`
    display: flex;
    flex-direction: column;
`
const Image = styled.img`
    flex: 1;
    height: 60vh;
    object-fit: cover;
    object-position: top;

    ${mobile({
        width: "100%",
        height: "auto"
    })}
` 
const Details = styled.div`
    flex: 1;
    margin: 0 1rem;
    display: flex;
    flex-direction: column;
    row-gap: 2rem;
    height: 60vh;
`

const ImageView = () => {
    const [liked, setLiked] = useState(false);

    const { id } = useParams();
    const [post, setPost] = useState({});
    const [postlikes, setPostlikes] = useState([]);
    const [user, setUser] = useState({});

    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const getPost = async() => {
            const res = await axios.get(`https://admin-vyakta.onrender.com/api/posts/id/${id}`);
            setPost(res.data);
            setPostlikes(res.data.likes);
        }
        const getAllUser = async() => {
            const res = await axios.get(`https://admin-vyakta.onrender.com/api/users/`);
            setUser(res.data);
        }
        getPost();
        getAllUser();
    }, [id])

    const getAuthor = (index) => {
        let i = 0;
        for (i in user) {
            if (user[i]._id === index) {
                return user[i].username;
            }
        }
    }
    const getRank = (index) => {
        let i = 0;
        for (i in user) {
            if (user[i]._id === index) {
                return user[i].rank;
            }
        }
    }

    // const [likesNumber, setLikesNumber] = useState(0);
    // useEffect(() => {
    //     const likes = () => {
    //         let popularity = post.likes;
    //         console.log("popularity")
    //         console.log(popularity)
    //         setLikesNumber(popularity.length);
    //     }
    //     likes();
    // }, [])

    let navigate = useNavigate();
    const handleNavigateAuthor = () => {
        navigate(`/profile/${post.userId}`)
    }   

    // like
    useEffect(() => {
        const getPost = async() => {
            const res = await axios.get(`https://admin-vyakta.onrender.com/api/posts/id/${id}`);
            let likedBy = res.data.likes
            let i = 0;
            for (i in likedBy) {
                if (userId === likedBy[i]) {
                    setLiked(true);
                }
                else{
                    setLiked(false);
                }
            }
        }
        getPost();
    }, [id, postlikes, userId])

    const handleLike = async() => {
        try{
            await axios.put(`https://admin-vyakta.onrender.com/api/posts/${id}/like`, {userId: userId});
            setLiked(!liked);
        }
        catch(err){
            console.log(err);
        }
    }

    return (
        <Container>
            <Wrapper>
                <SubWrapper>
                    <HeadingText weight="500">{post.title}</HeadingText>
                    <Paragraph color={`${disabled}`}>{post.category}</Paragraph>
                </SubWrapper>
                
                <SubWrapper>
                    <HeadingText size="1rem" color={`${primary}`} weight="500" onClick={handleNavigateAuthor}>{getAuthor(post.userId)}</HeadingText>
                    <Paragraph color={`${disabled}`}>#Rank {getRank(post.userId)}</Paragraph>
                </SubWrapper>
            </Wrapper>

            <Wrapper mobileFlex="column">
                <Image src={post.img} />

                <Details>
                    <SubWrapper>
                        <HeadingText weight="500">Description</HeadingText>
                        <Paragraph margin="0.5rem 0" size="1rem" color={`${disabled}`}>{post.desc}</Paragraph>

                        <br />

                    </SubWrapper>

                    <SubWrapper>
                        <Paragraph size="1rem" color={`${text}`} margin="1rem 0">Support the artist</Paragraph>
                        <Wrapper width="auto">
                            {
                                !liked ? 
                                <FaFire color="white" onClick={handleLike} style={{fontSize: "1.5rem"}}/> : 
                                <FaFire color={`${primary}`} onClick={handleLike} style={{fontSize: "1.5rem"}}/>
                            }
                            <Paragraph color={`${text}`}>{postlikes.length} people like this</Paragraph>
                        </Wrapper>
                    </SubWrapper>
                </Details>               
            </Wrapper>
        </Container>
    )
}

export default ImageView