import React from 'react';
import HeaderContainer from '../header/mainHeader/mainHeader';
import SubHeaderContainer from '../header/subHeader/subHeader';
import {Wrapper, Content, MarginContainer, Overlay} from './containers';
import {Title} from '../../misc/fonts';
import styled, {css} from 'styled-components';

//For landing/login page
export const LandingLayout = ({children, imageUrl}) => (
    <Wrapper imageUrl={imageUrl}>
        {children}
    </Wrapper>
);

//Structure of entire website (except login page!) This should never ever refresh/change, only the children should change between pages
const WebStructure = ({children, imageUrl}) => (
    <Wrapper imageUrl={imageUrl}>
        <HeaderContainer className='mainHeader'/>
        <SubHeaderContainer className='subHeader'/>
       
        <Content className='content'>
            {children}
        </Content>
    </Wrapper>
);

//Website Description Layout
export const TextLayout = ({children, imageUrl, title, content}) => (
    <WebStructure imageUrl={imageUrl}>
        <MarginContainer content='center' direction='column'>
            <Title banner>About TF2 Lobby</Title>
        </MarginContainer>
        <Overlay>
            <MarginContainer>
                {children}
            </MarginContainer>
        </Overlay>
    </WebStructure>
);

//Profile Layout
export const ProfileLayout = ({children, imageUrl}) => (
    <WebStructure imageUrl={imageUrl}>
        <MarginContainer>
            {children}
        </MarginContainer>
    </WebStructure>
);

//Matches & Profile List Layout
export const ArrayLayout = ({children,}) => (
    <WebStructure>
        {children}
    </WebStructure>
);

//Lobby Layout
export const LobbyLayout = ({children, imageUrl}) => (
    <WebStructure imageUrl={imageUrl}>
        {children}
    </WebStructure>
);