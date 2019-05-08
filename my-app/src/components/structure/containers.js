import styled, {css} from 'styled-components';

//Outermost container of the entire website
const PageContainer = styled.div`
    font-family: 'Open Sans', sans-serif;
    background-color: #EEEEEE;
`;

//Wraps the content of the entire website (-header) option for background image
const Wrapper = styled.div`
    ${props => `background-image: url(${props.imageUrl});`}
    height: 100vh;
    width: 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
`;

const Container = styled.div`
    padding-left:1.6rem;
    padding-right:1.6rem;
    padding-top:4rem;
    padding-bottom:4rem;
    margin: 0 auto;
`;

const MaxWidthContainer = styled.div`
    max-width: 1480px;
    margin: 0 auto;
`

const FixedContainer = styled.div`
    position: fixed;
`

const FlexColumn = styled.div`
    display:flex;
    flex-direction:column;
    align-items: center;
`

const FlexRow = styled.div`
    display:flex;
    flex-direction: row;
    justify-content: space-evenly; 
`

export {PageContainer, Wrapper, Container, MaxWidthContainer, FixedContainer, FlexColumn, FlexRow}