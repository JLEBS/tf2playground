import React, {useState, useCallback, useEffect}  from 'react';
import styled, {css} from 'styled-components';
import useWebSocket from 'react-use-websocket';
import LobbySlot from './lobby-slot';
import {LobbyRectangle, IconWrapper, IconImage, LobbyHeading} from './lobby-elements';

const LobbyContainer = ({selectedClass, playerData}) => {

    const CONNECTION_STATUS_CONNECTING = 0;
    const CONNECTION_STATUS_OPEN = 1;
    const CONNECTION_STATUS_CLOSING = 2;
    const CONNECTION_STATUS_CLOSED = 3;

    const arrayCreate = () => {
        const object = [0,1,2,3,4,5,5,5,5,5,5];
        return object;
    }

    if(selectedClass){
        return(
            <div className='lobby-slot-parent'>
                <LobbySlot playerData={playerData} selectedClass={selectedClass}/>
            </div>
        )
    }
    else{
        return (
            <div className='lobby-slot-parent'>
                {arrayCreate().map((object, i) => 
                    <LobbySlot obj={object} key={i}/>
                )}
            </div>
            )
        }
}

export default LobbyContainer



          /*{ {lastMessage && (
                <span>Last message:{lastMessage.data}</span>
            )}
            <ul>
                {messageHistory.map((message, idx) => <span key={idx}>{message.data}</span>)}
            </ul> }*/