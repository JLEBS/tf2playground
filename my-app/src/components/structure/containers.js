import styled, {css} from 'styled-components';
import Colors from '../../misc/colors';
import {fluidRange} from 'polished';

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
    display: flex;
    align-items: center;

    ${props => props.direction && css`
       flex-direction: ${props.direction};
    `}

    ${props => props.content && css`
        justify-content: ${props.content};
    `}

    ${props => props.shrink && css`
        align-items: flex-start;
        flex-wrap: wrap;
    `}
    
    ${props => props.verticalpadding && css` 
        ${fluidRange(
            {
                prop: 'padding-top',
                fromSize: '24px',
                toSize: '32px',
            },
        '400px',
        '2000px',
        )}

        ${fluidRange(
            {
                prop: 'padding-bottom',
                fromSize: '24px',
                toSize: '32px',
            },
        '400px',
        '2000px',
        )}
    `}

    ${props => props.sidepadding && css` 
        ${fluidRange(
            {
                prop: 'padding-left',
                fromSize: '24px',
                toSize: '32px',
            },
        '400px',
        '2000px',
        )}

        ${fluidRange(
            {
                prop: 'padding-right',
                fromSize: '24px',
                toSize: '32px',
            },
        '400px',
        '2000px',
        )}
    `}
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