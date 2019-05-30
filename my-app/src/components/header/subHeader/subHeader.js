import React, {useState} from 'react';
import styled, {css, keyframes} from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import Colors from '../../../misc/colors';
import { LobbyFont } from '../../../misc/fonts';
import {MarginContainer} from '../../structure/containers';
import { ReactComponent as Users } from './../../../assets/imgs/icons/svgs/users_solid.svg';
import { ReactComponent as Video } from './../../../assets/imgs/icons/svgs/video_solid.svg';
import { ReactComponent as Chat } from './../../../assets/imgs/icons/svgs/comments_solid.svg';
import posed, {PoseGroup, Transition} from 'react-pose';

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
    display:flex;
    flex-direction:row;
`;

const SocialGroup = styled.button`
    display: flex;
    flex-direction: row;
    cursor: pointer;
    padding: 1rem 2rem 1rem 2rem;
    align-items: center;
    opacity: 0.8;
    transition: background-color 0.4s ease;

    :hover{
        opacity: 1;
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

const DropWindow = styled.div`
    background-color: ${Colors.standard.secondary};
    // width: 100%;
    // max-width: 487px;
    width: 487px;
    padding-top:50px;
    padding-bottom: 50px;
    position: absolute;
    top: 57px;
    left: -787px;
    z-index:-3;
    color: white;
`;

const DeleteThis = styled.div`
    height:500px;
`;

const BackgroundOverlay = styled.div`
    height: 100vh;
    width: 100vw;
    background-color: #000000b8;
    position: absolute;
    z-index: 2;
    cursor: w-resize;
`;

const Box = posed.div({
    enter: {
        transition: { duration: 400 },
        x:300
    },
    exit: {
        transition: { duration: 400 },
        x: 0
    }
  });

const SubHeaderContainer = () => {

    const CHAT_PANEL = 'CHAT_PANEL';
    const ONLINE_PANEL = 'ONLINE_PANEL';
    const STREAM_PANEL = 'STREAM_PANEL';

    //Old
    // let SLIDEIN = 'animated slideInLeft faster';
    // let SLIDEOUT = 'animated slideOutLeft faster';
    // let FADEIN = 'animated fadeIn faster';
    // let FADEOUT = 'animated fadeOut faster';

    // const TRANSITIONIN;
    // const TRANSITIONOUT;

    //New
    // SLIDEIN = 'chat-window-enter';
    // SLIDEOUT = 'chat-window-exit';
    // FADEIN = 'chat-window-enter';
    // FADEOUT = 'chat-window-exit-active';
  
    const [activePanel, setActivePanel] = useState(CHAT_PANEL);
    const [ panelOpen, setPanelOpen ] = useState(false);

    // const currentAnimation = panelOpen ? SLIDEIN : SLIDEOUT;

    // const fadeIn = panelOpen ? FADEIN : FADEOUT;

    const panelContents = {
        [CHAT_PANEL] : () => <p>This is a Chat Panel</p>,
        [ONLINE_PANEL] : () => <p>This is a Online Panel</p>,
        [STREAM_PANEL] : () => <p>This is a Stream Panel</p>
    };

    const CurrentPanel = panelContents[activePanel];

    const openPanel = panel => {
        setPanelOpen(true)
        setActivePanel(panel)
    }

    const closePanel = panel => {
        setPanelOpen(false)
    }
 
    return (
        <>
            <SubHeader>
              
                <SocialGroup active={activePanel === CHAT_PANEL && panelOpen === true} onClick={() => openPanel(CHAT_PANEL)} >
                    <LobbyFont>Chat</LobbyFont>
                    <ChatMod/>
                </SocialGroup>
                <SocialGroup active={activePanel === ONLINE_PANEL && panelOpen === true} onClick={() => openPanel(ONLINE_PANEL)} >
                    <LobbyFont>Online</LobbyFont>
                    <UsersMod/>
                </SocialGroup>
                <SocialGroup active={activePanel === STREAM_PANEL && panelOpen === true} onClick={() => openPanel(STREAM_PANEL)} >
                    <LobbyFont>Streams</LobbyFont>
                    <VideoMod/>
                </SocialGroup>
                <PoseGroup>
                    { panelOpen && (
                        <Box key='model'>
                            <DropWindow >
                                <DeleteThis>
                                    <CurrentPanel/>
                                </DeleteThis>
                            </DropWindow>
                        </Box>
                    )}
                </PoseGroup>
             
            </SubHeader>
            {/* {panelOpen && (
                <BackgroundOverlay onClick={() => closePanel()}/>
            )} */}
            { panelOpen && (
            
                <div active={activePanel == true && panelOpen === true}>
                    <BackgroundOverlay  onClick={() => closePanel()}/>
                </div>
         

            )}
        </>
    );
};

export default SubHeaderContainer;