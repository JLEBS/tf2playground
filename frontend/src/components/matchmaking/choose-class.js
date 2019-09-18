//Class imports
import React, {useState, useCallback, useEffect, useRef} from 'react';
import useWebSocket from 'react-use-websocket';
import {IconWrapper, IconImage, ClassTorso} from './lobby-elements';
import classSelectionArray from './class-array';

const CONNECTION_STATUS_CONNECTING = 0;
const CONNECTION_STATUS_OPEN = 1;
const CONNECTION_STATUS_CLOSING = 2;
const CONNECTION_STATUS_CLOSED = 3;

const ClassSelection = ({myFunction}) => {

  const [socketUrl, setSocketUrl] = useState('ws://localhost:4000'); //Public API that will echo messages sent to it back to the client
  const [messageHistory, setMessageHistory] = useState([]);
  const [sendMessage, lastMessage, readyState] = useWebSocket(socketUrl);
  const handleClickChangeSocketUrl = useCallback(() => setSocketUrl('ws://localhost:4000/echo'), []);
  const handleClickSendMessage = useCallback(() => sendMessage('clicked successfully'), []);

  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory(prev => prev.concat(lastMessage));
    }
  }, [lastMessage]);

  const connectionStatus = {
    [CONNECTION_STATUS_CONNECTING]: 'Connecting',
    [CONNECTION_STATUS_OPEN]: 'Open',
    [CONNECTION_STATUS_CLOSING]: 'Closing',
    [CONNECTION_STATUS_CLOSED]: 'Closed',
  }[readyState];

  return (
    <>
      {classSelectionArray.map((character, i) => (
        <IconWrapper addSelect id={character.name} onClick={() => myFunction(character.id)} /*onClick={handleClickSendMessage}*/ disabled={readyState !== CONNECTION_STATUS_OPEN} key={i}>
         <IconImage classQuantity icon imageUrl={character.icon}/>
          <ClassTorso src={character.torso}/>
        </IconWrapper>
      ))}
    </>
  )
}

export default ClassSelection;