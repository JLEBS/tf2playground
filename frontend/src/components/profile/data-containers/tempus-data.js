import CountUp from 'react-countup';
import React from 'react';
import styled, {css} from 'styled-components';
import {UserSubHeading, UserContent, UserLinks, UserValue, TempusTitle, Fluctuation} from '../../../misc/fonts';
import {MarginContainer} from '../../structure/containers';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid} from 'recharts';
import Colors from '../../../misc/colors';
import { parse, format } from 'date-fns';

//Class imports
import soldier from '../../../assets/imgs/icons/classes/soldier.png';
import demo from '../../../assets/imgs/icons/classes/demo.png';
import demoAndSoldier from '../../../assets/imgs/icons/classes/demoAndSoldier.png';
import Fist from '../../../assets/imgs/icons/svgs/fist.svg';
import Trophy from '../../../assets/imgs/icons/svgs/trophy.svg';
import Clock from '../../../assets/imgs/icons/svgs/clock.svg';
import Medal from '../../../assets/imgs/icons/svgs/medal.svg';
import Injured from '../../../assets/imgs/icons/svgs/broken_arm.svg';
import PeopleCarry from '../../../assets/imgs/icons/svgs/people_carry.svg';
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

const ChartContainer = styled.div`
    height:300px;
    padding-top:30px;

    ${props => props.graph && css`
        margin-left:-20px;
        cursor: pointer !important;
    `}

    ${props => props.piechart && css`
        @media (max-width: 510px){
            display: none;
        }
    `}

    .recharts-wrapper{
        width: 100% !important;
    }

    .recharts-sector{
        cursor: pointer;
    }

    .chartInnerLabel{
        ${props => `fill: ${props.fill}  !important;`};
        font-size: 18px;
        font-weight: 600;
        text-transform: capitalize;
    }

    .chartOuterLabel{
        ${props => `fill: ${props.fill}  !important;`};
        font-size: 16px;
        font-weight: 400;
    }

    .chartOuterLabelTwo{
        fill: ${Colors.standard.darkGrey};
        font-size: 14px;
        font-weight: 100;
    }
`
const ToolTipContainer = styled.div`
    font-style: normal;
    font-size: 18px;
    font-weight: 600;
    text-transform: capitalize;
    text-align: center;
    color: ${Colors.standard.secondary};
    background-color: ${Colors.standard.primaryTransparent}
    outline:2px dotted ${Colors.standard.lightGrey};
    padding:6px;
    min-width:100px;

    span{
        font-size: 18px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-width:60px
        padding: 3px;
        
    }
    p {

        padding-bottom: 10px;
    }
    .intro{
        color: ${Colors.standard.secondary};
    }

    .miniSoldierSpan{
        color:${Colors.standard.tempus.soldier}
    }
   
    .miniDemoSpan {
        color:${Colors.standard.tempus.demo};
    }

    .miniSoldierSpan, .miniDemoSpan {
        display: flex;
        flex-direction: column;
        justify-content: center;

        div:nth-child(2){
            font-size: 12px;
            font-weight: 600;
            color: ${Colors.standard.secondary};
            padding:6px;
        }
    }
`;


const Graph = ({tempusHistory}) => {
   
    var TEMPUS_HISTORY_MODIFIED = tempusHistory.map(item => {
        item.formattedDate = format(parse(item.timestamp), 'MMM')
        return item
    });

    const newTempus = TEMPUS_HISTORY_MODIFIED.reverse();
    
    return (
    <ChartContainer graph>
        <ResponsiveContainer>
          <AreaChart data={newTempus} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
            <XAxis dataKey='formattedDate' tick={{ fontSize: 16 }} />
            <YAxis tickCount={10} reversed orientation='left' domain={[0, 'dataMax + 1000']} />
            <Tooltip content={<CustomTooltip/>}/>
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <Area type='monotone' dataKey='demo_rank' stroke={Colors.standard.tempus.demo} fill='none' strokeWidth={3} />
            <Area type='monotone' dataKey='soldier_rank' stroke={Colors.standard.tempus.soldier} fill='none' strokeWidth={3} />
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>
    );
};

