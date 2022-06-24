import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { mobile } from '../responsive/media'
import Cards from './Cards'

import axios from 'axios'

const Container = styled.div`
    width: 80%;
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    column-gap: 2.25rem;
    align-items: center;
    margin: 0 3rem 2rem 0;

    ${mobile({
        width: "99%"
    })}
`

const Random = ({ x, search }) => {
    let y = parseInt(x);
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);
    const [topPosts, setTopPosts] = useState([]);

    useEffect(() => {
        const getPosts = async () => {
            const res = await axios.get("https://admin-vyakta.onrender.com/api/posts/all");
            console.log(res.data);
            setPosts(res.data);
            setTopPosts(res.data);
        }
        
        const getAllUsers = async () => {
            const res = await axios.get(`https://admin-vyakta.onrender.com/api/users/`);
            setUsers(res.data);
        }

        getPosts();
        getAllUsers();
    }, []);

    const getAuthor = (index) => {
      let i = 0;

      for(i in users) {
        if(users[i]._id === index) {
          return users[i].username;
        }
      }
    }
    
    useEffect(() => {
        setTopPosts(prev => [...prev].sort((a, b) => b.likes.length - a.likes.length))
    }, [topPosts])


    return (
        <Container>
            {
                (y > 0) 
                ?
                (
                    <>
                        {topPosts.slice(0, y).map((data, index) => (
                            <Cards
                                key={index} 
                                image={data.img} 
                                title={data.title} 
                                author={getAuthor(data.userId)} 
                                type={data.category}
                                id={data._id}
                            />
                        ))}
                    </>
                )
                :
                (search)?
                (
                    <>
                        {posts.filter(
                            (data) => data.title.toLowerCase().includes(search) || 
                                data.category.toLowerCase().includes(search) || 
                                getAuthor(data.userId).toLowerCase().includes(search) || 
                                data.desc.toLowerCase().includes(search) 
                            ).map((data, index) => (
                            <Cards
                                key={index} 
                                image={data.img} 
                                title={data.title} 
                                author={getAuthor(data.userId)} 
                                type={data.category}
                                id={data._id}
                            />
                        ))}
                    </>
                )
                :
                (
                    <>
                        {posts.map((data, index) => (
                            <Cards
                                key={index} 
                                image={data.img} 
                                title={data.title} 
                                author={getAuthor(data.userId)} 
                                type={data.category}
                                id={data._id}
                            />
                        ))}
                    
                    </>
                )
            }
        </Container>
    )
}

export default Random