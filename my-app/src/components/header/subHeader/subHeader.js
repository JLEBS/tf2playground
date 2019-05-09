import styled, {css} from 'styled-components';
import React from 'react';
import Colors from '../../../misc/colors';
import { LobbyFont } from '../../../misc/fonts';
import {FlexRow} from '../../structure/containers';
import { ReactComponent as Users } from './../../../assets/imgs/icons/svgs/users_solid.svg';
import { ReactComponent as Video } from './../../../assets/imgs/icons/svgs/video_solid.svg';
import { ReactComponent as Chat } from './../../../assets/imgs/icons/svgs/comments_solid.svg';

const ChatMod = styled(Chat)`
    height: 25px;
    margin-left: 10px;
    
`;

const VideoMod = styled(Video)`
    height: 25px;
    margin-left: 10px;

`;

const UsersMod = styled(Users)`
    height: 25px;
    margin-left: 10px;

`;

const SubHeader = styled.div`
    background-color: ${Colors.standard.primary};
    width: 100%;
    position: fixed;
    top: 100px;
    right: 0;
    left: 0;
    z-index: 3;

`;

const SocialGroup = styled.div`
    display: flex;
    flex-direction: row;
    cursor: pointer;
    padding: 1rem 4rem 1rem 4rem;

    :hover{
        color: ${Colors.standard.primary};
        background-color: ${Colors.standard.secondary};
    }

    ${props => props.chat && css`
        :after{
            content: '';
            width:8px;
            height:8px;
            border-radius:5px;
            background-color:red;
            margin-right:10px;
    
        }
    `}
`;

const SubHeaderContainer = () => (
    <SubHeader>
        <FlexRow>
            <SocialGroup chat>
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