function CustomTooltip({ payload, label, active }) {
    if (active) {
      return (
        <ToolTipContainer>
        {console.log('hello tooltip', payload)}

             <p className="intro">{format(parse(payload[0].payload.timestamp), 'MMMM')}</p>

            <span>
                <ClassInstance icon imageUrl={demo}/>
                <span className='miniDemoSpan'>
                    <div>#{`${payload[0].value}`}</div>
                    <div>{`${payload[0].payload.demo_points} Points`}</div>
                </span>
            </span>

            <span>
                <ClassInstance icon imageUrl={soldier}/>
                <span className='miniSoldierSpan'>
                    <div>#{`${payload[1].value}`}</div>
                    <div>{`${payload[1].payload.soldier_points} Points`}</div>
                </span>
            </span>     
        </ToolTipContainer>
      );
    }
    return null;
}

const TempusContainer = ({tempusData}) => {
    
    //Get Current Tempus Rank
    const TEMPUS_CURRENT = [
        {
            name: 'soldier', 
            image: soldier,
            points: tempusData[0].soldier_points,
            title: tempusData[0].soldier_title,
            rank: tempusData[0].soldier_rank,
            fluctuation: tempusData[1].soldier_rank - tempusData[0].soldier_rank
        },
        { 
            name: 'demo', 
            image: demo,
            points: tempusData[0].demo_points,
            title: tempusData[0].demo_title,
            rank: tempusData[0].demo_rank,
            fluctuation: tempusData[1].demo_rank - tempusData[0].demo_rank
        },
        { 
            name: 'total', 
            image: demoAndSoldier,
            points: tempusData[0].total_points, 
            rank: tempusData[0].total_rank,
            fluctuation: tempusData[1].total_rank - tempusData[0].total_rank
        }
    ];

    //Get the Tempus title color code
    const TitleColor = {
        'emperor':  [ '#000000', '#525252', '#3838FF', '#87BBFF'],
        'king' :    [ '#AD0000', '#FF3838', '#F56200', '#FFFF7A'],
        'archduke': [ '#0000B3', '#45AAF7', '#3C4CA5', '#FFFFFF'],
        'lord':     [ '#005200', '#009900', '#626262', '#FFFFFF'],
        'duke':     [ '#ACA287', '#645456', '#E85265', '#FFFFFF'],
        'prince':   [ '#2E6994', '#00FFCC', '#45AAF7', '#FFFFFF'],
        'earl':     [ '#292626', '#7D7777', '#E8E5E5', '#FFFFFF'],
        'sir':      [ '#BD5C00', '#EC3E00', '#FFFFFF', '#FFFFFF'],
        'count':    [ '#059605', '#54AB31', '#FFFFFF', '#FFFFFF'],
        'baron':    [ '#35B7EA', '#C567E0', '#FFFFFF', '#FFFFFF'],
        'knight':   [ '#FF8A8A', '#D91818', '#FFFFFF', '#FFFFFF'],
        'noble':    [ '#9EA5CB', '#9477D4', '#FFFFFF', '#FFFFFF'],
        'esquire':  [ '#A9B6B3', '#45AAF7', '#FFFFFF', '#FFFFFF'],
        'jester':   [ '#C5B1A3', '#3EBBA0', '#FFFFFF', '#FFFFFF'],
        'plebeian': [ '#C2C2A6', '#66924C', '#FFFFFF', '#FFFFFF'],
        'peasant':  [ '#B9B3B3', '#AFE06C', '#FFFFFF', '#FFFFFF'],
        'peon':     [ '#A6A6A6', '#EFDA3F', '#FFFFFF', '#FFFFFF']
    }
    
    return (
        <InternalContainer>
            <MarginContainer content='space-between' shrink='true'>
                {TEMPUS_CURRENT.map((tempus, i) => (

                    <MarginContainer tempus direction='column' wrap='true' key={i}>
                       
                        <MarginContainer statTitle direction='column' content='flex-start'>
                            <ClassInstance icon imageUrl={tempus.image}/>
                            <UserSubHeading>{tempus.name}</UserSubHeading>
                            {  tempus.title && (
                                <TempusTitle bracket={TitleColor[tempus.title][0]} color={TitleColor[tempus.title][1]}>{tempus.title}</TempusTitle> 
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
                                <UserValue> <CountUp duration={3} end={tempus.points}/></UserValue>
                            </MarginContainer>
                        </MarginContainer>
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
                    </MarginContainer>
                ))}
            </MarginContainer>
            <Graph tempusHistory={(tempusData)}/>
        </InternalContainer>
    );
}

export default TempusContainer;