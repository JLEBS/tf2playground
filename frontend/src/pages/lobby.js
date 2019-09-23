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
const LobbyPage = () => {

  const LOBBY_TEST = {
    lobbyId: 11,
    players: [
      { details: { steamId: '76561198018959029', name: 'JLEBS', numGames: 23, playtime: 2828 }, classId: 2 },
      { details: { steamId: '76561198028929109', name: 'master splinter', numGames: 241, playtime: 9373 }, classId: 3 },
      { details: { steamId: '76561198193511414', name: 'andy mandy', numGames: null, playtime: 63431 }, classId: 4 },
    ]
  }

  const [socketUrl, setSocketUrl] = useState('ws://localhost:4000'); //Public API that will echo messages sent to it back to the client
  const [messageHistory, setMessageHistory] = useState([]);
  const [sendMessage, lastMessage, readyState] = useWebSocket(socketUrl);
  const handleClickChangeSocketUrl = useCallback(() => setSocketUrl('ws://localhost:4000/echo'), []);
  const handleClickSendMessage = useCallback(() => sendMessage(this.target.value), []);
  const [lobbyData, setLobbyData] = useState(LOBBY_TEST);

  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory(prev => prev.concat(lastMessage));
      setLobbyData(lastMessage);
      //fetch here
    console.log('Original Data :)', lobbyData);
    }
  }, [lastMessage]);
 
  return (
    <LobbyParent>
      <LobbyHeading className='lobby-play-count'/>
        <LobbyContainer className='lobby-slot-parent' lobbyData={lobbyData}/>
      <LobbySpectators className='lobby-spectators'/>
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