import React from 'react';
import { PageCenter, FlexRow} from './../components/structure/containers';
import { Link, TitleLogo, Title } from '../misc/fonts';
import LoginBtn from '../components/buttons/steamBtn';

const HomePage = () => (
    <PageCenter>
        <FlexRow direction='column'>
            <TitleLogo main/>
            <Title>Playground</Title>
            <LoginBtn largebtn='largebtn'/>
            <Link to="/lobby">TO Lobby</Link>
        </FlexRow>
    </PageCenter>
);

export default HomePage;