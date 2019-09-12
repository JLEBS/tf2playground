import React from 'react';
import styled, {css} from 'styled-components';
import Colors from './../../misc/colors';
import { BtnText } from './../../misc/fonts';
import {ReactComponent as Steam} from '../../assets/imgs/icons/svgs/steam-logo.svg';

const SteamBtn = styled.a`
  display: block;
  color: ${Colors.standard.secondary};
  background-color: ${Colors.standard.primary};
  border-radius: 40px;
  padding: 10px 8px 10px 8px;
  transition: all 0.5s ease-in-out;

  :hover{
    color: ${Colors.standard.primary};
    background-color: ${Colors.standard.secondary};
  }

  ${props => props.largebtn && css`
    padding:1rem;
    box-shadow: 2px 8px ${Colors.standard.secondary};
  `}

  ${props => props.smallbtn && css`
    box-shadow: 2px 5px ${Colors.standard.secondary};
  `}
`;

const ButtonContainer = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  min-width: 170px;
`;

const SteamLogo = styled(Steam)`
  ${props => props.largebtn && css`
    height:50px;
  `}

  ${props => props.smallbtn && css`
    height:30px;
  `}
`;

const Avatar = styled.a`
  background-image: url(${props => props.img});
  background-position: center;
  background-repeat: no-repeat;
  max-width: 30px;
  max-height: 30px;
  width: 100%;
  background-size: cover;
  padding-top: 30px;
  border-radius: 50%;
`;

const LoginBtn = ({ smallbtn, largebtn }) => {
  return (
    <SteamBtn href='http://localhost:3001/login/steam' smallbtn={smallbtn} largebtn={largebtn}>
      <ButtonContainer>
        <SteamLogo smallbtn={smallbtn} largebtn={largebtn}/>
        <BtnText smallbtn={smallbtn} largebtn={largebtn}>Sign In</BtnText>
      </ButtonContainer>
    </SteamBtn>
  )
}

const LogoutBtn = ({ userData }) => {
  return (
    <SteamBtn >
      {console.log('data', userData)}
      <ButtonContainer>
        <Avatar img={userData.avatar} href={`http://localhost:3000/profile/${userData.steam64Id}`}/>
        <BtnText>{userData.personname}</BtnText>
        <a href='http://localhost:3001/logout'>Logout</a>
      </ButtonContainer>
    </SteamBtn>
  )
}

export {LoginBtn , LogoutBtn};