import styled, {css} from 'styled-components';
import {fluidRange} from 'polished';
import Colors from './colors';
import {Link as ReactRouterLink} from 'react-router-dom';

const colorPrimary = Colors.standard.primary;
const colorSecondary = Colors.standard.secondary;

const TypeFace = {
    TF2Main: 'TF2 Main',
    TF2Secondary: 'TF2 Secondary'
};

const Title = styled.h1`

`;

const NavHeader = styled.h2`

`;

export const LobbyFont = styled.p`
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    text-transform: uppercase;

    ${props => props.primary && css`
        color: ${colorPrimary};
    `}

    ${props => props.secondary && css`
        color: ${colorSecondary};
    `}
`;

export const Link = styled(ReactRouterLink)`
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    text-transform: uppercase;
    color: ${Colors.standard.navHover};

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

export const UserHeading = styled.h3`
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 27px;
    color: ${colorPrimary};
`;

export const UserSubHeading = styled.h4`
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 16px;
    color: ${colorSecondary};
`;

export const UserLinks = styled.a`
    font-style: normal;
    font-weight: 600;
    font-size: 10px;
    line-height: 14px;
    letter-spacing: 0.05em;
`;

export const LoginButton = styled.button`
    font-style: normal;
    font-weight: bold;
    text-transform: uppercase;
    color: ${colorSecondary};

    ${props => props.largebtn && css`
        font-size: 24px;
        line-height: 33px;
    `}

    ${props => props.smallbtn && css`
        font-size: 12px;
        line-height: 16px;
    `}
`;
