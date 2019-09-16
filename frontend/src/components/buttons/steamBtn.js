import React from 'react';
import styled, {css} from 'styled-components';
import Colors from './../../misc/colors';
import { BtnText, ImageUrl} from './../../misc/fonts';
import {Link} from 'react-router-dom';
import {ReactComponent as Steam} from '../../assets/imgs/icons/svgs/steam-logo.svg';
import {ReactComponent as Exit} from '../../assets/imgs/icons/svgs/sign-out.svg';
import {ReactComponent as Enter} from '../../assets/imgs/icons/svgs/sign-in.svg';


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
`;

const SteamLogo = styled(Steam)`
  ${props => props.largebtn && css`
    height:50px;
  `}

  ${props => props.smallbtn && css`
    height:30px;
  `}
`;

const ExitBtn = styled(Exit)`
  height:15px;
`;

const EnterBtn = styled(Enter)`
  height:15px;
`;

const Grey = styled.div`
  height:30px;
  width:30px;
  background-color:lightgrey;
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
  ${props => props.hover && css`
    transition: all 0.3s ease-in-out;
    &:hover{
      color: green;
    }
  `}
`;

const EmptyBtn = () => {
  return(
    <ButtonContainer>
      <Grey></Grey>
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
      <ImageUrl margin to={`/profile/${userData.steam64Id}`}>
        <Avatar img={userData.avatar}/>
        <BtnText smallbtn={true}>{userData.personname}</BtnText>
      </ImageUrl>
      <Anchor hover href='http://localhost:3001/logout'>
        <ExitBtn/>
      </Anchor>
    </ButtonContainer>
  )
}

export {LoginBtn, LogoutBtn, SteamBtn, EmptyBtn};