import React from 'react';
import styled, {css} from 'styled-components';
import {UserLinks} from '../../../misc/fonts';
import {MarginContainer} from '../../structure/containers';
import Colors from '../../../misc/colors';
import { ReactComponent as Twitch } from '../../../assets/imgs/icons/svgs/twitch.svg';
import { ReactComponent as Discord } from '../../../assets/imgs/icons/svgs/discord.svg';
import { ReactComponent as SteamLogo } from '../../../assets/imgs/icons/svgs/steam-logo.svg';

const StatusContainer = styled.div`
    display: flex;
    flex-direction: column;
    letter-spacing:1.5px;
    position: relative;

    span:nth-child(1) {
        color: ${Colors.standard.secondary};
        font-size: 32px;
        padding-bottom: 8px;
    }
    span:nth-child(2) {
        padding-left: 20px;
        color: ${Colors.standard.secondary};
        display:flex;
        text-transform: capitalize;

         ::before{
            content: '';
            background-color: ${props => props.color};
            height: 12px;
            width: 12px;
            border-radius: 10px;
            position: absolute;
            margin-left:-20px;
            margin-top:2px;
        }
    }
`;

const Avatar = styled.a`
    background-image: url(${props => props.img});
    background-position: center;
    background-repeat: no-repeat;
    max-width: 150px;
    width: 100%;
    background-size: cover;
    padding-top: 48%;
    border-radius: 100px;

    @media(max-width: 510px){
        padding-top: 40%;
    }
`;

const FlexTesting = styled.div`
    width: 60%;
    display:flex;
    align-items: center;
    justify-content: space-around;

    @media (max-width: 510px){
        width: 100%;
    }
`;

const LinkTestContainer = styled.a`

    width: 100px;
    text-align: center;
    background-color: ${Colors.standard.lightGrey};
    border-radius: 10px;
    margin: 10px;
    padding: 10px 20px 10px 20px;
    border-radius: 15px;
    transition: background-color 0.5s;
    box-shadow: 1px 2px ${Colors.standard.secondary};
    
    &:hover {
        background-color: ${Colors.standard.secondary};
        color: ${Colors.standard.primary};

        h3 {
            color: ${Colors.standard.primary};
        }
    }
`;

const UserSocial = styled.a`
//god knows why this doesnt work
    width:30px;
    color:black;
    transition: color 0.5s ease-in-out;
    &:hover{
        color: ${Colors.standard.discord};
    }
    &.discord-icon{
        color: green;
    }
`;

const ProfileContainer = ({userData, socialData}) => {

    const status = {
        0: ['Offline', Colors.standard.secondary],
        1: ['Online', 'green'],
        2: ['Busy', 'orange'],
        3: ['Away', 'grey'],
        4: ['Snooze', 'grey'],
        5: ['Online', 'green'],
        6: ['Online', 'green']   
    }

    const userLinks = [
        {
            id: 1,
            name: 'logs.tf',
            url: 'http://logs.tf/profile/',
        },
        {
            id: 2,
            name: 'etf2l',
            url: 'http://etf2l.org/search/'
        },
        {
            id: 3,
            name: 'tf2center',
            url: 'https://tf2center.com/profile/'
        },
        {
            id: 4,
            name: 'ugc',
            url: 'https://www.ugcleague.com/players_page.cfm?player_id='
        },
        {
            id: 5,
            name: 'demos',
            url: 'https://demos.tf/profiles/'
        },
        {
            id: 6,
            name: 'pugchamp',
            url: 'https://eu.pug.champ.gg/player/'
        }
    ];

    const userContact = [
        {
            id: 1,
            name: 'steam',
            image: SteamLogo,
            url: 'https://steamcommunity.com/profiles/'
        },
        {
            id: 2,
            name: 'discord',
            image: Discord,
            url: 'https://discordapp.com/'
        },
        {
            id: 3,
            name: 'twitch',
            image: Twitch,
            url: 'https://www.twitch.tv/'
        }
    ];

    return (
        <>
        {console.log('userData', userData)}
            <MarginContainer profile='true' direction='row' size='100%' content='space-around'>
                <FlexTesting>
                    <Avatar img={userData[0].avatarfull} target='_blank' href={'https://steamcommunity.com/profiles/' + userData[0].steam64Id} classname='avatar'/>
                    <StatusContainer classname='userActivity' color={status[userData[0].personstate][1]}>
                        <span>
                            {userData[0].personname}
                        </span>
                        <span>
                            {status[userData[0].personstate][0]}
                        </span>
                    </StatusContainer>
                </FlexTesting>
                <MarginContainer>
                    {userContact.map((icon, i) => ( 
                        <UserSocial key={i}  target="_bank" href={icon.url + userData[0].steam64Id} >
                            <icon.image/>
                        </UserSocial>
                    ))}
                </MarginContainer>
            </MarginContainer>
            <MarginContainer shrink='true' content='space-around'>
                {userLinks.map((link, i) => ( 
                    <LinkTestContainer key={i} target='_blank'  href={link.url + userData[0].steam64Id} key={i}>
                        <UserLinks>{link.name}</UserLinks>
                    </LinkTestContainer>
                ))}
            </MarginContainer>
        </>
    ); 
};

export default ProfileContainer;