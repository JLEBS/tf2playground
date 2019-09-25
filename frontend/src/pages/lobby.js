import React, {useState, useCallback, useEffect, useMemo}  from 'react';
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
      { details: null, classId: null},
      { details: null, classId: null},
      { details: null, classId: null},
      { details: null, classId: null},
      { details: null, classId: null},
      { details: null, classId: null},
      { details: null, classId: null},
      { details: null, classId: null},
      { details: null, classId: null},
      { details: null, classId: null},
      { details: null, classId: null},
      { details: null, classId: null}
    ]
  }

  // const options = useMemo(() => ({
  //   share: true,
  //   onMessage: message => console.log(`onMessage with access to `, message),
  //   onClose: event => console.log('onClose', event),
  //   onError: error => console.log('onError', error),
  //   onOpen: event => console.log('onOpen', event),
  //   fromSocketIO: true,
  //   queryParams: { 'user_id': 1 },
  // }),[]);

  const [socketUrl, setSocketUrl] = useState('ws://localhost:4000'); //Set Websocket URL
  const [messageHistory, setMessageHistory] = useState([]);
  const [sendMessage, currentLobby, readyState] = useWebSocket(socketUrl);
  
  // const handleClickChangeSocketUrl = useCallback(() => setSocketUrl('ws://localhost:4000/echo'), []);
  // const handleClickSendMessage = useCallback(() => sendMessage(this.target.value), []);
  const [lobbyData, setLobbyData] = useState(LOBBY_TEST);

  const connectionStatus = {
    [CONNECTION_STATUS_CONNECTING]: 'Connecting',
    [CONNECTION_STATUS_OPEN]: 'Open',
    [CONNECTION_STATUS_CLOSING]: 'Closing',
    [CONNECTION_STATUS_CLOSED]: 'Closed',
  }[readyState];
 

  useEffect(() => {
    if(connectionStatus === 'Open'){
      setMessageHistory(prev => prev.concat(currentLobby));
      console.log('message', currentLobby)
    }
    if (currentLobby !== null) {
      setLobbyData(currentLobby);
      //fetch here
    console.log('Original Data :)', lobbyData);
    }
    else {
      console.log('nothing to see here')
    }
  }, [connectionStatus, currentLobby]);


  return (
    <LobbyParent>
       {console.log(`The WebSocket is currently ${connectionStatus}`)}
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
{currentLobby && (
    <span>Last message:{currentLobby.data}</span>
)}
<ul>
    {messageHistory.map((message, idx) => <span key={idx}>{message.data}</span>)}
</ul> */