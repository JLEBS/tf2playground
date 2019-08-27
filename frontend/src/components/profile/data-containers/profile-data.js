import React from 'react';
import styled, {css} from 'styled-components';
import {UserLinks} from '../../../misc/fonts';
import {MarginContainer} from '../../structure/containers';
import Colors from '../../../misc/colors';

//Icon Component for class images/svgs, should be ammended in future to allow SVG fil change
const ClassInstance = styled.div`
    ${props => `background-image: url(${props.imageUrl});`};
    background-repeat: no-repeat;
    background-size: contain;

    ${props => props.icon && css`{
        height: 32px;
        width: 32px;
    `}

    ${props => props.svg && css`{
        height: 32px;
        width:50px;
    `}

    ${props => props.tinysvg && css`{
        height: 24px;
        width:40px;
    `}
`;

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
            background-color: ${Colors.standard.status.online};
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

const ProfileContainer = ({userLinks, userData, userIcons}) => {

    const status = {
        0: 'offline',
        1: 'online',
        2: 'away'
    }

    return (
        <>
        {console.log('userData', userData)}
            <MarginContainer profile='true' direction='row' size='100%' content='space-around'>
                <FlexTesting>
                    <Avatar img={userData[0].avatar} target='_blank' href={'https://steamcommunity.com/profiles/' + userData[0].steam64Id} classname='avatar'/>
                    <StatusContainer classname='userActivity'>
                        <span>
                            {userData[0].realname}
                        </span>
                        <span>
                            {status[userData[0].personstate]}
                        </span>
                    </StatusContainer>
                </FlexTesting>
                <MarginContainer>
                    {userIcons.map((icon, i) => ( 
                        <a key={i} target="_bank" href={icon.url + userData[0].steam64Id} >
                            <ClassInstance svg imageUrl={icon.image}/>
                        </a>
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