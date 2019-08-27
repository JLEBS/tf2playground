import React from 'react';
import styled, {css} from 'styled-components';
import Colors from './../../misc/colors';
import { LobbyFont, BtnText } from './../../misc/fonts';
import {ReactComponent as Steam} from '../../assets/imgs/icons/svgs/steam_logo.svg';

const SteamBtn = styled.a`
  
    color: ${Colors.standard.secondary};
    background-color: ${Colors.standard.primary};
    border-radius: 40px;

    ${props => props.largebtn && css`
        padding:1rem;
        box-shadow: 2px 8px ${Colors.standard.secondary};
        :hover{
            color: ${Colors.standard.primary};
            background-color: ${Colors.standard.secondary};
        }
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
    height: 50px;
`;

const LoginBtn = ({ smallbtn, largebtn }) => {
    //console.log(largebtn)
    return (
        <SteamBtn href='http://localhost:3001/login/steam' smallbtn={smallbtn} largebtn={largebtn}>
            <ButtonContainer>
                <SteamLogo/>
                <BtnText>Sign In</BtnText>
            </ButtonContainer>
        </SteamBtn>
    )
}
// (
//     <SteamBtn {smallBtn, largeBtn}>
//         <ButtonContainer>
//             <SteamLogo/>
//             <BtnText>Sign In</BtnText>
//         </ButtonContainer>
//     </SteamBtn>
// );

// const NavLoginBtn = () => (
    

// );

export default LoginBtn;