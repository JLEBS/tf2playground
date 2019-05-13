import styled, {css, keyframes} from 'styled-components';
import React, {useState} from 'react';
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

const slideIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;



const SocialGroup = styled.button`
    display: flex;
    flex-direction: row;
    cursor: pointer;
    padding: 1rem 2rem 1rem 2rem;
    align-items: center;

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

const DropWindow = styled.li`
    background-color: ${Colors.standard.secondary};
    width: 487px;
    padding-top:50px;
    padding-bottom: 50px;
    position: absolute;
    top: 57px;
    z-index:-3;
    color: white;
    //animation: ${slideIn} 2s linear;
`;

const DeleteThis = styled.div`
height:2000px;
`;

const SubHeaderContainer = () => {

    const [activePanel, setActivePanel] = useState(null);

    const CHAT_PANEL = 'CHAT_PANEL';
    const ONLINE_PANEL = 'ONLINE_PANEL';
    const STREAM_PANEL = 'STREAM_PANEL';

    const panelContents = {
        [CHAT_PANEL] : () => <p>This is a Chat Panel</p>,
        [ONLINE_PANEL] : () => <p>This is a Online Panel</p>,
        [STREAM_PANEL] : () => <p>This is a Stream Panel</p>
    };

    const CurrentPanel = panelContents[activePanel];

    return (
    <SubHeader>
        <FlexRow>
            <SocialGroup onClick={() => setActivePanel(CHAT_PANEL)} >
                <LobbyFont>Chat</LobbyFont>
                <ChatMod/>
            </SocialGroup>
            <SocialGroup onClick={() => setActivePanel(ONLINE_PANEL)} >
                <LobbyFont>Online</LobbyFont>
                <UsersMod/>
            </SocialGroup>
            <SocialGroup onClick={() => setActivePanel(STREAM_PANEL)} >
                <LobbyFont>Streams</LobbyFont>
                <VideoMod/>
            </SocialGroup>
            {activePanel && (
                <DropWindow id='dropWindow' className='animated slideInLeft faster'   >
                    <DeleteThis>
                        <CurrentPanel/>
                    </DeleteThis>
                </DropWindow>
             )}
        </FlexRow>
    </SubHeader>
    );
};

export default SubHeaderContainer;