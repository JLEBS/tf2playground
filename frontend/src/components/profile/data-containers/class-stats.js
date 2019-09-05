import CountUp from 'react-countup';
import React from 'react';
import styled, {css, keyframes} from 'styled-components';
import {UserSubHeading, UserContent, UserValue} from '../../../misc/fonts';
import {MarginContainer} from '../../structure/containers';
import TwoLevelPieChart from './../data-containers/visual-data/pie-chart';

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

const InternalContainer = styled.div`
    width: 100%;

    ${props => props.flex && css`
        display flex;
        flex-direction: row;
    `}
`;

const animatedGrow = (width) => {
    return keyframes`
        0% {
            width: 0%;
        }
        100% {
            width: ${width}%;
    }`
}

const MiniRectangleContainer = styled.div`
    display: none;
    width: 200px;
    justify-content: flex-end;
    position:relative;
    border: 1px solid #00000021;
    border-radius: 10px;
    background-color: #f9f9f9;

    @media(max-width: 510px){
        display: flex;
    }
`;

const Rectangle = styled.div`
    border-radius: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-right: 20px;
    background-color: ${props => props.color};

    ${props => props.mobile && css`
        animation: ${animatedGrow(props.width)} 3s forwards;
    `};
`;

const CLASS_STATS = [
    {   
        id: 1,
        name: 'pocket scout',
        shortname: 'pocket scout',
        image: pocketScout,
        value: 1234,       
        color: Colors.standard.class.pocketScout
    },
    {
        id: 2,
        name: 'flank scout',
        shortname: 'flank scout',
        image: scout,
        value: 529,       
        color: Colors.standard.class.flankScout
    },
    {
        id: 3,
        name: 'pocket soldier',
        shortname: 'pocket',
        image: pocketSoldier,
        value: 627,       
        color: Colors.standard.class.pocketSoldier
    },
    {
        id: 4,
        name: 'roaming soldier',
        shortname: 'roamer',
        image: soldier,
        value: 123,       
        color: Colors.standard.class.roamer
    },
    {
        id: 5,
        name: 'demoman',
        shortname: 'demo',
        image: demo,
        value: 256,      
        color: Colors.standard.class.demoman
    },
    {
        id: 6,
        name: 'medic',
        shortname: 'medic',
        image: medic,
        value: 362,
        color: Colors.standard.class.medic
    }
];

const SVG_ICONS = [
    {
        id: 1,
        name: 'lobbies played',
        description: 'fist raised',
        image: Fist,
        testData: 41
    },
    {
        id: 2,
        name: 'total wins',
        description: 'trophy',
        image: Trophy,
        testData: 10
    },
    {
        id: 3,
        name: 'hours played',
        description: 'clock',
        image: Clock,
        testData: 8973
    },
    {
        id: 4,
        name: 'disconnects',
        description: 'brokenarm',
        image: Injured,
        testData: 3
    },
    {
        id: 5,
        name: 'sub count',
        description: 'carry',
        image: PeopleCarry,
        testData: 7
    },
    {
        id: 6,
        name: 'Most played',
        description: 'medal',
        image: medic,
        testData: 823
    },
    {
        id: 7,
        name: 'kills',
        description: 'sword',
        image: SwordSingle,
        testData: 7392
    },
    {
        id: 9,
        name: 'assists',
        description: 'fist raised',
        image: Handshake,
        testData: 130353
    },
    {
        id: 9,
        name: 'top killstreak',
        description: 'fist raised',
        image: SwordMultiple,
        testData: 9
    },
];

const ClassContainer = ({classStats}) => {

    let Total = classStats.sum('value');

    return (
        <InternalContainer flex>
            <MarginContainer content='space-between' shrink maxWidth>
                <MarginContainer content='space-between' size='100%' >
                    <UserSubHeading>class role</UserSubHeading>
                    <UserSubHeading>wins</UserSubHeading>
                    <UserSubHeading >percentage</UserSubHeading>
                </MarginContainer>

                {classStats.map((stat, i) => (
                    
                    <MarginContainer size='100%' content='space-between' fill={stat.color} key={i}>
                        <ClassInstance icon imageUrl={stat.image}/>
                        <UserContent grow >{stat.name}</UserContent>
                        <UserValue> <CountUp useEasing={false} duration={3} start={0} end={stat.value}/> </UserValue>
                        <MiniRectangleContainer>
                            <UserValue percentage> <CountUp useEasing={false} duration={3} start={0} end={(Math.round(stat.value / Total * 100))}/> </UserValue>
                            <Rectangle classname='rectangle' mobile color={stat.color} width={(Math.round(stat.value / Total * 100))} />
                        </MiniRectangleContainer>
                       
                    </MarginContainer>
                ))}
            </MarginContainer>
            <TwoLevelPieChart data={classStats}/>
        </InternalContainer>
    );
}

export default ClassContainer;