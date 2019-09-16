import React, {useState, useCallback, useEffect}  from 'react';
import styled from 'styled-components';
import useWebSocket from 'react-use-websocket';
import ClassSelection from '../../matchmaking/lobby';
import {LobbyFont} from '../../../misc/fonts';
//import { ReactComponent as TF2Logo } from '../assets/imgs/icons/svgs/tf2-logo.svg';


const CONNECTION_STATUS_CONNECTING = 0;
const CONNECTION_STATUS_OPEN = 1;
const CONNECTION_STATUS_CLOSING = 2;
const CONNECTION_STATUS_CLOSED = 3;

const LobbyPanel = styled.div`
    background-color: black;
    color: white;
    width: 35%;
    float: right;
`;

const ClassContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const LobbyRectangle = styled.div`
    padding: 16px 32px 16px 32px;
`;

const PlayerSlot = styled.button`
    width: 100%;
    padding: 12px 32px 12px 32px;
    background-color: #1E1E1E;
    outline: 1px solid white;
    display: flex;
    justify-content: space-between;
    align-items:center;
    color: white;
`;

const Grey = styled.button`
    height: 32px;
    width: 32px;
    background-color: #4F4F4F;
    border-radius:20px;
`;

const LobbyContainer = () => {
    const [socketUrl, setSocketUrl] = useState('ws://localhost:4000'); //Public API that will echo messages sent to it back to the client
    const [messageHistory, setMessageHistory] = useState([]);
    const [sendMessage, lastMessage, readyState] = useWebSocket(socketUrl);

    useEffect(() => {
      if (lastMessage !== null) {
        setMessageHistory(prev => prev.concat(lastMessage));
      }
    }, [lastMessage]);
   
    const connectionStatus = {
      [CONNECTION_STATUS_CONNECTING]: 'Connecting',
      [CONNECTION_STATUS_OPEN]: 'Open',
      [CONNECTION_STATUS_CLOSING]: 'Closing',
      [CONNECTION_STATUS_CLOSED]: 'Closed',
    }[readyState];

    const arrayCreate = () => {
        const object = [0,1,2,3,4,5,6,7,8,9,10,11,12];
        return object;
    }
    return (
        <LobbyPanel>
            <LobbyRectangle>
                <ClassContainer>
                    <LobbyFont>Choose Class</LobbyFont>
                   <ClassSelection />
                </ClassContainer>           
            </LobbyRectangle>
            <LobbyRectangle>
                <ClassContainer>
                <LobbyFont>Waiting for players to join lobby...</LobbyFont>
                <LobbyFont>0/12</LobbyFont>
                </ClassContainer>           
            </LobbyRectangle>
                
                {arrayCreate().map((object, i) => 
                    <PlayerSlot obj={object} key={i} >
                        <Grey/>
                        <LobbyFont>Waiting...</LobbyFont>
                        <div>
                            <div>18</div>
                            <div>3829hr</div>
                        </div>
                    </PlayerSlot>
                )}

            <span>The WebSocket is currently {connectionStatus}</span>
            {lastMessage && (
                <span>Last message:{lastMessage.data}</span>
            )}
            <ul>
                {messageHistory.map((message, idx) => <span key={idx}>{message.data}</span>)}
            </ul>

        </LobbyPanel>
    )
}

export default LobbyContainer