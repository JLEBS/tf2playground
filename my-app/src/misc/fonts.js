import styled, {css} from 'styled-components';
import {fluidRange} from 'polished';
import Colors from './colors';
import {Link as ReactRouterLink} from 'react-router-dom';
import tf2logo from './../assets/imgs/themes/tf2logo.png';

const colorPrimary = Colors.standard.primary;
const colorSecondary = Colors.standard.secondary;

const TypeFace = {
    TF2Main: 'TF2 Main',
    TF2Secondary: 'TF2 Secondary'
};

export const TitleLogo = styled.div`
    background-image: url(${tf2logo});
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100%;
    display: block;
    position: relative;
    height: 0;
    cursor: pointer;
    
    ${props => props.main && css`
        width: 40%;
        padding-bottom: 170px;
        max-width: 800px;
        min-width: 500px;
    `}

    ${props => props.header && css`
        width: 20%;
        padding-bottom: 90px;
        min-width: 300px;
        margin-top:10px;
    `}
`;

export const Title = styled.h1`
    font-style: normal;
    font-weight: 600;
    font-size: 70px;
    text-transform: uppercase;
    color: ${colorPrimary};
    text-shadow: -3px -3px  #000000;
    display: inline-block;

    ${props => props.main && css`
        font-size: 70px;
    `}

    ${props => props.header && css`
        font-size: 36px;
        margin: 0 auto;
    `}

    ${props => props.banner && css`
        ${fluidRange(
            {
                prop: 'font-size',
                fromSize: '36px',
                toSize: '70px',
            },
        '400px',
        '2000px',
        )}

        line-height:71px;
        margin: 0 auto;
        padding-top:60px;
        padding-bottom: 60px;
        flex: 1;
    `}
`;

export const LobbyFont = styled.p`
    font-style: normal;
    font-weight: 600;
    text-transform: uppercase;
    line-height: 150%;

    ${props => props.primary && css`
        font-size: 16px;
        color: ${colorPrimary};
    `}

    ${props => props.secondary && css`
        font-size: 16px;
        color: ${colorSecondary};
    `}

    ${props => props.paragraph && css`
        color: ${colorPrimary};
        text-transform: inherit; 
        margin: 0 auto;
        padding-top: 1rem;
        padding-bottom: 1rem;
        font-weight: 600;

        ${fluidRange(
        {
            prop: 'font-size',
            fromSize: '16px',
            toSize: '24px',
        },
        '400px',
        '2000px',
        )}

        ${fluidRange(
        {
            prop: 'max-width',
            fromSize: '750px',
            toSize: '1440px',
        },
        '400px',
        '2000px',
        )}
    `}
`;

export const Link = styled(ReactRouterLink)`
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    text-transform: uppercase;
    color: ${Colors.standard.navHover};
    transition: color 1s ease-out;

    :hover {
        color: ${colorPrimary};
        size: 120%;
    }
`;

export const MinorFont = styled.p`
    font-style: normal;
    font-size: 14px;
    line-height: 16px;

    ${props => props.lobby && css`
        color: ${colorPrimary};
        font-weight: 600;
    `}
    ${props => props.user && css`
        color: ${colorSecondary};
        font-weight: normal;
    `}
`;

export const UserLinks = styled.a`
    font-style: normal;
    font-weight: 600;
    font-size: 10px;
    line-height: 14px;
    letter-spacing: 0.05em;
`;

export const BtnText = styled.p`
    font-size: 24px;
    font-style: normal;
    font-weight: bold;
    text-transform: uppercase;
    transition: background 1s ease;
    transition: color 1s ease;

    ${props => props.largebtn && css`
        padding:1rem;
        box-shadow: 2px 8px ${Colors.standard.secondary};
      
        :hover{
            color: ${Colors.standard.primary};
            background-color: ${Colors.standard.secondary};
        }
    `}

    ${props => props.smallbtn && css`
        box-shadow: 2px 5px ${Colors.standard.secondary};
    `}
`;

export const UserHeading = styled.h2`
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    text-align: center;
    text-transform: capitalize;
    color: ${colorPrimary};
    
    ${props => props.heading && css`
        background-color: ${Colors.standard.secondary};
        padding: 25px;
        border-radius: 10px 10px 0px 0px;
        letter-spacing: 5%;
    `}
`;

export const UserSubHeading = styled.h3`
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    text-transform: capitalize;
    color: ${colorSecondary};
    float: left;
    margin-left:12px;
`;

export const UserContent = styled.h4`
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 16px;
    text-transform: capitalize;
    color: ${colorSecondary};
    float: left;
    min-width: 120px;
`;