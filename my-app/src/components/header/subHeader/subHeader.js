import React, {useState} from 'react';
import styled, {css, keyframes} from 'styled-components';
import { CSSTransition } from 'react-transition-group';
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

const grow = keyframes`
    from {
        transform: scale(1);
    }

    to {
        transform: scale(1.1);
    }
`;

const fade = keyframes`
    from {
        opacity: 0;
    }

    to {
        opacity: 0.7;
    }
`;

const SocialGroup = styled.button`
    display: flex;
    flex-direction: row;
    cursor: pointer;
    padding: 1rem 2rem 1rem 2rem;
    align-items: center;
    opacity: 0.8;

    :hover{
        opacity: 1;

        & > * {
         
        }
    }

    ${props => props.active && css`
        opacity: 1;
        color: ${Colors.standard.primary};
        background-color: ${Colors.standard.secondary};
    `}

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
    left:0px;
    z-index:-3;
    color: white;
`;

const DeleteThis = styled.div`
    height:500px;
`;

const HidePanelDiv = styled.div`
    position: absolute;
    height: 100vh;
    width: 100vw;
    top: 0px;
    cursor: w-resize    ;
`;

const TestDiv = styled.div`
    height: 100vh;
    width: 100vw;
    background-color: black;
    opacity: 0.7;
    position: absolute;
    display: block;
    animation: ${fade} 2s forward;
    z-index: 2;
`;

const SubHeaderContainer = () => {
  
    const [activePanel, setActivePanel] = useState(null);
    
    const CHAT_PANEL = 'CHAT_PANEL';
    const ONLINE_PANEL = 'ONLINE_PANEL';
    const STREAM_PANEL = 'STREAM_PANEL';

    const SLIDEIN = 'animated slideInLeft faster';
    const SLIDEOUT = 'animated slideOutLeft faster';

    const currentAnimation = activePanel ? SLIDEIN : SLIDEOUT;

    const panelContents = {
        [CHAT_PANEL] : () => <p>This is a Chat Panel</p>,
        [ONLINE_PANEL] : () => <p>This is a Online Panel</p>,
        [STREAM_PANEL] : () => <p>This is a Stream Panel</p>
    };

    const CurrentPanel = panelContents[activePanel];

    const TestFunction = () => {
        setActivePanel(null);
    }
 
    return (
    <div>
        <SubHeader>
            <FlexRow>
                <SocialGroup active={activePanel === CHAT_PANEL} onClick={() => setActivePanel(CHAT_PANEL)} >
                    <LobbyFont>Chat</LobbyFont>
                    <ChatMod/>
                </SocialGroup>
                <SocialGroup active={activePanel === ONLINE_PANEL} onClick={() => setActivePanel(ONLINE_PANEL)} >
                    <LobbyFont>Online</LobbyFont>
                    <UsersMod/>
                </SocialGroup>
                <SocialGroup active={activePanel === STREAM_PANEL} onClick={() => setActivePanel(STREAM_PANEL)} >
                    <LobbyFont>Streams</LobbyFont>
                    <VideoMod/>
                </SocialGroup>
                {activePanel && (
                    <div>    
                        <DropWindow className={`${currentAnimation}`} >
                            <DeleteThis>
                                <CurrentPanel/>
                            </DeleteThis>
                        </DropWindow>
                        <HidePanelDiv onClick={() => TestFunction()}/>
                    </div>
                )}
            </FlexRow>
        </SubHeader>
        {activePanel && (
            <TestDiv/>
        )}
    </div>
    );
};

export default SubHeaderContainer;