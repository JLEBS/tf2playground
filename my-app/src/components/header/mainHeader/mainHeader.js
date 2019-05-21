import styled, {css} from 'styled-components';
import React from 'react';
import Colors from '../../../misc/colors';
import { Link, TitleLogo, Title } from '../../../misc/fonts';
import {MarginContainer} from '../../structure/containers';
import LoginBtn from '../../../components/buttons/steamBtn';
import {ReactComponent as Megaphone} from '../../../assets/imgs/icons/svgs/volume_mute_solid.svg'

const MainHeader = styled.div`
    background-color: ${Colors.standard.secondary};
    width: 100%;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index:4;
    
`;

const SpeakerMod = styled(Megaphone)`
    height: 25px;
    color:white;
    margin-right:24px;
`;

const HeaderContainer = () => (
    <MainHeader>
        <MarginContainer sidepadding spacebetween>
            <MarginContainer>
                <TitleLogo header/>
                <Title header>Playground</Title>
            </MarginContainer>
            <MarginContainer content='space-between' maxwidth='700px' float='right'>
                <Link margin to="/about">about</Link>
                <Link margin to="/rules">rules</Link>
                <Link margin to="/stats">stats</Link>
                <Link margin to="/conduct">conduct</Link>
                <Link margin to="/donate">donate</Link>
            </MarginContainer>
            <MarginContainer direction='row' sidePadding='unset' topPadding='unset' content='space-between' align='center'>
                <SpeakerMod/>
                <LoginBtn smallbtn='smallbtn'/>
            </MarginContainer>
        </MarginContainer>
    </MainHeader>
);

export default HeaderContainer;