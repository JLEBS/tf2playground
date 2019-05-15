import React from 'react';
import styled, {css} from 'styled-components';
import {UserHeading, UserSubHeading} from '../../misc/fonts';
import {MarginContainer} from '../structure/containers';
import {useSpring, useSprings, animated} from 'react-spring';

//Class imports
import scout from '../../assets/imgs/icons/classes/scout.png';
import pocketScout from '../../assets/imgs/icons/classes/pocketScout.png';
import soldier from '../../assets/imgs/icons/classes/soldier.png';
import pocketSoldier from '../../assets/imgs/icons/classes/pocketSoldier.png';
import demo from '../../assets/imgs/icons/classes/demo.png';
import medic from '../../assets/imgs/icons/classes/medic.png';

//SVG imporst
import Fist from '../../assets/imgs/icons/svgs/fist.svg';
import Trophy from '../../assets/imgs/icons/svgs/trophy.svg';
import Clock from '../../assets/imgs/icons/svgs/clock.svg';
import Medal from '../../assets/imgs/icons/svgs/medal.svg';
import Injured from '../../assets/imgs/icons/svgs/broken_arm.svg';
import PeopleCarry from '../../assets/imgs/icons/svgs/people_carry.svg';

const CLASS_STATS = [
    {   
        name: 'pocket scout',
        shortname: 'pocket scout',
        image: pocketScout,
        testData: 85
    },
    {
        name: 'flank scout',
        shortname: 'flank scout',
        image: scout,
        testData: 37
    },
    {
        name: 'pocket soldier',
        shortname: 'pocket',
        image: pocketSoldier,
        testData: 83
    },
    {
        name: 'roaming soldier',
        shortname: 'roamer',
        image: soldier,
        testData: 21
    },
    {
        name: 'demoman',
        shortname: 'demo',
        image: demo,
        testData: 1
    },
    {
        name: 'medic',
        shortname: 'medic',
        image: medic,
        testData: 100
    }
];

const SVG_ICONS = [
    {
        name: 'lobbies played',
        description: 'fist raised',
        image: Fist,
        testData: '41'
    },
    {
        name: 'total wins',
        description: 'trophy',
        image: Trophy,
        testData: '10'
    },
    {
        name: 'hours played',
        description: 'clock',
        image: Clock,
        testData: '8973'
    },
    {
        name: 'ETF2L div',
        description: 'medal',
        image: Medal,
        testData: '2'
    },
    {
        name: 'disconnects',
        description: 'brokenarm',
        image: Injured,
        testData: '3'
    },
    {
        name: 'sub count',
        description: 'carry',
        image: PeopleCarry,
        testData: '7'
    },

];

// const ChatMod = styled({svg})`
//     height: 25px;
//     margin-left: 10px;
// `;

const InfoRectangle = styled.div`
    border-radius: 10px;
    background-color: white;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
    ${props => `max-width: ${props.maxWidth};`};
    ${props => `min-width: ${props.minWidth};`};
`;

const ClassInstance = styled.div`
    ${props => `background-image: url(${props.imageUrl});`};
    background-repeat: no-repeat;
    background-size: contain;
    ${props => `height: ${props.size}; width: ${props.size};`};
`;

const ClassWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 8px;
    padding-bottom: 8px;

    ${props => props.column && css`
        flex-direction: column;

        & > * {
            width:100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-top:6px;
            padding-bottom:6px;
        }
    `};
`;

const Percentage = styled(animated.div)`
    min-width:40px;
    text-align: right;
`;


const ClassContainer = ({classArray, data}) => {

    const numberIncrease = useSpring({ config: {duration: 5000}, from: { val: 0 }, to: { val: 235 } });
    //const springs = useSprings(number, items.map(item => ({ opacity: item.opacity }))

    return (    
        <>
            {classArray.map((character, i) => (
                <ClassWrapper key={i}>
                    <ClassInstance size={'32px'} imageUrl={character.image}/>
                    <UserSubHeading>{character.name}{character.testData}</UserSubHeading>
                    <Percentage>
                        
                        {numberIncrease.val.interpolate(val => Math.floor(val))}
                    </Percentage>
                </ClassWrapper>
            ))}
        </>
    ); 
};

const LifeTimeStatContainer = ({lifetimeStats, data}) => {
    return (
        <>
            {lifetimeStats.map((statistic, i) => (
                <ClassWrapper column key={i}>
                    <UserSubHeading>{statistic.name}</UserSubHeading>
                    <div>
                        <ClassInstance size={'32px'} imageUrl={statistic.image}/>
                        <Percentage>{statistic.testData}</Percentage>
                    </div>
                </ClassWrapper>
            ))}
        </>
    ); 
};


const RectangleContainer = ({header, children, maxWidth, minWidth, direction, content}) => (
    <InfoRectangle maxWidth={maxWidth} minWidth={minWidth}>
   
        <UserHeading heading>
            {header}
        </UserHeading>
    
        <MarginContainer direction={direction} content={content}>
            {children}
        </MarginContainer>
    </InfoRectangle>
);


export { ClassContainer, LifeTimeStatContainer, RectangleContainer, CLASS_STATS, SVG_ICONS}