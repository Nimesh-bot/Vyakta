import styled from 'styled-components'
import { mobile } from './responsive/media'

export const primary = "#51C4D3";
export const secondary = "#419ca7";
export const bg = "#222222";
export const bg_2 = "#222222";
export const text = "#efefef";
export const dark = "#000";
export const disabled = "#828282";

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${bg_2};
  display: flex;
  justify-content: start;
  align-items: start;
  flex-wrap: wrap;
  position: ${props => props.position};

  ${mobile({
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  })}
`

export const FlexBox = styled.div`
  flex: ${props => props.flex};

  ${mobile({
    width: "100%"
  })}
`

export const HeadingText = styled.h1`
  font-size: ${props => props.size || "1.5rem"};
  color: ${props => props.color || text};
  font-weight: ${props => props.weight || "800"};
  text-transform: ${props => props.textTransform || "capitalize"};
  font-family: ${props => props.font};
  margin: ${props => props.margin};
`
export const Paragraph = styled.p`
  font-size: ${props => props.size || "1rem"};
  color: ${props => props.color || text};
  margin: ${props => props.margin};
`
export const ExtraDiv = styled.div`
  width: ${props => props.width};
  text-align: center;
  margin: 1.5rem 0;
  display: flex;
  justify-content: ${props => props.justify};
  align-items: ${props => props.align};

  ${mobile({
    width: "100%",
  })}
`

export const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  background: ${props => props.bg};
  color: ${props => props.color};
  border: none;
  font-weight: 500;
  margin: 1rem 0;
` 
export const Icon = styled.img`
  width: 1rem;
  height: 1rem;
  object-fit: contain;
`
export const IconWrapper = styled.div`
  width: ${props => props.width};
  padding: ${props => props.padding};
  background-color: ${props => props.bg};
  display: flex;
  align-items: center;
  justify-content: center;

  ${mobile({
    padding: "0.5rem"
  })}
` 
export const InputField = styled.input`
  padding: ${props => props.padding || "0.75rem 1rem"};
  border-radius: 4px;
  width: 100%;
  border: none;
  font-size: ${props => props.size || "1rem"};
  color: ${props => props.color || `${text}`};
  background: ${props => props.bg || "transparent"};
  margin-bottom: 1rem;
`
export const Atag = styled.a`
  color: ${props => props.color || "inherited"};
  text-decoration: none;
` 
export const Span = styled.span`
  color: ${props => props.color || "inherit"};
  font-size: ${props => props.size || "0.75rem"};
`
export const Label = styled.label`
  font-size: 0.75rem;
  color: ${text};
  width: ${props => props.width};
  margin-bottom: 0.5rem;
`