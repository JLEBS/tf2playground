import React, {useState, useCallback, useEffect, useMemo}  from 'react';
import styled from 'styled-components';
import LobbyContainer from '../components/matchmaking/lobby-panel';
import {LobbySpectators, LobbyParent} from '../components/matchmaking/lobby-elements';
import ClassSelection from '../components/matchmaking/choose-class';
import useWebSocket from 'react-use-websocket';

const CONNECTION_STATUS_CONNECTING = 0;
const CONNECTION_STATUS_OPEN = 1;
const CONNECTION_STATUS_CLOSING = 2;
const CONNECTION_STATUS_CLOSED = 3;

const ClassSelectionContainer = styled.div`
  height: 100%;
  padding-left: 32px;
  padding-right: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ClassDiv = ({loading, playerData}) => {
  return (
    <LobbyParent unset>    
      <ClassSelectionContainer>  
        {console.log('kjbdkjsbfd', playerData)}
        {!loading && !playerData && (
          <>
            <ClassSelection loggedIn={false} playerData={playerData}/> 
          </>
        )}
        {loading === false && playerData && (
          <>   
            <ClassSelection loggedIn={true} playerData={playerData}/> 
          </>
        )}
      </ClassSelectionContainer>
    </LobbyParent>
  );
}

const LobbyPage = ({loading, playerData}) => {

  const [socketUrl, setSocketUrl] = useState('ws://localhost:4000'); //Set Websocket URL
  const [messageHistory, setMessageHistory] = useState([]);
  const [playerDetails, setPlayerDetails] = useState(null);
  const [sendMessage, currentLobby, readyState] = useWebSocket(socketUrl);
  const [lobbyData, setLobbyData] = useState(null);
  

  const connectionStatus = {
    [CONNECTION_STATUS_CONNECTING]: 'Connecting',
    [CONNECTION_STATUS_OPEN]: 'Open',
    [CONNECTION_STATUS_CLOSING]: 'Closing',
    [CONNECTION_STATUS_CLOSED]: 'Closed',
  }[readyState];

  //Use multiple useeffect https://reactjs.org/docs/hooks-effect.html#tip-use-multiple-effects-to-separate-concerns
  useEffect(() => {

    if(connectionStatus === 'Open'){
      setMessageHistory(prev => prev.concat(currentLobby));
    }

  }, [connectionStatus, currentLobby]);
  
  return (
    <LobbyParent>
      {console.log('loading', loading, 'playerdata', playerData)}
      <ClassDiv loading={loading} playerData={playerData}/>
      <LobbyContainer lobbyData={currentLobby}/>
      <LobbySpectators className='lobby-spectators'/>
    </LobbyParent>
  )
};

export default LobbyPage;       

  // const handleClickChangeSocketUrl = useCallback(() => setSocketUrl('ws://localhost:4000/echo'), []);
  // const handleClickSendMessage = useCallback(() => sendMessage(this.target.value), []);
  


      // if (currentLobby !== null) {
      // setLobbyData(currentLobby);
    // }
    //Get user details ready to add to lobby
    // if(!loading && playerData){
    //   const player = playerData.data;
    //   const playerDetailsObj = { details: { steamId: player.steam64Id, name: player.personname, numGames: 24, playtime: player.playtime }, classId: null };
    //   setPlayerDetails(playerDetailsObj);
    // }
    // if (currentLobby !== null && playerDetails) {
    //   setLobbyData(LOBBY_TEST);
    // }