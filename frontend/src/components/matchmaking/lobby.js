//Class imports
import React, {useState, useCallback, useEffect, useRef} from 'react';
import useWebSocket from 'react-use-websocket';
import styled, {css} from 'styled-components';
import scout from './../../assets/imgs/icons/classes/scout.png';
import pocketScout from './../../assets/imgs/icons/classes/pocketScout.png';
import soldier from './../../assets/imgs/icons/classes/soldier.png';
import pocketSoldier from './../../assets/imgs/icons/classes/pocketSoldier.png';
import demo from './../../assets/imgs/icons/classes/demo.png';
import medic from './../../assets/imgs/icons/classes/medic.png';

const CONNECTION_STATUS_CONNECTING = 0;
const CONNECTION_STATUS_OPEN = 1;
const CONNECTION_STATUS_CLOSING = 2;
const CONNECTION_STATUS_CLOSED = 3;

const ClassContainer = styled.button`
  background-color: white;
  padding: 4px;
  border: 2px solid grey;
  border-radius: 20px;
  position: relative;
  transition: all 0.3s ease-in-out;

  &:hover{
    background-color: #1C9523;
    border: 2px solid white;
  }
`;

const ClassInstance = styled.span`
    ${props => `background-image: url(${props.imageUrl});`};
    background-repeat: no-repeat;
    background-size: contain;
    display:block;

    ${props => props.icon && css`{
        height: 24px;
        width: 24px;
    `}
`;

const ClassQuantity = styled.span`
  color: black;
  font-size: 14px;
  font-weight: bold;
  line-height: 12px;
  border: 1px solid #FF5722;
  border-radius: 10px;
  height: 13px;
  width: 13px;
  position: absolute;
  display: block;
  text-align: center;
  top: -4px;
  right: -7px;
  background-color: white;
`;

const ClassSelection = () => {

  const CLASSES = [
    {   
      id: 1,
      name: 'pocket scout',
      shortname: 'pocket scout',
      image: pocketScout,
    },
    {
      id: 2,
      name: 'flank scout',
      shortname: 'flank scout',
      image: scout,
    },
    {
      id: 3,
      name: 'pocket soldier',
      shortname: 'pocket',
      image: pocketSoldier
    },
    {
      id: 4,
      name: 'roaming soldier',
      shortname: 'roamer',
      image: soldier
    },
    {
      id: 5,
      name: 'demoman',
      shortname: 'demo',
      image: demo
    },
    {
      id: 6,
      name: 'medic',
      shortname: 'medic',
      image: medic
    }
  ];

  const [socketUrl, setSocketUrl] = useState('ws://localhost:4000'); //Public API that will echo messages sent to it back to the client
  const [messageHistory, setMessageHistory] = useState([]);
  const [sendMessage, lastMessage, readyState] = useWebSocket(socketUrl);
  const handleClickChangeSocketUrl = useCallback(() => setSocketUrl('ws://localhost:4000/echo'), []);
  const handleClickSendMessage = useCallback(() => sendMessage('Class clicked'), []);
 
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
      {CLASSES.map((character, i) => (
        <ClassContainer onClick={handleClickSendMessage} disabled={readyState !== CONNECTION_STATUS_OPEN} key={i}>
          <ClassInstance icon imageUrl={character.image}/>
          <ClassQuantity>2</ClassQuantity>
        </ClassContainer>
      ))}
    </>
  )
}

export default ClassSelection;