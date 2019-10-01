//Class imports
import React, { useState, useCallback, useEffect } from "react";
import useWebSocket from "react-use-websocket";
import {
  IconWrapper,
  IconImage,
  ClassTorso,
  LobbyTooltip,
  IconContainer,
  ClassQuantity
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
            let numOfPlayers = (value.unassigned + value.assigned) - value.assigned;
            return(
              <>
                <IconWrapper addSelect={loggedIn === false || numOfPlayers === 0 ? false : true} id={value.name} onClick={() => loggedIn === false || numOfPlayers === 0 ? '' : handleClickChooseClass(value.name, playerData)} disabled={readyState !== CONNECTION_STATUS_OPEN} key={key}>
                  <IconImage icon imageUrl={classArray[key].icon}/>
                  {( loggedIn === false || numOfPlayers === 0 ? '' : <LobbyTooltip>{classArray[key].name}</LobbyTooltip>)}
                  <ClassTorso src={classArray[key].torso}/>
                </IconWrapper>
                <ClassQuantity classQuantity={numOfPlayers}/>
              </>
            )
          })
        }
      </IconContainer>
    </>
  );
};

export default ClassSelection;
