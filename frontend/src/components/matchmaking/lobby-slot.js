import React from 'react';
import {LobbyFont} from '../../misc/fonts';
import {LobbyRectangle, IconWrapper, IconImage} from './lobby-elements';
import classSelectionArray from './class-array';
import { ReactComponent as Clock } from '../../assets/imgs/icons/svgs/clock.svg';
import { ReactComponent as Fist } from '../../assets/imgs/icons/svgs/fist.svg';

const LobbySlot = ({playerData, selectedClass}) => {
  return(
    <LobbyRectangle >
      <IconWrapper>
          <IconImage imageUrl={classSelectionArray[selectedClass].icon}/>
      </IconWrapper>
      <LobbyFont>{playerData.data.data.personname}</LobbyFont>
    </LobbyRectangle>
  )
}

export default LobbySlot