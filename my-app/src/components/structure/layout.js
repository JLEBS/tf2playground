import React from 'react';
import HeaderContainer from '../header/mainHeader/mainHeader';
import SubHeaderContainer from '../header/subHeader/subHeader';
import {PageContainer, TextOverlay, Wrapper, PageCenter, TItleBanner} from './containers';
import {Title} from '../../misc/fonts';
import styled, {css} from 'styled-components';

const Content = styled.div`
    padding-top: 160px;
    outline: 5px solid red;
    display: flex;
    flex-wrap: wrap;
    width:100%;
    flex-direction: column;
`;

const Overlay = styled.div`
    width: 100%;
    background-color: white;
    opacity: 0.95;
    flex:14;
    display: flex;
    justify-content: center;
    align-items: center;
`;


//For landing and login page
export const LandingLayout = ({children, imageUrl}) => (
    <Wrapper imageUrl={imageUrl}>
        <PageContainer>
            {children}
        </PageContainer>
    </Wrapper>
);

//Header
const Header = () => (
    <div className='header'>
        <HeaderContainer/>
        <SubHeaderContainer/>
    </div>
);

//Structure of entire website (except login page!)
const WebStructure = ({children, imageUrl}) => (
    <Wrapper imageUrl={imageUrl}>
        <Header/>
        <Content className='content'>
            {children}
        </Content>
    </Wrapper>
);

//Website Description Layout
export const TextLayout = ({children, imageUrl, title, content}) => (
    <WebStructure imageUrl={imageUrl}>
        <Title padding header>About TF2 Lobby</Title>
        <Overlay>
            {children}
        </Overlay>
    </WebStructure>
);

//Lobby Layout
export const LobbyLayout = ({children, imageUrl}) => (
    <WebStructure imageUrl={imageUrl}>
        {children}
    </WebStructure>
);