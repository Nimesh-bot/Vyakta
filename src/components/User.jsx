import styled from "styled-components"
import { useEffect, useState } from "react"
import { bg, Paragraph, text } from "../Global"
import { mobile, tablet } from "../responsive/media"

import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"

const Container = styled.div`
    width: 80%;
    display: flex;
    margin: 5rem 0;
    flex-direction: column;
    align-items: center;
    position: relative;
    background-color: ${bg};

    ${mobile({
        width: "100%",
    })}
`
const Wrapper = styled.div`
    margin: 1rem 0;
    display: flex;
    ${tablet({
        width: "80%"
    })}
    ${mobile({
        width: "100%"
    })}
`
const Header = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    ${mobile({
        flexDirection: "column",
    })}
`
const Avatar = styled.img`
    width: 12rem;
    height: 12rem;
    border-radius: 4px;
    margin: 1rem;
    ${tablet({
        width: "9rem",
        height: "9rem",
    })}
`
const Details = styled.div`
    width: 100%;
    margin: 0 3rem;
    flex: 2;    
    display: flex;
    flex-direction: column;
    align-items: center;


    ${mobile({
        width: "80%"
    })}
`

const Title = styled.h1`
    font-size: ${props => props.size || "1.5rem"};
    font-weight: ${props => props.weight || "800"};
    color: ${text};
    ${mobile({
        textAlign: "center",
    })}
`

const Status = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 1.5rem 1rem;
    gap: 2rem;
`
const Block = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`
const Topic = styled.p`
    font-size: 0.75rem;
    font-weight: 300;
    color: ${text};
`
const Contents = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem 0;
`
const PostContainer = styled.div`
    margin: 1rem 0;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;

    ${tablet({
        width: "80%"
    })}
`
const Posts = styled.img`
    width: 14rem;
    height: 14rem;
    border-radius: 4px;
    object-fit: cover;
    object-position: top;
    margin: 1rem 0;
    ${tablet({
        width: "10rem",
        height: "10rem",
    })}
    ${mobile({
        width: "100%"
    })}
`

const User = () => {
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState([]);
    
    const {userId} = useParams();

    const currentUser = localStorage.getItem("userId");

    let navigate = useNavigate();

    useEffect(() => {
        const getPosts = async () => {
            try{
                const res = await axios.get(`https://admin-vyakta.onrender.com/api/posts/timeline/${userId}`);
                setPosts(res.data);
            }
            catch(err){
                console.log(err);
            }
        }
        const getUser = async () => {
            try{
                const res = await axios.get(`https://admin-vyakta.onrender.com/api/users/${userId}`);
                console.log("User Detail")
                console.log(res.data)
                setUser(res.data);
            }
            catch(err) {
                console.log(err);
            }
        }
        getPosts();
        getUser();
    }, [userId])

    const handleLogout = () => {
        localStorage.removeItem("userId");
        navigate("/");
        window.location.reload();
    }

    return (
        <Container>
            <Wrapper>
                <Header>
                    <Avatar src={user.profilePicture} />
                    <Details>
                        <Title weight="200">{user.username}</Title>
                        {
                            userId === currentUser ? 
                            (
                                <Paragraph size="0.75rem" weight="300" style={{margin: "1rem 0"}} color="red" onClick={handleLogout}>LOGOUT</Paragraph>
                            ):
                            (
                                <></>
                            )
                        }
                        
                        <Status>
                            <Block>
                                <Topic>Posts</Topic>
                                <Title>{posts.length}</Title>
                            </Block>
                            <Block>
                                <Topic>Rank</Topic>
                                <Title>{user.rank}</Title>
                            </Block>
                        </Status>
                    </Details>
                </Header>

            </Wrapper>
            
            <Contents>
                <Title weight="300">POSTS</Title>
                <PostContainer>
                    {posts.map((post) => (
                        <Posts src={post.img} onClick={() =>{navigate(`/view/${post._id}`)}}/>
                    ))}
                </PostContainer>
            </Contents>
        </Container>
    )
}

export default User