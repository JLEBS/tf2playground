import React from 'react';
import CountUp from 'react-countup';
import styled, {css} from 'styled-components';
import {UserContent, UserValue} from '../../../misc/fonts';
import {MarginContainer} from '../../structure/containers';

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

const LifeTimeStatContainer = ({lifetimeStats}) => {
    return (
        <>
            {lifetimeStats.map((statistic, i) => (
                <MarginContainer size='33%'  stat key={i}>
                    <UserContent>{statistic.name}</UserContent>
                    <MarginContainer className='statData'>
                        <ClassInstance tinysvg imageUrl={statistic.image}/>
                        <UserValue> <CountUp useEasing={false} duration={3} end={statistic.testData}/></UserValue>
                    </MarginContainer>
                </MarginContainer>
            ))}
        </>
    ); 
};

export default LifeTimeStatContainer;