import React, {useState, useCallback, useEffect}  from 'react';
import styled, {css} from 'styled-components';
import useWebSocket from 'react-use-websocket';
import {LobbyFont} from '../../misc/fonts';
import LobbySlot from './lobby-slot';
import {LobbyRectangle, IconWrapper, IconImage, LobbyHeading} from './lobby-elements';

const LobbyContainer = ({selectedClass, playerData}) => {

    const arrayCreate = () => {
        const object = [0,1,2,3,4,5,5,5,5,5,5];
        return object;
    }

    if(selectedClass){
        return(
            <LobbySlot playerData={playerData} selectedClass={selectedClass}/>
        )
    }
else{
    return (






        <div>
           
            <div>
                {arrayCreate().map((object, i) => 
                    <LobbyRectangle obj={object} key={i} >
                        <IconWrapper>
                            <IconImage/>
                        </IconWrapper>
                        <LobbyFont>Waiting...</LobbyFont>

                    </LobbyRectangle>
                )}
            </div>
            <LobbyRectangle>
               
            </LobbyRectangle>
        </div>
        )
    }
}

export default LobbyContainer



// const CONNECTION_STATUS_CONNECTING = 0;
// const CONNECTION_STATUS_OPEN = 1;
// const CONNECTION_STATUS_CLOSING = 2;
// const CONNECTION_STATUS_CLOSED = 3;

          /*{ {lastMessage && (
                <span>Last message:{lastMessage.data}</span>
            )}
            <ul>
                {messageHistory.map((message, idx) => <span key={idx}>{message.data}</span>)}
            </ul> }*/