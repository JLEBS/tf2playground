import CountUp from 'react-countup';
import React from 'react';
import styled, {css} from 'styled-components';
import {UserSubHeading, UserContent, UserValue, TempusTitle, Fluctuation} from '../../../misc/fonts';
import {MarginContainer} from '../../structure/containers';
import Graph from './visual-data/graph';

//Class imports
import soldier from '../../../assets/imgs/icons/classes/soldier.png';
import demo from '../../../assets/imgs/icons/classes/demo.png';
import demoAndSoldier from '../../../assets/imgs/icons/classes/demoAndSoldier.png';
import Trophy from '../../../assets/imgs/icons/svgs/trophy.svg';
import Medal from '../../../assets/imgs/icons/svgs/medal.svg';
import { ReactComponent as Arrow } from '../../../assets/imgs/icons/svgs/arrow.svg';

const InternalContainer = styled.div`
    width: 100%;

    ${props => props.flex && css`
        display flex;
        flex-direction: row;
    `}
`;

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

const TempusContainer = ({tempusData}) => {

    let multipleRecords = false; 

    if(!tempusData.length){
        return <div>No data</div>
    }

    const TEMPUS_CURRENT = [
        {
            name: 'soldier', 
            image: soldier,
            points: tempusData[0].soldier_points,
            title: tempusData[0].soldier_title,
            rank: tempusData[0].soldier_rank
        },
        { 
            name: 'demo', 
            image: demo,
            points: tempusData[0].demo_points,
            title: tempusData[0].demo_title,
            rank: tempusData[0].demo_rank
        },
        { 
            name: 'total', 
            image: demoAndSoldier,
            points: tempusData[0].total_points, 
            rank: tempusData[0].total_rank
        }
    ];

    if(tempusData[1]){
        multipleRecords = true;

        TEMPUS_CURRENT[0].fluctuation = tempusData[1].soldier_rank - tempusData[0].soldier_rank;
        TEMPUS_CURRENT[1].fluctuation = tempusData[1].demo_rank - tempusData[0].demo_rank;
        TEMPUS_CURRENT[2].fluctuation = tempusData[1].total_rank - tempusData[0].total_rank;
    }

    //Get the Tempus title color code
    const TempusTitleColor = {
        'Emperor':  [ '#000000', '#525252', '#3838FF', '#87BBFF'],
        'King' :    [ '#AD0000', '#FF3838', '#F56200', '#FFFF7A'],
        'Archduke': [ '#0000B3', '#45AAF7', '#3C4CA5', '#FFFFFF'],
        'Lord':     [ '#005200', '#009900', '#626262', '#FFFFFF'],
        'Duke':     [ '#ACA287', '#645456', '#E85265', '#FFFFFF'],
        'Prince':   [ '#2E6994', '#00FFCC', '#45AAF7', '#FFFFFF'],
        'Earl':     [ '#292626', '#7D7777', '#E8E5E5', '#FFFFFF'],
        'Sir':      [ '#BD5C00', '#EC3E00', '#FFFFFF', '#FFFFFF'],
        'Count':    [ '#059605', '#54AB31', '#FFFFFF', '#FFFFFF'],
        'Baron':    [ '#35B7EA', '#C567E0', '#FFFFFF', '#FFFFFF'],
        'Knight':   [ '#FF8A8A', '#D91818', '#FFFFFF', '#FFFFFF'],
        'Noble':    [ '#9EA5CB', '#9477D4', '#FFFFFF', '#FFFFFF'],
        'Esquire':  [ '#A9B6B3', '#45AAF7', '#FFFFFF', '#FFFFFF'],
        'Jester':   [ '#C5B1A3', '#3EBBA0', '#FFFFFF', '#FFFFFF'],
        'Plebeian': [ '#C2C2A6', '#66924C', '#FFFFFF', '#FFFFFF'],
        'Peasant':  [ '#B9B3B3', '#AFE06C', '#FFFFFF', '#FFFFFF'],
        'Peon':     [ '#A6A6A6', '#EFDA3F', '#FFFFFF', '#FFFFFF']
    }
    
    let animationEnded = true;

    return (
        <InternalContainer>
            {console.log('Displaying Tempus data...')}
            <MarginContainer content='space-between' shrink='true'>
                {TEMPUS_CURRENT.map((tempus, i) => (

                    <MarginContainer tempus direction='column' wrap='true' key={i}>
                       
                        <MarginContainer statTitle direction='column' content='flex-start'>
                            <ClassInstance icon imageUrl={tempus.image}/>
                            <UserSubHeading>{tempus.name}</UserSubHeading>
                            {tempus.title && (
                                <TempusTitle bracket={TempusTitleColor[tempus.title][0]} color={TempusTitleColor[tempus.title][1]}>{tempus.title}</TempusTitle> 
                            )}   
                        </MarginContainer>

                        <MarginContainer size='100%' stat column>
                            <UserContent>{tempus.shortName} rank</UserContent>
                            <MarginContainer className='statData'>
                                <ClassInstance tinysvg imageUrl={Medal}/>
                                <UserValue rank><CountUp useEasing={false} start={69053} duration={3} end={tempus.rank}/></UserValue>
                            </MarginContainer>
                        </MarginContainer>
                    
                        <MarginContainer size='100%' stat column>
                            <UserContent>{tempus.shortName} points</UserContent>
                            <MarginContainer className='statData'>
                                <ClassInstance tinysvg imageUrl={Trophy}/>
                                <UserValue> <CountUp duration={3} end={tempus.points} onEnd={() => console.log('completed animation')}/></UserValue>
                            </MarginContainer>
                        </MarginContainer>
                        {multipleRecords === true && (
                            <MarginContainer size='100%' stat column>
                                <UserContent>Fluctuation</UserContent>
                                <MarginContainer className='statData'>
                                    <Fluctuation className={tempus.fluctuation >= 0 ? tempus.fluctuation === 0 ? 'neutral' : 'increase' : 'decrease'}>
                                        <Arrow/>
                                        <UserValue className='tempus-change'>
                                            {tempus.fluctuation}
                                        </UserValue>
                                    </Fluctuation>
                                </MarginContainer>
                            </MarginContainer>
                        )}
                    </MarginContainer>
                ))}
            </MarginContainer>
            {multipleRecords === true && animationEnded === true && (
                <Graph tempusHistory={(tempusData)}/>
            )}
        </InternalContainer>
    );
}

export default TempusContainer;