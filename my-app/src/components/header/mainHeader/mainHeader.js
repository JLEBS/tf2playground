import styled from 'styled-components';
import React from 'react';
import Colors from '../../../misc/colors';
import { LobbyFont } from '../../../misc/fonts';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';

const MainHeader = styled.div`
    background-color: ${Colors.standard.secondary};
    width: 100%;
`;

const HeaderContainer = () => (
    <MainHeader>
        <LobbyFont primary>About</LobbyFont>
        <LobbyFont primary>Rules</LobbyFont>
        <LobbyFont primary>Stats</LobbyFont>
        <LobbyFont primary>Conduct</LobbyFont>
        <LobbyFont primary>Donate to Us!</LobbyFont>
    </MainHeader>
);

export default HeaderContainer;