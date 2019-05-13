import styled, {css} from 'styled-components';
import Colors from '../../misc/colors';

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

//Adds margin to left/right of the window
const MarginContainer = styled.div`
    padding-left:2rem;
    padding-right:2rem;
    display: flex;
    align-items: center;
    ${props => `justify-content: ${props.content};`}
    ${props => `flex-direction: ${props.direction};`}
`;

//Container to sort children with many properties
const FlexRow = styled.div`
    display:flex;
    flex-direction: row;
    width:100%;
    align-items: center;
    ${props => `flex-direction: ${props.direction};`}
    ${props => `justify-content: ${props.content};`}
    ${props => `max-width: ${props.maxwidth};`}
    ${props => `float: ${props.float};`}
    ${props => `padding-right: ${props.padright};`}
    ${props => `padding-left: ${props.padleft};`}
`

//Centers content to middle of the page
const PageCenter = styled.div`
    align-items: center;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
`;

const TItleBanner = styled.div`
    position: fixed;
    top: 157px;
    width: 100%;
    padding-top: 50px;
    padding-bottom: 50px;
    display: Flex;
`;

const TextMaxWidth = styled.div`
    //max-width: 750px;
`;

const Overlay = styled.div`
    width: 100%;
    background-color: ${Colors.standard.secondary};
    opacity: 0.95;
    flex:14;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export {PageCenter, Wrapper, TItleBanner, MarginContainer,  FlexRow, TextMaxWidth, Overlay}