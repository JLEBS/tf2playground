import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import ClassSelection from "./choose-class";
import { ReactComponent as Clock } from "../../assets/imgs/icons/svgs/clock.svg";
import { ReactComponent as Fist } from "../../assets/imgs/icons/svgs/fist.svg";

const NumOfHours = styled(Clock)`
  height: 16px;
  margin-right: 8px;
`;

const NumOfGames = styled(Fist)`
  height: 16px;
  margin-right: 8px;
`;

const LobbyPlayerContainer = styled.div`
  background: linear-gradient(
    to bottom,
    #242424,
    #242424 50%,
    #1e1e1e 50%,
    #1e1e1e
  );
  background-size: 100% 108px;
  transition: all ease-in-out 0.5s;

  ${props =>
    props.playerCount &&
    css`
      min-height: ${props.playerCount * 54}px;
  `}

  & > div{
    padding: 1px 0px 1px 0px;
  }
`;

const LobbyParent = styled.div`
  max-width: 460px;
  width: 100%;
  background-color: #141414;
  margin-top: -32px;
  z-index: 3;
  min-height: 67px;
`;

//Rectangle that contains data
const LobbyRectangle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  padding: 10px 32px 10px 32px;
  ${props => typeof props.ready !== 'undefined' && css`
    border-left: 6px solid ${props => props.ready === 0 ? '#383838' : props.ready === 1 ? 'orange' : 'green' }
  `};

`;

const IconContainer = styled.div`
  width: 100%;
  max-width: 260px;
  display: flex;
  justify-content: space-between;
  padding-top: 16px;
  padding-bottom: 16px;
`;

//Button element containing class icon
const IconWrapper = styled.button`
  padding: 4px;
  border-radius: 20px;
  position: relative;
  cursor: auto;
  background-color: white;

  ${props =>
    props.addSelect === true &&
    css`
      cursor: crosshair;
      border: 2px solid grey;
      transition: all 0.3s ease-in-out;

      &:hover {
        background-color: #1c9523;
        border: 2px solid white;
      }

      &:hover > span::before {
        transform: scale(0.8);
      }

      &:hover > img {
        bottom: 0px;
        opacity: 1;
      }

      &:hover > span {
        visibility: visible;
        opacity: 1;
      }
    `}

  ${props =>
    props.addSelect === false &&
    css`{
    opacity: 0.5;
    cursor: not-allowed;
    border: 2px solid #e91e63;

    & span {
      &:after{
      color: red;
      }
    }
  `}
`;

//Button child containing the class image (After soley for numbering)
const IconImage = styled.span`
  &:before{
    content: '';
    ${props => `background-image: url(${props.imageUrl});`};
    background-repeat: no-repeat;
    background-size: contain;
    display:block;
    height: 24px;
    width: 24px;
    transition all ease-in-out 0.3s;
  }
`;

//Counts number of players added on each class
const ClassQuantity = styled.span`
  z-index: 1;
  height: 0px;
  ${props =>
    typeof props.classQuantity !== "undefined" &&
    css`{
    &:after{
      content: '${props => props.classQuantity}';
      color: ${props =>
        props.classQuantity === 0
          ? "#F22525;"
          : props => (props.classQuantity === 1 ? "#f26d00" : "black;")}
      border: 2px solid grey;
      font-size: 12px;
      font-weight: bold;
      line-height: 12px;
      border-radius: 10px;
      height: 13px;
      width: 13px;
      display: block;
      text-align: center;
      background-color: white;
      position: absolute;
      top: -3px;
      right: -7px;
    }
  `}
`;

//Large picture of characters' torso
const ClassTorso = styled.img`
  position: fixed;
  z-index: 4;
  left: 10%;
  height: 700px;
  bottom: -700px;
  opacity: 0.6;
  transition: all 0.5s ease-in-out;
`;

//Button displaying number of players
const PlayerCounter = styled.div`
  background-color: white
  color: black;
  padding: 4px 13px 4px 13px;
  border-radius: 16px;
  min-width: 42px;
  text-align:center;

  ${props => `
    &:before{
      content: '${props.currentPlayer}'; 
    }  
    &:after{
      content: '/${props.maxPlayer}'; 
    }  
  `}
`;

const LobbyInfo = styled.span`
  display: flex;
  &:after {
    ${props => `content: '${props.data}';`};
    font-weight: 600;
    font-size: 14px;
    line-height: 16px;
  }
`;

const LobbyTooltip = styled.span`
  visibility: hidden;
  transition: opacity 0.3s ease-in-out;
  opacity: 0;
  background-color: white;
  color: black;
  text-align: center;
  text-transform: capitalize;
  border-radius: 8px;
  padding: 4px;
  font-size: 10px;
  width: 66px;
  position: absolute;
  bottom: -28px;
  left: -20px;

  &:before{
    content: '';
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 5px solid white;
    font-size: 0;
    line-height: 0;
    position: absolute;
    top: -4px;
    left: 35%;
`;

const ClassSelectionContainer = styled.div`
  height: 100%;
  padding-left: 32px;
  padding-right: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TestButtons = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;

  button:first-child {
    background-color: #6dcd40;
  }
  button:nth-of-type(2) {
    background-color: #ff5c5c;
  }
  button {
    width: 100px;
    border-radius: 10px;
    padding: 2px;
    margin: 3px;
    font-family: Open Sans;
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    text-transform: uppercase;
  }
`;

const LobbyHeading = ({ lobbyData }) => {
  const [count, setCount] = useState([
    lobbyData.players.length,
    lobbyData.maxPlayer
  ]);
  const [lobbyMessage, setMessage] = useState(<>Setting up lobby&hellip;</>);

  const lobbyState = [
    <>Waiting for players to join lobby&hellip;</>,
    <>Waiting for players to ready&hellip;</>,
    <>Map vote commencing&hellip;</>,
    <>Randomizing the teams&hellip;</>,
    <>Retrieving server details&hellip;</>,
    <>Lobby In Progress!</>
  ];

  useEffect(() => {
    if (lobbyData) {
      setCount([lobbyData.players.length, lobbyData.maxPlayer]);
      setMessage(lobbyState[lobbyData.lobbyState]);
    }
  }, [lobbyData]);

  return (
    <LobbyRectangle>
      <p>{lobbyMessage}</p>
      <PlayerCounter currentPlayer={count[0]} maxPlayer={count[1]} />
    </LobbyRectangle>
  );
};

const LobbySpectators = ({ arrayOfPlayers }) => {
  return (
    <LobbyRectangle>
      <p>View Spectators</p>
    </LobbyRectangle>
  );
};

const LobbyStats = ({ playerInfo }) => {
  return (
    <div>
      <LobbyInfo data={"24"}>
        <NumOfGames />
      </LobbyInfo>
      <LobbyInfo data={"6.8Y"}>
        <NumOfHours />
      </LobbyInfo>
    </div>
  );
};

export {
  LobbyRectangle,
  IconWrapper,
  IconImage,
  ClassTorso,
  LobbyHeading,
  LobbySpectators,
  LobbyParent,
  LobbyStats,
  LobbyTooltip,
  LobbyPlayerContainer,
  IconContainer,
  ClassSelectionContainer,
  ClassQuantity,
  TestButtons
};
