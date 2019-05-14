import React from 'react';
import styled, {css} from 'styled-components';
import {UserHeading, UserSubHeading} from '../../misc/fonts'

//class imports
import scout from '../../assets/imgs/icons/classes/scout.png';
import pocketScout from '../../assets/imgs/icons/classes/pocketScout.png';
import soldier from '../../assets/imgs/icons/classes/soldier.png';
import pocketSoldier from '../../assets/imgs/icons/classes/pocketSoldier.png';
import demo from '../../assets/imgs/icons/classes/demo.png';
import medic from '../../assets/imgs/icons/classes/medic.png';

const CLASS_STATS = [
    {   
        name: 'pocket scout',
        shortname: 'pocket scout',
        image: pocketScout,
        testData: '85'
    },
    {
        name: 'flank scout',
        shortname: 'flank scout',
        image: scout,
        testData: '37'
    },
    {
        name: 'pocket soldier',
        shortname: 'pocket',
        image: pocketSoldier,
        testData: '83'
    },
    {
        name: 'roaming soldier',
        shortname: 'roamer',
        image: soldier,
        testData: '21'
    },
    {
        name: 'demoman',
        shortname: 'demo',
        image: demo,
        testData: '1'
    },
    {
        name: 'medic',
        shortname: 'medic',
        image: medic,
        testData: '100'
    }
];

const SVG_ICONS = [
    {
        name: 'lobbies played',
        description: 'fist raised',
        image: 'test'
    },
    {
        name: 'Wins',
        description: 'trophy',
        image: 'test'
    },
    {
        name: 'rank',
        description: 'medal',
        image: 'test'
    },
    {
        name: 'discconects',
        description: 'brokenarm',
        image: 'test'
    },
    {
        name: 'sub count',
        description: 'carry',
        image: 'test'
    }

];

const InfoRectangle = styled.div`
    border-radius: 10px;
    background-color: white;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
    ${props => `max-width: ${props.maxWidth};`};
`;

const RectangleContent = styled.div`
    padding: 24px;
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
`;

const Percentage = styled.div`
    min-width:40px;
    text-align: right;

`;

const ClassContainer = ({classArray, percentage}) => {
    return (
        <>
            {classArray.map((character, i) => (
                <ClassWrapper key={i}>
                    <ClassInstance size={'32px'} imageUrl={character.image}/>
                    <UserSubHeading>{character.name}</UserSubHeading>
                    <Percentage>{character.testData}%</Percentage>
                </ClassWrapper>
            ))}
        </>
    ); 
};

const RectangleContainer = ({header, content, maxWidth}) => (
    <InfoRectangle maxWidth={maxWidth}>
   
        <UserHeading heading>
            {header}
        </UserHeading>
    
        <RectangleContent maxWidth={maxWidth}>
            {/* <ClassContainer classArray={CLASS_STATS} percentage={'73'}/> */}
            {content}
        </RectangleContent>
    </InfoRectangle>
);

export default RectangleContainer;