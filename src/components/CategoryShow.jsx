import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { mobile } from '../responsive/media'
import Cards from './Cards'

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    ${mobile({
        width: "99%"
    })}
`



const CategoryShow = ({ cat }) => {
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getPosts = async () => {
            const res = await axios.get("https://admin-vyakta.onrender.com/api/posts/all");
            console.log(res.data);
            setPosts(res.data);
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

    return (
        <Container>
            {posts.filter(data => data.category.includes(cat)).map((data, index) => (
                <Cards
                    key={index} 
                    image={data.img} 
                    title={data.title} 
                    author={getAuthor(data.userId)} 
                />
            ))}
        </Container>
    )
}

export default CategoryShow