//Class imports
import React, { useState, useCallback } from "react";
import useWebSocket from "react-use-websocket";
import {
  IconWrapper,
  IconImage,
  ClassTorso,
  LobbyTooltip,
  IconContainer,
  ClassQuantity
} from "./lobby-elements";
import { ClassImages, ClassSounds } from "./class-array";

const CONNECTION_STATUS_CONNECTING = 0;
const CONNECTION_STATUS_OPEN = 1;
const CONNECTION_STATUS_CLOSING = 2;
const CONNECTION_STATUS_CLOSED = 3;

const ClassSelection = ({ playerData, lobbyData }) => {
  const [socketUrl, setSocketUrl] = useState("ws://localhost:4000"); //Public API that will echo messages sent to it back to the client
  const [sendMessage, lastMessage, readyState] = useWebSocket(socketUrl);
  const handlePlayerInfo = useCallback(data => {
    return sendMessage(JSON.stringify(data));
  }, []);

  const handleClickChooseClass = (character, userDetails) => {
    handlePlayerInfo({  
      [userDetails.steam64Id]: {
        name: userDetails.personname,
        numGames: 18,
        classId: character
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
                  numOfPlayers === 0
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

export default ClassSelection;
