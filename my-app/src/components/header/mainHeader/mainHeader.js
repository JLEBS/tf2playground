import styled from 'styled-components';
import React from 'react';
import Colors from '../../../misc/colors';
import { Link, TitleLogo, Title } from '../../../misc/fonts';
import {FlexRow, MarginContainer} from '../../structure/containers';
import LoginBtn from '../../../components/buttons/steamBtn';

const MainHeader = styled.div`
    background-color: ${Colors.standard.secondary};
    width: 100%;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index:4;
`;

const HeaderContainer = () => (
    <MainHeader>
        <MarginContainer content='space-between' topPadding='unset'>
            <FlexRow content='flex-start' maxwidth='600px' float='unset' padright='1rem'>
                <TitleLogo header/>
                <Title header>Playground</Title>
            </FlexRow>
            <FlexRow content='space-between' maxwidth='700px' float='right' padleft='1rem'>
                <Link to="/about">about</Link>
                <Link to="/rules">rules</Link>
                <Link to="/stats">stats</Link>
                <Link to="/conduct">conduct</Link>
                <Link to="/donate">donate</Link>
            </FlexRow>
            <FlexRow content='flex-end' maxwidth='300px' float='right' padleft='1rem'>
                <LoginBtn smallbtn='smallbtn'/>
            </FlexRow>
        </MarginContainer>
    </MainHeader>
);

export default HeaderContainer;