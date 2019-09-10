import React , {useState, useCallback, useEffect}  from 'react';
import styled from 'styled-components';
import Colors from '../../../misc/colors';
import useWebSocket from 'react-use-websocket';



const CONNECTION_STATUS_CONNECTING = 0;
const CONNECTION_STATUS_OPEN = 1;
const CONNECTION_STATUS_CLOSING = 2;
const CONNECTION_STATUS_CLOSED = 3;



// const LobbyContainer = styled.div`
//     max-width: 30
// `;

const ClassSelection = styled.div`

`;

const LobbyPanel = styled.div`
    background-color: black;
    color: white;
    width: 35%;
    float: right;
`;

const PlayerSlot = styled.button`

`;

const LobbyRectangle = styled.div`
    padding: 16px 32px 16px 32px;
`;


const LobbyContainer = () => {
    const [socketUrl, setSocketUrl] = useState('ws://localhost:4000'); //Public API that will echo messages sent to it back to the client
    const [messageHistory, setMessageHistory] = useState([]);
    const [sendMessage, lastMessage, readyState] = useWebSocket(socketUrl);
    const handleClickChangeSocketUrl = useCallback(() => setSocketUrl('ws://localhost:4000/echo'), []);
    const handleClickSendMessage = useCallback(() => sendMessage('Class clicked'), []);
   
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

    return (
        <LobbyPanel>
            <LobbyRectangle>
                <h1>Choose Class</h1>
                <button onClick={handleClickSendMessage} disabled={readyState !== CONNECTION_STATUS_OPEN}>Scout</button>
                <button onClick={handleClickSendMessage} disabled={readyState !== CONNECTION_STATUS_OPEN}>Scout</button>
                <button onClick={handleClickSendMessage} disabled={readyState !== CONNECTION_STATUS_OPEN}>Soldier</button>
                <button onClick={handleClickSendMessage} disabled={readyState !== CONNECTION_STATUS_OPEN}>Soldier</button>
                <button onClick={handleClickSendMessage} disabled={readyState !== CONNECTION_STATUS_OPEN}>Demo</button>
                <button onClick={handleClickSendMessage} disabled={readyState !== CONNECTION_STATUS_OPEN}>Medic</button>
            </LobbyRectangle>
            <LobbyRectangle>
                <h1>Waiting for players to join lobby...</h1>
                <div>0/12</div>
            </LobbyRectangle>
            <ClassSelection>
                <PlayerSlot></PlayerSlot>
               
                <span>The WebSocket is currently {connectionStatus}</span>
                {lastMessage && (
                    <span>Last message:{lastMessage.data}</span>
                )}
                <ul>
                    {messageHistory.map((message, idx) => <span key={idx}>{message.data}</span>)}
                </ul>
            </ClassSelection>
        </LobbyPanel>
    )
}

export default LobbyContainer