import React from "react";
import LobbySlot from "./lobby-slot";
import ClassSelection from "./choose-class";
import { LobbyPlayerContainer, LobbyHeading } from "./lobby-elements";

const LobbyContainer = ({ lobbyData }) => {
  if (!lobbyData) return null;

  if (lobbyData);
  {
    // const [data, setData] = useEffect(null);

    // useEffect(()=> {

    //   if(lobbyData){
    //     setData(data)
    //   }
    // }, setData);

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
  }
};

export default LobbyContainer;
