import styled, {css} from 'styled-components';
import { fluidRange } from 'polished';

//Outermost container of the entire website
const PageContainer = styled.div`
  
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
    z-index: -3;
    font-family: 'Open Sans', sans-serif;
    background-color: #EEEEEE;
    display:flex;
`;

const MarginContainer = styled.div`
    padding-left:2rem;
    padding-right:2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
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
    width:100%;
    align-items: center;
    ${props => `justify-content: ${props.content};`}
    ${props => `max-width: ${props.maxwidth};`}
    ${props => `float: ${props.float};`}
`
const PageCenter = styled.div`
    align-items: center;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
`;

const TextOverlay = styled.div`
    position: fixed;
    top: 284px;
    width: 100%;
    z-index: 12;
    height: 90%;
    background-color: white;
    opacity: 0.8;
`;

const TItleBanner = styled.div`
    position: fixed;
    top: 157px;
    width: 100%;
    padding-top: 50px;
    padding-bottom: 50px;
    display: Flex;
`;



export {PageContainer, TextOverlay, PageCenter, Wrapper, TItleBanner, MarginContainer, MaxWidthContainer, FixedContainer, FlexColumn, FlexRow}