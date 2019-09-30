//Class imports
import React, {useState, useCallback, useEffect, useRef} from 'react';
import useWebSocket from 'react-use-websocket';
import {IconWrapper, IconImage, ClassTorso, LobbyTooltip, IconContainer} from './lobby-elements';
import classSelectionArray from './class-array';

const CONNECTION_STATUS_CONNECTING = 0;
const CONNECTION_STATUS_OPEN = 1;
const CONNECTION_STATUS_CLOSING = 2;
const CONNECTION_STATUS_CLOSED = 3;

const ClassSelection = ({loggedIn, playerData}) => {

  const [socketUrl, setSocketUrl] = useState('ws://localhost:4000'); //Public API that will echo messages sent to it back to the client
  const [messageHistory, setMessageHistory] = useState([]);
  const [sendMessage, lastMessage, readyState] = useWebSocket(socketUrl);
  const handleClickChangeSocketUrl = useCallback(() => setSocketUrl('ws://localhost:4000/echo'), []);
  const handlePlayerInfo = useCallback((data) => sendMessage(data), []);

  const handleClickChooseClass = (character, userDetails) => {

    const chosenClassPick = {
      details: {
        steamId: userDetails.steam64Id,
        name: userDetails.personnane,
      },
      class: character
    }
    handlePlayerInfo({
      chosenClassPick
    });
    return;
  }

  return (
    <>
      <p>{loggedIn === false ? 'Please login' : 'Choose class' }</p>
      <IconContainer>
        {classSelectionArray.map((character, i) => (
          <IconWrapper addSelect={loggedIn} id={character.name} onClick={() => loggedIn === false ? '' : handleClickChooseClass(character.name, playerData)} disabled={readyState !== CONNECTION_STATUS_OPEN} key={i}>
            <IconImage classQuantity icon imageUrl={character.icon}/>
            <LobbyTooltip>{loggedIn === false ? 'Please login' : character.name }</LobbyTooltip>
            <ClassTorso src={character.torso}/>
          </IconWrapper>
        ))}
      </IconContainer>
    </>
  )
}

export default ClassSelection;