import styled from 'styled-components';
import React from 'react';
import Colors from '../../../misc/colors';
import { Link, TitleLogo, Title } from '../../../misc/fonts';
import {FlexRow, MarginContainer} from '../../structure/containers';

const MainHeader = styled.div`
    background-color: ${Colors.standard.secondary};
    width: 100%;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index:4;
    // padding-top:2.35rem;
    // padding-bottom:2.35rem;
`;

const HeaderContainer = () => (
    <MainHeader>
        <MarginContainer>
            <FlexRow content='flex-start'>
                <TitleLogo header/>
                <Title header>Playground</Title>
            </FlexRow>
            <FlexRow content='space-between' maxwidth='1000px' float='right'>
                <Link to="/about">about</Link>
                <Link to="/rules">rules</Link>
                <Link to="/stats">stats</Link>
                <Link to="/conduct">conduct</Link>
                <Link to="/donate">donate</Link>
            </FlexRow>
        </MarginContainer>
    </MainHeader>
);

export default HeaderContainer;