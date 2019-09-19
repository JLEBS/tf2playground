import React from 'react';
import styled, {css} from 'styled-components';
import {p} from '../../misc/fonts';
import { ReactComponent as Clock } from '../../assets/imgs/icons/svgs/clock.svg';
import { ReactComponent as Fist } from '../../assets/imgs/icons/svgs/fist.svg';

const NumOfHours = styled(Clock)`
  height: 16px;
  margin-right:8px;
`;

const NumOfGames = styled(Fist)`
  height: 16px;
  margin-right:8px;
`;

const LobbyParent = styled.div`
  max-width: 460px;
  width:100%;
  background-color:#141414;
  font-style: normal;
  font-weight: 600;
  text-transform: uppercase;
  line-height: 150%;
  position:absolute;
  right: 0;

  & .lobby-slot-parent div:nth-child(even){
    background-color: #1E1E1E;
  } 
  & .lobby-slot-parent div:nth-child(odd){
    background-color: #242424;
  } 
`;

//Rectangle that contains data
const LobbyRectangle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  cursor: auto;
  
  ${props => `background-color: ${props.background};`};

  ${props => props.addSelect && css`{
    cursor: crosshair;
    transition: all 0.3s ease-in-out;

    &:hover{
      background-color: #1C9523;
      border: 2px solid white;
    }
    &:hover > img{
      bottom: 0px;
      opacity: 1;
    }

    &:hover > span{
      visibility: visible;
      opacity: 0.9;
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

const LobbyInfo = styled.span`
  display: flex;
  &:after{
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


const LobbyHeading = ({selectedClass}) => {
  return(
    <LobbyRectangle>
      <p>Waiting for players to join lobby...</p>
      <PlayerCounter>
          <p>{selectedClass}/12</p>
      </PlayerCounter>
    </LobbyRectangle>
  )
}

const LobbySpectators = ({arrayOfPlayers}) => {
  return(
    <LobbyRectangle>
      <p>View Spectators</p>
    </LobbyRectangle>
  )
}

const LobbyStats = ({playerInfo}) => {
  return(
    <div>
      <LobbyInfo data={'24'}>
        <NumOfGames/>
      </LobbyInfo>
      <LobbyInfo data={'6.8Y'}> 
        <NumOfHours/>
      </LobbyInfo>
    </div>
  )
}

export {LobbyRectangle, IconWrapper, IconImage, ClassTorso, LobbyHeading, LobbySpectators, LobbyParent, LobbyStats, LobbyTooltip}