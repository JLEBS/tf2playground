import React, {useState, useCallback, useEffect}  from 'react';
import styled, {css} from 'styled-components';
import useWebSocket from 'react-use-websocket';
import ClassSelection from '../../matchmaking/lobby';
import {LobbyFont} from '../../../misc/fonts';
import { ReactComponent as Clock } from '../../../assets/imgs/icons/svgs/clock.svg';
import { ReactComponent as Fist } from '../../../assets/imgs/icons/svgs/fist.svg';

const CONNECTION_STATUS_CONNECTING = 0;
const CONNECTION_STATUS_OPEN = 1;
const CONNECTION_STATUS_CLOSING = 2;
const CONNECTION_STATUS_CLOSED = 3;

const LobbyPanel = styled.div`
    background-color: black;
    color: white;
    width: 100%;
    max-width: 464px;
    float: right;
`;

const ClassContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const LobbyRectangle = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 400px;
    width: 100%;
    background-color: black;
    color: white;
    padding: 14px 32px 14px 32px;
    ${props => props.fixed && css`
        position: fixed;
    `}
`;

const Grey = styled.button`
    height: 32px;
    width: 32px;
    background-color: #4F4F4F;
    border-radius:20px;
`;

const NumGames = styled(Fist)`
    width: 16px;
    margin-right: 6px;
    margin-left: 6px;
`;

const TotalHours = styled(Clock)`
    width: 16px;
    margin-right: 6px;
    margin-left: 6px;
`;

const LobbyData = styled.div`
    font-size: 14px;
`;

const IncrimentCounter = styled.div`
    background-color: white
    color: black;
    padding: 4px 13px 4px 13px;
    border-radius: 16px;
    min-width: 42px;
    text-align:center;
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
          
            <LobbyRectangle fixed>
                <LobbyFont>Waiting for players to join lobby...</LobbyFont>
                <IncrimentCounter>
                    <LobbyFont>0/12</LobbyFont>
                </IncrimentCounter>
            </LobbyRectangle>
            
            <div>
                {arrayCreate().map((object, i) => 
                    <LobbyRectangle obj={object} key={i} >
                        
                        <Grey/>
                        <LobbyFont>Waiting...</LobbyFont>
                        <ClassContainer>
                            <span>
                                <NumGames/>
                                <LobbyData>18</LobbyData>
                            </span>
                            <span>
                                <TotalHours/>
                                <LobbyData>3829</LobbyData>
                            </span>
                        </ClassContainer>
                    </LobbyRectangle>
                )}
            </div>
            <LobbyRectangle>
                <LobbyFont>View Spectators</LobbyFont>
            </LobbyRectangle>

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