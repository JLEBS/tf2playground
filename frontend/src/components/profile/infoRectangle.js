import CountUp from 'react-countup';
import React, {useState, useEffect} from 'react';
import styled, {css, keyframes} from 'styled-components';
import {UserHeading, UserSubHeading, UserContent, UserLinks, UserValue, TempusTitle, Fluctuation} from '../../misc/fonts';
import {MarginContainer} from '../structure/containers';
//import {animated} from 'react-spring';
//import {Trail} from 'react-spring/renderprops';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Sector, Cell } from 'recharts';
//import {Chart} from 'react-google-charts';
import Colors from '../../misc/colors';
import { parse, format } from 'date-fns';


//Class imports
import scout from '../../assets/imgs/icons/classes/scout.png';
import pocketScout from '../../assets/imgs/icons/classes/pocketScout.png';
import soldier from '../../assets/imgs/icons/classes/soldier.png';
import pocketSoldier from '../../assets/imgs/icons/classes/pocketSoldier.png';
import demo from '../../assets/imgs/icons/classes/demo.png';
import medic from '../../assets/imgs/icons/classes/medic.png';
//import demoAndSoldier from '../../assets/imgs/icons/classes/demoAndSoldier.png';

//SVG imporst
import Fist from '../../assets/imgs/icons/svgs/fist.svg';
import Trophy from '../../assets/imgs/icons/svgs/trophy.svg';
import Clock from '../../assets/imgs/icons/svgs/clock.svg';
import Medal from '../../assets/imgs/icons/svgs/medal.svg';
import Injured from '../../assets/imgs/icons/svgs/broken_arm.svg';
import PeopleCarry from '../../assets/imgs/icons/svgs/people_carry.svg';
import { ReactComponent as Arrow } from '../../assets/imgs/icons/svgs/arrow.svg';


//Profile only
import Twitch from '../../assets/imgs/icons/svgs/twitch.svg';
import Discord from '../../assets/imgs/icons/svgs/discord.svg';
import Steam_Logo from '../../assets/imgs/icons/svgs/steam_logo.svg';
//import eepilyProfile from '../../assets/imgs/user/eepilyProfile.jpg';

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
        name: 'ETF2L div',
        description: 'medal',
        image: Medal,
        testData: 2
    },
    {
        id: 5,
        name: 'disconnects',
        description: 'brokenarm',
        image: Injured,
        testData: 3
    },
    {
        id: 6,
        name: 'sub count',
        description: 'carry',
        image: PeopleCarry,
        testData: 7
    },
];

const PROFILE_SVGS = [
    {
        id: 1,
        name: 'steam',
        image: Steam_Logo,
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

//Only required SteamCommunity Id
const PROFILE_URLS = [
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

//Main Wrapper for each content section
const InfoRectangle = styled.div`
    border-radius: 10px;
    background-color: ${Colors.standard.primary};
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
    ${props => `max-width: ${props.maxWidth};`};
    ${props => `min-width: ${props.minWidth};`};

    @media (max-width: 510px){
        width: 100%;
        border-radius: unset;
        box-shadow: unset;
    }
`;

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


const OuterDivForReal = styled.div`
    flex-direction: row;
    display: flex;
    justify-content:space-between;
    flex-wrap: wrap;
    justify-content: space-around;

    ${props => props.maxWidth && css`
        max-width: 240px

        @media(max-width: 510px){
            max-width: 100%;
        }
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

//Steam External Links
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


const ProfileContainer = ({userLinks, userData, userIcons}) => {

    const status = {
        0: 'offline',
        1: 'online',
        2: 'away'
    }

    return (
        <>
            <MarginContainer profile='true' direction='row' size='100%' content='space-around'>
                <FlexTesting>
                    <Avatar img={userData[0].avatar} target='_blank' href={'https://steamcommunity.com/profiles/' + userData[0].steamCommunityId} classname='avatar'/>
                    <StatusContainer classname='userActivity'>
                        <span>
                            {userData[0].steamName}
                        </span>
                        <span>
                            {status[userData[0].status]}
                        </span>
                    </StatusContainer>
                </FlexTesting>
                <MarginContainer>
                    {userIcons.map((icon, i) => ( 
                        <a key={i} target="_bank" href={icon.url + userData[0].steamCommunityId} >
                            <ClassInstance svg imageUrl={icon.image}/>
                        </a>
                    ))}
                </MarginContainer>
            </MarginContainer>
            <MarginContainer shrink='true' content='space-around'>
                {userLinks.map((link, i) => ( 
                    <LinkTestContainer key={i} target='_blank'  href={link.url + userData[0].steamCommunityId} key={i}>
                        <UserLinks>{link.name}</UserLinks>
                    </LinkTestContainer>
                ))}
            </MarginContainer>
        </>
    ); 
};

const TempusContainer = ({tempusHistory, tempusStats}) => {

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
            {console.log('testing tempus stats', tempusStats)}
            {console.log('testing tempus history', tempusHistory)}

            <MarginContainer content='space-between' shrink='true'>
                {tempusStats.map((tempus, i) => (

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
                                <ClassInstance tinysvg imageUrl={SVG_ICONS[3].image}/>
                                <UserValue rank><CountUp useEasing={false} start={69053} duration={3} end={tempus.rank}/></UserValue>
                            </MarginContainer>
                        </MarginContainer>
                    
                        <MarginContainer size='100%' stat column>
                            <UserContent>{tempus.shortName} points</UserContent>
                            <MarginContainer className='statData'>
                                <ClassInstance tinysvg imageUrl={SVG_ICONS[1].image}/>
                                <UserValue> <CountUp duration={3} end={tempus.points}/></UserValue>
                            </MarginContainer>
                        </MarginContainer>
                        <MarginContainer size='100%' stat column>
                            <UserContent>Fluctuation</UserContent>
                            <MarginContainer className='statData'>
                                <Fluctuation className={tempus.fluctuation >= 0 ? tempus.fluctuation === 0 ? 'neutral' : 'increase' : 'decrease'}>
                                    <Arrow/>
                                    <UserValue positive>
                                        {tempus.fluctuation}
                                    </UserValue>
                                </Fluctuation>
                            </MarginContainer>
                        </MarginContainer>
                    </MarginContainer>
                ))}
            </MarginContainer>
            <Graph tempusHistory={(tempusHistory)}/>
        </InternalContainer>
    );
}



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

const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (

        <g>
            <text className='chartInnerLabel' x={cx} y={cy} dy={8} textAnchor="middle" fill={payload.color}>
                {payload.shortname}
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={payload.color}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={payload.color}
            />
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={payload.color} fill="none"/>
            <circle cx={ex} cy={ey} r={2} fill={payload.color} stroke="none"/>
            <text className='chartOuterLabel' x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill={payload.color}>
                {`${value} Wins`}
            </text>
            <text className='chartOuterLabelTwo' x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor}>
                {`(${(percent * 100).toFixed(2)}%)`}
            </text>
        </g>
    );
};
    
