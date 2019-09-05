import React, {useState, useCallback, useEffect} from 'react';
import { PageCenter, MarginContainer} from './../components/structure/containers';
import { Link, TitleLogo, Title } from '../misc/fonts';
import LoginBtn from '../components/buttons/steamBtn';
import useWebSocket from 'react-use-websocket';

const CONNECTION_STATUS_CONNECTING = 0;
const CONNECTION_STATUS_OPEN = 1;
const CONNECTION_STATUS_CLOSING = 2;
const CONNECTION_STATUS_CLOSED = 3;

const HomePage = () => {
const [socketUrl, setSocketUrl] = useState('ws://localhost:4000'); //Public API that will echo messages sent to it back to the client
  const [messageHistory, setMessageHistory] = useState([]);
  const [sendMessage, lastMessage, readyState] = useWebSocket(socketUrl);
 
  const handleClickChangeSocketUrl = useCallback(() => setSocketUrl('wss://demos.kaazing.com/echo'), []);
  const handleClickSendMessage = useCallback(() => sendMessage('Hello this worked'), []);
 
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
        <PageCenter>
            <MarginContainer direction='column'>
                <TitleLogo main/>
                <Title>Playground</Title>
                <LoginBtn largebtn='largebtn'/>
                <Link to="/lobby">TO Lobby</Link>
                <div>
                    <button onClick={handleClickChangeSocketUrl}>Click Me to change Socket Url</button>
                    <button onClick={handleClickSendMessage} disabled={readyState !== CONNECTION_STATUS_OPEN}>Click Me to send 'Hello'</button>
                    <span>The WebSocket is currently {connectionStatus}</span>
                    {lastMessage && (
                        <span>Last message:{lastMessage.data}</span>
                    )}
                    <ul>
                        {messageHistory.map((message, idx) => <span key={idx}>{message.data}</span>)}
                    </ul>
                </div>
            </MarginContainer>
        </PageCenter>
    )
};

export default HomePage;