import React, {useState, useCallback, useEffect}  from 'react';
import styled, {css} from 'styled-components';
import useWebSocket from 'react-use-websocket';
import LobbySlot from './lobby-slot';
import {LobbyRectangle, IconWrapper, IconImage, LobbyHeading} from './lobby-elements';

const LobbyContainer = (lobbyData) => {

    //Websocket only
    if(lobbyData.lobbyData.data){

        console.log('testing length', lobbyData.lobbyData.data);
        
        return (
            JSON.parse(lobbyData.lobbyData.data).players.map((player, i) => 
                <>
            
                    <LobbySlot key={i} playerData={player}/>
                    {console.log('length', player.length)}
                </>
            )
        )
    }

    //Onload
    else {
        return (
            lobbyData.lobbyData.players.map((player, i) => 
                <>
                    <LobbySlot key={i} playerData={player}/>
                </>
            )
        )
    }
}

export default LobbyContainer