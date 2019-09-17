import React from 'react';
import styled, {css} from 'styled-components';
import Colors from './../../misc/colors';
import { BtnText, ProfileDropdown} from './../../misc/fonts';
import {ReactComponent as Steam} from '../../assets/imgs/icons/svgs/steam-logo.svg';
import {ReactComponent as Enter} from '../../assets/imgs/icons/svgs/sign-in.svg';
import {ReactComponent as Exit} from '../../assets/imgs/icons/svgs/sign-out.svg';
import {ReactComponent as Caret} from '../../assets/imgs/icons/svgs/caret-down.svg';
import {ReactComponent as Cog} from '../../assets/imgs/icons/svgs/cog.svg';
import {ReactComponent as Portrait} from '../../assets/imgs/icons/svgs/id-card.svg';

const SteamBtn = styled.div`
  display: block;
  color: ${Colors.standard.secondary};
  background-color: ${Colors.standard.primary};
  border-radius: 40px;
  transition: all 0.5s ease-in-out;

  ${props => props.login && css`
    :hover{
      color: ${Colors.standard.primary};
      background-color: ${Colors.standard.secondary};
    }
  `}

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
  justify-content: space-between;
  min-width: 160px;
  padding: 10px 16px 10px 16px;
  position:relative;
  cursor: pointer;

  &:hover > span{
    display: flex;
    visibility: visible;
    opacity: 1;
  }

  span{
    visibility: hidden;
    opacity: 0;
    position: absolute;
    left:0
    right:0;
    bottom: -134px;
    padding: 16px 26px 16px 26px;
    border-radius: 10px;
    flex-direction: column;
    align-items: center;
    font-size: 10px;
    font-weight: 900;
    text-transform: uppercase;
    background-color: ${Colors.standard.primary};
    box-shadow: 0px 4px 4px 2px #00000040;
    transition: 0.3s all ease-in-out;
  }
`;

const Placeholder = styled.div`
  height:30px;
  width:30px;
  background-color:${Colors.standard.lightGrey};
  border-radius: 20px;
`;

const Avatar = styled.div`
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

const Anchor = styled.a`
  display: block;
  color: inherit;
`;

//SVGS
const SteamLogo = styled(Steam)`
  ${props => props.largebtn && css`
    height:50px;
  `}

  ${props => props.smallbtn && css`
    height:30px;
  `}
`;

const ExitBtn = styled(Exit)`
  height:17px;
`;

const EnterBtn = styled(Enter)`
  height:17px;
`;

const Dropdown = styled(Caret)`
  height:17px;
`;

const Settings = styled(Cog)`
  height:17px;
`;

const Profile = styled(Portrait)`
  height:17px;
`;

const EmptyBtn = () => {
  return(
    <ButtonContainer>
      <Placeholder/>
    </ButtonContainer>
  )
}
const LoginBtn = ({ smallbtn, largebtn }) => {
  return (
    <Anchor href='http://localhost:3001/login/steam'>
      <ButtonContainer>
        <SteamLogo smallbtn={smallbtn} largebtn={largebtn}/>
        <BtnText smallbtn={smallbtn} largebtn={largebtn}>Sign In</BtnText>
        <EnterBtn/>
      </ButtonContainer>
    </Anchor>
  )
}

const LogoutBtn = ({ userData }) => {
  return (
    <ButtonContainer>      
      <Avatar img={userData.avatar}/>
      <BtnText smallbtn={true}>{userData.personname}</BtnText>
      <Dropdown/>
      <span>
        <ProfileDropdown to={`/profile/${userData.steam64Id}`}>My Profile<Profile/></ProfileDropdown>
        <ProfileDropdown to={`/profile/${userData.steam64Id}`}>Settings<Settings/></ProfileDropdown>
        <ProfileDropdown to='http://localhost:3001/logout'>Logout<ExitBtn/></ProfileDropdown>
      </span>
    </ButtonContainer>
  )
}

export {LoginBtn, LogoutBtn, SteamBtn, EmptyBtn};