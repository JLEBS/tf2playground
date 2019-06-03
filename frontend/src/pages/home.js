import React from 'react';
import { PageCenter, MarginContainer} from './../components/structure/containers';
import { Link, TitleLogo, Title } from '../misc/fonts';
import LoginBtn from '../components/buttons/steamBtn';

const HomePage = () => (
    <PageCenter>
        <MarginContainer direction='column'>
            <TitleLogo main/>
            <Title>Playground</Title>
            <LoginBtn largebtn='largebtn'/>
            <Link to="/lobby">TO Lobby</Link>
        </MarginContainer>
    </PageCenter>
);

export default HomePage;