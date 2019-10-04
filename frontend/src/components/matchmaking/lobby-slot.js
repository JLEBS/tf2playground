import React from "react";
import { Link } from "../../misc/fonts";
import {
  LobbyRectangle,
  IconWrapper,
  IconImage,
  LobbyStats
} from "./lobby-elements";
import {ClassImages} from "./class-array";

const LobbySlot = ({playerData}) => {
  
  const player = Object.values(playerData)[0];
  
  return (
    <LobbyRectangle ready={player.ready === true ? true : ''}>
      <IconWrapper>
        <IconImage imageUrl={ClassImages[player.classId].icon}/>
      </IconWrapper>
      <Link to={`/profile/${Object.keys(playerData)[0]}`}>
        {player.name}
      </Link>
      <LobbyStats />
    </LobbyRectangle>
  );
};

export default LobbySlot;