class TwoLevelPieChart extends React.Component{
 
    constructor(props){
        super(props);
        this.state = {activeIndex: 0}
    }
  
    onPieEnter = (data, index) => {
        this.setState({
        activeIndex: index,
    });}

        render () {
            return (
                
            <ChartContainer piechart>
                <PieChart className='modify' width={450} height={270} >
                    <Pie 
                        activeIndex={this.state.activeIndex}
                        activeShape={renderActiveShape} 
                        data={this.props.data} 
                        cx={220} 
                        cy={130} 
                        innerRadius={65}
                        outerRadius={90} 
                        onMouseEnter={this.onPieEnter}
                    >
                    {this.props.data.map((stat, i) => (
                        <Cell className={'segment-' + i} fill={stat.color}/>
                    ))}
                    </Pie>
                </PieChart>
            </ChartContainer>
         );
    }
}

Array.prototype.sum = function (prop) {
    var total = 0
    for ( var i = 0, _len = this.length; i < _len; i++ ) {
        total += this[i][prop]
    }
    return total
}

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


//Convert to switch statements
function getIntroOfPage(label) {
    if (label === 'Jan') {
        return `January`;
    } 
    if (label === 'Feb') {
        return `Febuary`;
    } 
    if (label === 'Mar') {
        return `March`;
    } 
    if (label === 'Apr') {
        return `April`;
    } 
    if (label === 'May') {
        return `May`;
    } 
    if (label === 'Jun') {
        return `June`;
    }
    if (label === 'Jul') {
        return `July`;
    }
    if (label === 'Aug') {
        return `August`;
    }
    if (label === 'Sep') {
        return `September`;
    }
    if (label === 'Oct') {
        return `October`;
    }
    if (label === 'Nov') {
        return `November`;
    }
    if (label === 'Dec') {
        return `December`;
    }
  }

function CustomTooltip({ payload, label, active, data }) {
    if (active) {
      return (
        <ToolTipContainer>
             <p className="intro">{getIntroOfPage(label)}</p>

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

const Graph = ({tempusHistory}) => {
   
    const newTempus = tempusHistory.reverse();
    
    return (
    <ChartContainer graph>
        <ResponsiveContainer>
          <AreaChart data={newTempus} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
            <XAxis dataKey='formattedDate' tick={{ fontSize: 16 }} />
            <YAxis tickCount={10} reversed orientation='left' domain={[0, 'dataMax + 1000']} />
            <Tooltip content={<CustomTooltip />}/>
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <Area type='monotone' dataKey='demo_rank' stroke={Colors.standard.tempus.demo} fill='none' strokeWidth={3} />
            <Area type='monotone' dataKey='soldier_rank' stroke={Colors.standard.tempus.soldier} fill='none' strokeWidth={3} />
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>
    );
};

const InternalContainer = styled.div`
    width: 100%;

    ${props => props.flex && css`
        display flex;
        flex-direction: row;
    `}
`;

const RectangleContainer = ({header, children, maxWidth, minWidth, direction, content}) => (
    <InfoRectangle maxWidth={maxWidth} minWidth={minWidth}>
        {header && (
            <UserHeading heading>
                {header}
            </UserHeading>
        )}
        <MarginContainer content={'space-between'} sidepadding verticalpadding shrink direction={direction}  >
            {children}
        </MarginContainer>
    </InfoRectangle>
);

export { ProfileContainer, ClassContainer, LifeTimeStatContainer, RectangleContainer, TempusContainer, Graph, CLASS_STATS, SVG_ICONS, PROFILE_URLS, PROFILE_SVGS}