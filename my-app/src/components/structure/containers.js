import styled, {css} from 'styled-components';
import Colors from '../../misc/colors';

//Wraps the content of the entire page can use prop to modify background
const Wrapper = styled.div`
    ${props => `background-image: url(${props.imageUrl});`}
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    height: 100vh;
    width: 100vw;
    z-index: -3;
    font-family: 'Open Sans', sans-serif;
    background-color: #EEEEEE;
    display:flex;
    overflow-y: scroll;
`;

//Wraps the entire content of the page excluding the navigation bar
const Content = styled.div`
    padding-top: 156px;
    width:100vw;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    outline: 5px solid red;
`;

//Adds margin to left/right of the window and organises content
const MarginContainer = styled.div`
    padding: 2rem;
    display: flex;
    flex-wrap: wrap;
    ${props => `align-items: ${props.align};`}
    ${props => `flex-direction: ${props.direction};`}
    ${props => `justify-content: ${props.content};`}
    ${props => `padding-left: ${props.sidePadding};
                padding-right: ${props.sidePadding}`}
    ${props => `padding-top: ${props.topPadding};
                padding-bottom: ${props.topPadding}`}
`;

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

const Overlay = styled.div`
    width: 100%;
    background-color: ${Colors.standard.secondary};
    opacity: 0.95;
    flex:14;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export {PageCenter, Content, Wrapper, TItleBanner, MarginContainer, Overlay}