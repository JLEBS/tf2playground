import React from 'react';
import HeaderContainer from '../header/mainHeader/mainHeader';
import SubHeaderContainer from '../header/subHeader/subHeader';
import {PageContainer, TextOverlay, Wrapper, PageCenter, TItleBanner} from './containers';
import {Title} from '../../misc/fonts';
import styled, {css} from 'styled-components';

const ContentContainer = styled.div`
    margin-top: 160px;
    outline: 5px solid red;
}
`;

const NoOverflow = styled.div`
    overflow-y: hidden;
`;


//Header Div
const HeaderLayout = ({children}) => (
    <NoOverflow>
        <HeaderContainer className='mainHeader'/>
        <SubHeaderContainer/>
        <ContentContainer>
            {children}
        </ContentContainer>
    </NoOverflow>
);

//Background Image
const BackgroundImage = ({children, imageUrl}) => (
    <PageContainer>
        <Wrapper imageUrl={imageUrl}>
            {children}
        </Wrapper>
    </PageContainer>
);

//For landing and login page
export const LandingLayout = ({children, imageUrl}) => (
    <BackgroundImage imageUrl={imageUrl}>
        <PageContainer>
            {children}
        </PageContainer>
    </BackgroundImage>
);

//Lobby Layout
export const LobbyLayout = ({children, imageUrl}) => (
    <BackgroundImage imageUrl={imageUrl}>
        <HeaderLayout>
            {children}
        </HeaderLayout>
    </BackgroundImage>
);


//Website Description Layout
export const TextLayout = ({children, imageUrl}) => (
    <BackgroundImage imageUrl={imageUrl}>
        <HeaderLayout>
        </HeaderLayout>
    </BackgroundImage>
);