//Class imports
import React, { useState, useCallback, useEffect, useRef } from "react";
import useWebSocket from "react-use-websocket";
import {
  IconWrapper,
  IconImage,
  ClassTorso,
  LobbyTooltip,
  IconContainer
} from "./lobby-elements";

const CONNECTION_STATUS_CONNECTING = 0;
const CONNECTION_STATUS_OPEN = 1;
const CONNECTION_STATUS_CLOSING = 2;
const CONNECTION_STATUS_CLOSED = 3;

const ClassSelection = ({ loggedIn, playerData, lobbyData, classArray }) => {
  const [socketUrl, setSocketUrl] = useState("ws://localhost:4000"); //Public API that will echo messages sent to it back to the client
  const [sendMessage, lastMessage, readyState] = useWebSocket(socketUrl);
  const handlePlayerInfo = useCallback(data => sendMessage(data), []);

  const handleClickChooseClass = (character, userDetails) => {
    const chosenClassPick = {
      details: {
        steamId: userDetails.steam64Id,
        name: userDetails.personnane
      },
      class: character
    };
    handlePlayerInfo({
      chosenClassPick
    });
    return;
  };


  return (
    <>
      <IconContainer>
        {
          Object.entries(lobbyData.classes).map(([key, value]) => {
      
            console.log('CLASSARRAY', classArray);

            console.log('ARRAYKEY', [key]);

            console.log('this should work honestly', classArray[key]);

            return(
              <IconWrapper addSelect={loggedIn} id={value.name} onClick={() => loggedIn === false ? '' : handleClickChooseClass(value.name, playerData)} disabled={readyState !== CONNECTION_STATUS_OPEN} key={key}>
              <IconImage classQuantity={(value.unassigned + value.assigned) - value.assigned} icon imageUrl={value.icon}/>
              <LobbyTooltip>{loggedIn === false ? 'Please login' : value.name }</LobbyTooltip>
              <ClassTorso src={value.torso}/>
              </IconWrapper>
            )
          }
          )}

        
      </IconContainer>
    </>
  );
};

export default ClassSelection;
{
  /* {classArray.map((character, i) => (
  <IconWrapper addSelect={loggedIn} id={character.name} onClick={() => loggedIn === false ? '' : handleClickChooseClass(character.name, playerData)} disabled={readyState !== CONNECTION_STATUS_OPEN} key={i}>
    <IconImage classQuantity={3} icon imageUrl={character.icon}/>
    <LobbyTooltip>{loggedIn === false ? 'Please login' : character.name }</LobbyTooltip>
    <ClassTorso src={character.torso}/>
  </IconWrapper>
))}*/
}
