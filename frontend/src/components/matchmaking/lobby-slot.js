import React from "react";
import { Link } from "../../misc/fonts";
import {
  LobbyRectangle,
  IconWrapper,
  IconImage,
  LobbyStats
} from "./lobby-elements";
import {ClassImages} from "./class-array";

const LobbySlot = playerData => {
  return (
    <LobbyRectangle>
      <IconWrapper>
        <IconImage imageUrl={ClassImages[playerData.playerData.classId].icon}/>
      </IconWrapper>
      <Link to={`/profile/${playerData.playerData.details.steamId}`}>
        {playerData.playerData.details.name}
      </Link>
      <LobbyStats />
    </LobbyRectangle>
  );
};

export default LobbySlot;
