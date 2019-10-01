import React from "react";
import LobbySlot from "./lobby-slot";
import { LobbyPlayerContainer, LobbyHeading } from "./lobby-elements";

const LobbyContainer = ({ lobbyData }) => {
  console.log(lobbyData, 'were remderomg a nimcj')
  return (
    <>
      <LobbyHeading className="lobby-play-count" playersJoined={lobbyData} />
      <LobbyPlayerContainer playerCount={lobbyData.maxPlayer}>
        {console.log("SHOULD RENDER ONCE")}
        {lobbyData.players.map((player, i) => (
          <div key={i}>
              {console.log(i)}
            <LobbySlot playerData={player} />
          </div>
        ))}
      </LobbyPlayerContainer>
    </>
  );
};

export default LobbyContainer;
