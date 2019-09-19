import React from 'react';
import {Link} from '../../misc/fonts';
import {LobbyRectangle, IconWrapper, IconImage, LobbyStats} from './lobby-elements';
import classSelectionArray from './class-array';

const LobbySlot = ({playerData, selectedClass}) => {
  return(
    <LobbyRectangle>
      <IconWrapper background={selectedClass ? 'white' : 'grey'}>
        <IconImage imageUrl={selectedClass ? classSelectionArray[selectedClass].icon : ''}/>
      </IconWrapper>
   
      {playerData && ( 
        <>
          <Link to={`/profile/${playerData.data.data.steam64Id}`}>{playerData.data.data.personname}</Link>  
          <LobbyStats/>
        </>
      )}
  </LobbyRectangle>
  )
}

export default LobbySlot