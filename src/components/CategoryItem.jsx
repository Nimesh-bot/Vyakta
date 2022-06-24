import styled from "styled-components";
import { Link } from "react-router-dom";
import { HeadingText, Paragraph, text } from "../Global";
import { mobile } from "../responsive/media";

const Container = styled.div`
    flex: 1;   
    margin: 0 1rem;
    height: 70vh; 
    position: relative;

    ${mobile({
        width: "80%",
        height: "20vh"
    })}
`    
const Image = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 4px;
    object-fit: cover;

`
const Info = styled.div`
    position: absolute;
    
    background: rgb(81,196,211);
    background: linear-gradient(180deg, rgba(81,196,211,0) 0%, rgba(81,196,211,0.7060574229691876) 57%, rgba(81,196,211,1) 100%);

    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: end;
    border-radius: 4px;
    opacity: 0;
    padding: 2rem;

    &:hover {
        opacity: 1;    
    }
`


const CategoryItem = ({item}) => {
    return (
        <Container>
            <Link to={`/category/` + item.id} >
                <Image 
                    src={item.image}
                />
                <Info>
                    <HeadingText size="3rem">{item.name}</HeadingText>
                    <Paragraph size="0.75rem" color={`${text}`}>{item.description}</Paragraph>
                </Info>
            </Link>
        </Container>
    )
}

export default CategoryItem
