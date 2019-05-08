import React from 'react';
import sunshine from './../assets/imgs/maps/sunshine.jpg';
import styled, {css} from 'styled-components';
import {Wrapper, FlexColumn} from './../components/structure/containers';
import { Link } from '../misc/fonts';

const HomePage = () => (
    <Wrapper imageUrl={sunshine}>   
        <FlexColumn>
            <div>Logo</div>
            <div>Title will be here</div>
            <div>Probably the button thingy</div>
            <Link to="/lobby">TO Lobby</Link>
        </FlexColumn>
    </Wrapper>
);

export default HomePage;