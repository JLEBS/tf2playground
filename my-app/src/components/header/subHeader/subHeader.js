import styled from 'styled-components';
import React from 'react';
import Colors from '../../../misc/colors';
import { LobbyFont } from '../../../misc/fonts';
import {FlexRow} from '../../structure/containers';
import { ReactComponent as Users } from './../../../assets/imgs/icons/svgs/users_solid.svg';
import { ReactComponent as Video } from './../../../assets/imgs/icons/svgs/video_solid.svg';
import { ReactComponent as Chat } from './../../../assets/imgs/icons/svgs/comments_solid.svg';

const ChatMod = styled(Chat)`
    height: 25px;
    margin-left: 6px;
`;

const VideoMod = styled(Video)`
    height: 25px;
    margin-left: 6px;

`;

const UsersMod = styled(Users)`
    height: 25px;
    margin-left: 6px;

`;

const SubHeader = styled.div`
    background-color: ${Colors.standard.primary};
    width: 100%;
    position: fixed;
    top: 64px;
    right: 0;
    left: 0;

`;

const SocialGroup = styled.div`
    display: flex;
    flex-direction: row;
    cursor: pointer;
    padding-top:20px;
    padding-bottom: 20px;

    :hover{
        color: white;
        background-color: black;
    }
`;

const SubHeaderContainer = () => (
    <SubHeader>
        <FlexRow>
            <SocialGroup>
                <LobbyFont>Lobby Chat</LobbyFont>
                <ChatMod/>
            </SocialGroup>
            <SocialGroup>
                <LobbyFont>Online</LobbyFont>
                <UsersMod/>
            </SocialGroup>
            <SocialGroup>
                <LobbyFont>Streams</LobbyFont>
                <VideoMod/>
            </SocialGroup>
        </FlexRow>

    </SubHeader>
);

export default SubHeaderContainer;