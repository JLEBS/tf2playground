import React from 'react';
import sunshine from './../assets/imgs/maps/sunshine.jpg';
import styled, {css} from 'styled-components';
import {Wrapper, FlexColumn, PageCenter} from './../components/structure/containers';
import { Link, TitleLogo, Title } from '../misc/fonts';

const HomePage = () => (
    <PageCenter>
        <FlexColumn>
            <TitleLogo main/>
            <Title>Playground</Title>
            <div>Probably the button thingy</div>
            <Link to="/lobby">TO Lobby</Link>
        </FlexColumn>
    </PageCenter>
);

export default HomePage;