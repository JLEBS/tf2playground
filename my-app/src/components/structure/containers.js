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

    ${props => props.pattern && css`
        background-size: auto; 
        background-repeat: repeat;
    `}
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

    ${props => props.wrap && css`
        @media (max-width: 510px){
            width:100%;
            flex-wrap: wrap;
            flex-direction: row;
            justify-content: space-between;

            .classTitle{
                width: 100%;
            }
        }
    `}

    //Grows to outer container
    ${props => props.size && css`
        width: ${props.size};
    `}

    //For Border Color & Class
    ${props => props.fill && css`
        border-left:  4px solid ${props.fill}  !important;
        padding-left:10px;

        @media (max-width: 510px){
           margin-top:12px;
           margin-bottom:12px;
        }  
    `};

    //For Tempus points and lifetime/class stats
    ${props => props.tempus && css`
        max-width:120px;
        padding:6px;
        border: 1px dotted grey;

        @media(max-width: 510px){
          
        }
    `}

    ${props => props.statTitle && css`
        padding:20px;
        @media (max-width: 510px){
            width: 100%;
            padding-left: 0px;
            align-items: center;
            flex-direction: row;
         }  
    `}

    ${props => props.stat && css`
        flex-direction: column;
        align-items: flex-start;
        padding-bottom: 10px;
        padding-top: 10px;

        .statData{
            width: 100%;
            justify-content: space-around;
            padding-top: 12px;
            padding-bottom: 12px;
        }

        @media (max-width: 510px){
            width: 30%;
            margin: 0px;
            padding: 0px;
        }  
    `}

    ${props => props.profile && css` 
        @media (max-width: 510px){
            flex-direction:column;
        }
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