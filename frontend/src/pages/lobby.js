import React, {useState, useCallback, useEffect}  from 'react';
import LobbyContainer from '../components/matchmaking/lobby-panel';
import {LobbyHeading, LobbySpectators, LobbyParent} from '../components/matchmaking/lobby-elements';

import useWebSocket from 'react-use-websocket';

const CONNECTION_STATUS_CONNECTING = 0;
const CONNECTION_STATUS_OPEN = 1;
const CONNECTION_STATUS_CLOSING = 2;
const CONNECTION_STATUS_CLOSED = 3;

//const maintoken = Cookies.get("steamIdAuth"); 
//const steamtoken = Cookies.get('steamUserID');
const LobbyPage = ({selectedClass, playerData}) => {

  const [socketUrl, setSocketUrl] = useState('ws://localhost:4000'); //Public API that will echo messages sent to it back to the client
  const [messageHistory, setMessageHistory] = useState([]);
  const [sendMessage, lastMessage, readyState] = useWebSocket(socketUrl);
  const handleClickChangeSocketUrl = useCallback(() => setSocketUrl('ws://localhost:4000/echo'), []);
  const handleClickSendMessage = useCallback(() => sendMessage(this.target.value), []);
 
  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory(prev => prev.concat(lastMessage));

      console.log(lastMessage);
    }
  }, [lastMessage]);
 
  const connectionStatus = {
    [CONNECTION_STATUS_CONNECTING]: 'Connecting',
    [CONNECTION_STATUS_OPEN]: 'Open',
    [CONNECTION_STATUS_CLOSING]: 'Closing',
    [CONNECTION_STATUS_CLOSED]: 'Closed',
  }[readyState];
 
  return (
    <LobbyParent>
      <LobbyHeading/>
        <LobbyContainer selectedClass={selectedClass} playerData={playerData}/>
      <LobbySpectators/>
    </LobbyParent>
  )
};

export default LobbyPage;       

/* {console.log(playerData, 'is it loading')}
<button onClick={handleClickChangeSocketUrl}>Click Me to sdadad Socket Url</button>
<button onClick={handleClickSendMessage} disabled={readyState !== CONNECTION_STATUS_OPEN}>Click Me to send 'Hello'</button>
<span>The WebSocket is currently {connectionStatus}</span>
{lastMessage && (
    <span>Last message:{lastMessage.data}</span>
)}
<ul>
    {messageHistory.map((message, idx) => <span key={idx}>{message.data}</span>)}
</ul> */