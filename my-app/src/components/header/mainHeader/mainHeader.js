import styled from 'styled-components';
import React from 'react';
import Colors from '../../../misc/colors';
import { Link } from '../../../misc/fonts';
import {FlexRow} from '../../structure/containers.js.js';
import { BrowserRouter as Router, Route} from 'react-router-dom';

const MainHeader = styled.div`
    background-color: ${Colors.standard.secondary};
    width: 100%;
`;

const HeaderContainer = () => (
    <Router>
        <MainHeader>
            <FlexRow>
                <Link to="/about">about</Link>
                <Link to="/rules/">rules</Link>
                <Link to="/stats/">stats</Link>
                <Link to="/conduct/">conduct</Link>
                <Link to="/donate/">donate</Link>
            </FlexRow>
        </MainHeader>
    </Router>
);

export default HeaderContainer;