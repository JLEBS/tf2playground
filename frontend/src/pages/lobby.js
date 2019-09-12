import React, {useState, useCallback, useEffect}  from 'react';
import LobbyContainer from './../components/profile/data-containers/class-selection';
import useWebSocket from 'react-use-websocket';

const CONNECTION_STATUS_CONNECTING = 0;
const CONNECTION_STATUS_OPEN = 1;
const CONNECTION_STATUS_CLOSING = 2;
const CONNECTION_STATUS_CLOSED = 3;

//const maintoken = Cookies.get("steamIdAuth"); 
//const steamtoken = Cookies.get('steamUserID');
const LobbyPage = () => {

  const [socketUrl, setSocketUrl] = useState('ws://localhost:4000'); //Public API that will echo messages sent to it back to the client
  const [messageHistory, setMessageHistory] = useState([]);
  const [sendMessage, lastMessage, readyState] = useWebSocket(socketUrl);
  const handleClickChangeSocketUrl = useCallback(() => setSocketUrl('ws://localhost:4000/echo'), []);
  const handleClickSendMessage = useCallback(() => sendMessage('Hello this worked'), []);
 
  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory(prev => prev.concat(lastMessage));

      console.log(lastMessage);
    }
  }, [lastMessage]);
 
  const connectionStatus = {
    [CONNECTION_STATUS_CONNECTING]: 'Connecting',
    [CONNECTION_STATUS_OPEN]: 'Open',
    [CONNECTION_STATUS_CLOSING]: 'Closing',
    [CONNECTION_STATUS_CLOSED]: 'Closed',
  }[readyState];
 
  return (
    <div>
      {/* {steamtoken && (
        <div>hello this worked</div>
      )} */}
      <LobbyContainer>
      <button onClick={handleClickChangeSocketUrl}>Click Me to change Socket Url</button>
      <button onClick={handleClickSendMessage} disabled={readyState !== CONNECTION_STATUS_OPEN}>Click Me to send 'Hello'</button>
      <span>The WebSocket is currently {connectionStatus}</span>
      {lastMessage && (
          <span>Last message:{lastMessage.data}</span>
      )}
      <ul>
          {messageHistory.map((message, idx) => <span key={idx}>{message.data}</span>)}
      </ul>
      </LobbyContainer>
    </div>
  )
};

export default LobbyPage;