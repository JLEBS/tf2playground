//Class imports
import React, { useState, useCallback, useEffect } from "react";
import useWebSocket from "react-use-websocket";
import {
  IconWrapper,
  IconImage,
  ClassTorso,
  LobbyTooltip,
  IconContainer,
  ClassQuantity,
  TestButtons,
  LobbyParent,
  ClassSelectionContainer
} from "./lobby-elements";
import { ClassImages, ClassSounds } from "./class-array";

const CONNECTION_STATUS_CONNECTING = 0;
const CONNECTION_STATUS_OPEN = 1;
const CONNECTION_STATUS_CLOSING = 2;
const CONNECTION_STATUS_CLOSED = 3;

const ClassSelection = ({ playerData, lobbyData }) => {

  const [sendMessage, lastMessage, readyState] = useWebSocket("ws://localhost:4000");
  const handlePlayerInfo = useCallback(data => {
    return sendMessage(JSON.stringify(data));
  }, []);

  console.log(lastMessage, 'testing this')

  const handleClickChooseClass = (character, userDetails) => {
    handlePlayerInfo({  
      [userDetails.steam64Id]: {
        name: userDetails.personname,
        numGames: 18,
        classId: character,
        ready: 0
      }
    });

    new Audio(ClassSounds[character]).play();
    return;
  };

  return (
    <>
      <IconContainer>
        {Object.entries(lobbyData.classes).map(([key, value]) => {
          let numOfPlayers = value.unassigned + value.assigned - value.assigned;
          return (
            <div style={{ position: "relative" }} key={key}>
              <IconWrapper
                addSelect={
                  playerData === false ||
                  numOfPlayers === 0
                    ? false
                    : true
                }
                id={value.name}
                onClick={() =>
                  playerData === false || 
                  !numOfPlayers === 0
                    ? ""
                    : handleClickChooseClass(key, playerData.data)
                }
                disabled={readyState !== CONNECTION_STATUS_OPEN}
              >
                <IconImage icon imageUrl={ClassImages[key].icon} />
                {playerData === false || numOfPlayers === 0 ? (
                  ""
                ) : (
                  <LobbyTooltip>{ClassImages[key].name}</LobbyTooltip>
                )}
                <ClassTorso src={ClassImages[key].torso} />
              </IconWrapper>
              <ClassQuantity classQuantity={numOfPlayers} />
            </div>
          );
        })}
      </IconContainer>
    </>
  );
};

const LobbyClassSelection = ({ loading, playerData, lobbyData }) => {

  // const [sendReadyState, readyState] = useWebSocket(
  //   "ws://localhost:4000"
  // );

  console.log('dd');

  const chooseState = [
    "Loading Data",
    "Please login",
    "Choose class",
    "Game full",
    "Ingame"
  ];

  const [loadState, setLoadState] = useState([chooseState[0], false]);


  const updatePlayerState = (lobbyState, steamId, readyState) => {

    const player = {};

    player.steamId = steamId;
    //When Lobby is filling (pre ready and remove)
    if(lobbyState === 0){
      if(readyState === 1){
        console.log(player, 'player is pre-readying...')
      }
      else{
        console.log(player, 'player is leaving...')
      }
      player.ready = readyState;
    }

    //When lobby is full (ready and abandon)
    else{
      if(readyState === 1){
        console.log(player, 'player is ready in lobby...')
      }
      else{
        console.log(player, 'player is going to abandon the lobby...')
      }
      player.ready = readyState;
    }
   return player;
  }
  
  const playerAdded = lobbyData.players.find(function(element) {
    if (loading || !playerData) {
      return false;
    }
    return Object.keys(element)[0] === playerData.data.steam64Id;
  });



  useEffect(() => {

    //Wait until player fetch request has finished loading &&
    //Wait until lobbydata has returned (id means assigned)
    if (!loading && lobbyData.lobbyId) {

      //Checks lobby is not full
      if (lobbyData.lobbyState === 1 && !playerAdded) {
        setLoadState([chooseState[3], false]);

      } else {

        //Player is not logged in
        if (!playerData) {
          setLoadState([chooseState[1], false]);
        }
        //Player Is logged in
        else {
         if(playerData.data.personstate === 2 || lobbyData.lobbyState === 2 ){
          setLoadState([chooseState[4], false]);
         }
         else{
          if (playerAdded) {
            setLoadState([  
              <TestButtons>
                <button onClick={() => updatePlayerState(lobbyData.lobbyState, playerData.data.steam64Id, 1)}>{lobbyData.lobbyState === 0 ? 'pre-ready' : 'ready up'}</button>
                <button onClick={() => updatePlayerState(lobbyData.lobbyState , playerData.data.steam64Id, null)}>{lobbyData.lobbyState === 0 ? 'remove' : 'abandon'}</button>
              </TestButtons>
              , false]);

          } else {
            setLoadState([chooseState[2], playerData]);
          }}
        }
      }
    }
  }, [loading, playerData, lobbyData, playerAdded]);
  return (
    <LobbyParent unset>
      <ClassSelectionContainer>
        <p>{loadState[0]}</p>
        <ClassSelection playerData={loadState[1]} lobbyData={lobbyData} />
      </ClassSelectionContainer>
    </LobbyParent>
  );
}


export default LobbyClassSelection;
