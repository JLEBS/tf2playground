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
const LobbyPage = ({playerData, loading}) => {

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

  const [socketUrl, setSocketUrl] = useState('ws://localhost:4000'); //Set Websocket URL
  const [messageHistory, setMessageHistory] = useState([]);
  const [playerDetails, setPlayerDetails] = useState(null);
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

  //Use multiple useeffect https://reactjs.org/docs/hooks-effect.html#tip-use-multiple-effects-to-separate-concerns
  useEffect(() => {
    console.log(playerDetails, 'user in lobby');

    if(connectionStatus === 'Open'){
      setMessageHistory(prev => prev.concat(currentLobby));
            // setLobbyData(currentLobby);

      // console.log(currentLobby);
    }

      // if (currentLobby !== null) {
      // setLobbyData(currentLobby);
    // }
  
    //Get user details ready to add to lobby
    if(!loading && playerData){
      const player = playerData.data;
      const playerDetailsObj = { details: { steamId: player.steam64Id, name: player.personname, numGames: 24, playtime: player.playtime }, classId: null };
      setPlayerDetails(playerDetailsObj);
    }

    // if (currentLobby !== null && playerDetails) {
    //   setLobbyData(LOBBY_TEST);
    // }
  }, [connectionStatus, currentLobby, loading, playerData]);

  if (!currentLobby) return null
  
  return (
    <LobbyParent>
      <LobbyHeading className='lobby-play-count'/>
        <LobbyContainer className='lobby-slot-parent' lobbyData={currentLobby}/>
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