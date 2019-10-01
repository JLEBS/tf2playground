import React, { useEffect, useState } from "react";
import LobbySlot from "./lobby-slot";
import { LobbyPlayerContainer, LobbyHeading } from "./lobby-elements";

const LobbyContainer = ({ lobbyData }) => {
  return (
    <>
      <LobbyHeading className="lobby-play-count" playersJoined={lobbyData} />
      <LobbyPlayerContainer playerCount={lobbyData.maxPlayer}>
        {console.log("SHOULD RENDER ONCE")}
        {lobbyData.players.map((player, i) => (
          <div key={i}>
            <LobbySlot playerData={player} />
          </div>
        ))}
      </LobbyPlayerContainer>
    </>
  );
};

export default LobbyContainer;
