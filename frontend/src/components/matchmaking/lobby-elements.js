import React from 'react';
import styled, {css} from 'styled-components';
import {LobbyFont} from '../../misc/fonts';

//Rectangle that contains data
const LobbyRectangle = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 400px;
    width: 100%;
    background-color: black;
    color: white;
    padding: 14px 32px 14px 32px;
    ${props => props.fixed && css`
        position: fixed;
    `}
`;

//Button element containing class icon
const IconWrapper = styled.button`
  padding: 4px;
  border: 2px solid grey;
  border-radius: 20px;
  position: relative;
  
  ${props => props.addSelect && css`{
    transition: all 0.3s ease-in-out;

    &:hover{
      background-color: #1C9523;
      border: 2px solid white;
    }
    &:hover > img{
      bottom: 0px;
      opacity: 1;
    }
  `}

  ${props => props.removeSelect && css`{
    transition: all 0.3s ease-in-out;

    &:hover{
      background-color: red;
      border: 2px solid black;
    }
  `}
`;

//Button child containing the class image (After soley for numbering)
const IconImage = styled.span`
  ${props => `background-image: url(${props.imageUrl});`};
  background-repeat: no-repeat;
  background-size: contain;
  display:block;
  height: 24px;
  width: 24px;

  ${props => props.classQuantity && css`{
    &:after{
      content: '2';
      color: black;
      font-size: 14px;
      font-weight: bold;
      line-height: 12px;
      border: 1px solid #FF5722;
      border-radius: 10px;
      height: 13px;
      width: 13px;
      position: absolute;
      display: block;
      text-align: center;
      top: -4px;
      right: -7px;
      background-color: white;
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
`;

const LobbyHeading = ({selectedClass}) => {
  return(
    <LobbyRectangle>
      <LobbyFont>Waiting for players to join lobby...</LobbyFont>
      <PlayerCounter>
          <LobbyFont>{selectedClass}/12</LobbyFont>
      </PlayerCounter>
    </LobbyRectangle>
  )
}

const LobbySpectators = ({arrayOfPlayers}) => {
  return(
    <LobbyRectangle>
      <LobbyFont>View Spectators</LobbyFont>
    </LobbyRectangle>
  )
}
export {LobbyRectangle, IconWrapper, IconImage, ClassTorso, LobbyHeading, LobbySpectators}