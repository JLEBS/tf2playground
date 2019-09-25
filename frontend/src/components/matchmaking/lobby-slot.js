import React from 'react';
import {Link} from '../../misc/fonts';
import {LobbyRectangle, IconWrapper, IconImage, LobbyStats} from './lobby-elements';
import classSelectionArray from './class-array';

const LobbySlot = (playerData) => {
  
  return(
    <LobbyRectangle className={playerData ? 'lobby-slot' : ''}>
      <IconWrapper background={playerData ? 'white' : 'grey'}>
        <IconImage imageUrl={playerData.playerData.details ? classSelectionArray[playerData.playerData.classId].icon : ''}/>
      </IconWrapper>
   
      {playerData.playerData.details && ( 
        <>
        {console.log(playerData.playerData.details.steamId)}
          <Link to={`/profile/${playerData.playerData.details.steamId}`}>{playerData.playerData.details.name}</Link>  
          <LobbyStats/>
        </>
      )}
    </LobbyRectangle>
  )
}

export default LobbySlot