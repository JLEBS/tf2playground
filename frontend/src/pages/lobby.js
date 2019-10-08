import React, { useState, useEffect, useMemo } from "react";
import LobbyContainer from "../components/matchmaking/lobby-panel";
import {
  LobbySpectators,
  LobbyParent
} from "../components/matchmaking/lobby-elements";
import LobbyClassSelection from "../components/matchmaking/choose-class";
import useWebSocket from "react-use-websocket";

const CONNECTION_STATUS_CONNECTING = 0;
const CONNECTION_STATUS_OPEN = 1;
const CONNECTION_STATUS_CLOSING = 2;
const CONNECTION_STATUS_CLOSED = 3;

const LobbyPage = ({ loading, playerData }) => {
  
  const [messageHistory, setMessageHistory] = useState([]);
  const options = useMemo(
    () => ({
      share: true
    }),
    []
  );

  const [sendMessage, currentLobby, readyState] = useWebSocket(
    "ws://localhost:4000",
    options
  );
  console.log('RANDO', loading, currentLobby)

  const [lobbyJson, decodeJson] = useState({
    lobbyId: null,
    lobbyState: 0,
    maxPlayer: 12,
    classes: {
      pocketScout: {
        unassigned: 2,
        assigned: 0
      },
      flankScout: {
        unassigned: 2,
        assigned: 0
      },
      pocketSoldier: {
        unassigned: 2,
        assigned: 0
      },
      roamerSoldier: {
        unassigned: 2,
        assigned: 0
      },
      demo: {
        unassigned: 2,
        assigned: 0
      },
      medic: {
        unassigned: 2,
        assigned: 0
      }
    },
    players: []
  });

  const connectionStatus = {
    [CONNECTION_STATUS_CONNECTING]: "Connecting",
    [CONNECTION_STATUS_OPEN]: "Open",
    [CONNECTION_STATUS_CLOSING]: "Closing",
    [CONNECTION_STATUS_CLOSED]: "Closed"
  }[readyState];

  //Use multiple useeffect https://reactjs.org/docs/hooks-effect.html#tip-use-multiple-effects-to-separate-concerns
  // useEffect(() => {
  //   if (connectionStatus === "Open") {
  //     setMessageHistory(prev => prev.concat(currentLobby));
  //   }
  // }, [connectionStatus, currentLobby]);

  useEffect(() => {
    if (currentLobby) {
      decodeJson(JSON.parse(currentLobby.data));
    }
  }, [currentLobby]);


  if (!currentLobby) return null;

  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <LobbyParent>
        {console.log("top of array", lobbyJson)}
        <LobbyClassSelection
          loading={loading}
          playerData={playerData}
          lobbyData={lobbyJson}
        />
        <LobbyContainer lobbyData={lobbyJson} />
        <LobbySpectators className="lobby-spectators" />
      </LobbyParent>
    </div>
  );
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
