import React, {useState, useCallback, useEffect}  from 'react';
import LobbySlot from './lobby-slot';
import {LobbyPlayerContainer, LobbyHeading} from './lobby-elements';

const Players = ({lobbyData}) => {

    if(!lobbyData) return null

    if(lobbyData){
        return (
            <>
                {JSON.parse(lobbyData.data).players.map((player, i) => 
                    <>
                        <LobbySlot key={i} playerData={player}/>
                    </>
                )}
            </>
        )
    }
}

const LobbyContainer = ({lobbyData}) => {

    return(
        <>
            <LobbyHeading className='lobby-play-count' playersJoined={lobbyData}/>
            <LobbyPlayerContainer>
                <Players lobbyData={lobbyData}/>
            </LobbyPlayerContainer>
        </>
    )
}

export default LobbyContainer