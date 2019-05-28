import CountUp from 'react-countup';
import React from 'react';
import styled, {css} from 'styled-components';
import {UserHeading, UserSubHeading, UserContent, UserLinks} from '../../misc/fonts';
import {MarginContainer} from '../structure/containers';
import {animated} from 'react-spring';
import {Trail} from 'react-spring/renderprops';
import moment from 'moment';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Sector, Cell } from 'recharts';
import {Chart} from 'react-google-charts';


//Class imports
import scout from '../../assets/imgs/icons/classes/scout.png';
import pocketScout from '../../assets/imgs/icons/classes/pocketScout.png';
import soldier from '../../assets/imgs/icons/classes/soldier.png';
import pocketSoldier from '../../assets/imgs/icons/classes/pocketSoldier.png';
import demo from '../../assets/imgs/icons/classes/demo.png';
import medic from '../../assets/imgs/icons/classes/medic.png';
import demoAndSoldier from '../../assets/imgs/icons/classes/demoAndSoldier.png';

//SVG imporst
import Fist from '../../assets/imgs/icons/svgs/fist.svg';
import Trophy from '../../assets/imgs/icons/svgs/trophy.svg';
import Clock from '../../assets/imgs/icons/svgs/clock.svg';
import Medal from '../../assets/imgs/icons/svgs/medal.svg';
import Injured from '../../assets/imgs/icons/svgs/broken_arm.svg';
import PeopleCarry from '../../assets/imgs/icons/svgs/people_carry.svg';

//Profile only
import Twitch from '../../assets/imgs/icons/svgs/twitch.svg';
import Discord from '../../assets/imgs/icons/svgs/discord.svg';
import Steam_Logo from '../../assets/imgs/icons/svgs/steam_logo.svg';
import eepilyProfile from '../../assets/imgs/user/eepilyProfile.jpg';

const CLASS_STATS = [
    {   
        id: 1,
        name: 'pocket scout',
        shortname: 'pocket scout',
        image: pocketScout,
        value: 102,       
        color: '#000099'
    },
    {
        id: 2,
        name: 'flank scout',
        shortname: 'flank scout',
        image: scout,
        value: 462,       
        color: '#920087'
    },
    {
        id: 3,
        name: 'pocket soldier',
        shortname: 'pocket',
        image: pocketSoldier,
        value: 793,       
        color: '#d20069'
    },
    {
        id: 4,
        name: 'roaming soldier',
        shortname: 'roamer',
        image: soldier,
        value: 336,       
        color: '#f60049'
    },
    {
        id: 5,
        name: 'demoman',
        shortname: 'demo',
        image: demo,
        value: 346,      
        color: '#ff6827'
    },
    {
        id: 6,
        name: 'medic',
        shortname: 'medic',
        image: medic,
        value: 712,
        color: '#ffa600'
    }
];

const chartData = [
    { Time: moment('2019-01-01').format('MMM'), SoldierPoints: 1, SoldierRank: 708, DemoPoints: 11, DemoRank: 1000},
    { Time: moment('2019-02-02').format('MMM'), SoldierPoints: 2, SoldierRank: 705, DemoPoints: 22, DemoRank: 958},
    { Time: moment('2019-03-03').format('MMM'), SoldierPoints: 3, SoldierRank: 677, DemoPoints: 33, DemoRank: 965},
    { Time: moment('2019-04-04').format('MMM'), SoldierPoints: 4, SoldierRank: 658, DemoPoints: 44, DemoRank: 1210},
    { Time: moment('2019-05-05').format('MMM'), SoldierPoints: 52321, SoldierRank: 655, DemoPoints: 34543, DemoRank: 987},
    { Time: moment('2019-06-06').format('MMM'), SoldierPoints: 6, SoldierRank: 659, DemoPoints: 66, DemoRank: 800},
    // { Time: moment('2019-07-07').format('MMM'), SoldierRank: 650, DemoRank: 700},
    // { Time: moment('2019-08-08').format('MMM'), SoldierRank: 432, DemoRank: 657},
    // { Time: moment('2019-09-09').format('MMM'), SoldierRank: 470, DemoRank: 623},
    // { Time: moment('2019-10-10').format('MMM'), SoldierRank: 553, DemoRank: 588},
    // { Time: moment('2019-11-11').format('MMM'), SoldierRank: 500, DemoRank: 600},
    // { Time: moment('2019-12-12').format('MMM'), SoldierRank: 432, DemoRank: 676},
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

const TEMPUS_POINTS = [
    {
        id: 1,
        name: 'soldier',
        shortName: 'soldier',
        image: soldier,
        rank: 1,
        points: 248433,
    },
    {
        id: 2,
        name: 'demoman',
        shortName: 'demo',
        image: demo,
        rank: 10,
        points: 66398
    },
    {
        id: 3,
        name: 'average',
        shortName: 'total',
        image: demoAndSoldier,
        rank: 1,
        points: 314831
    }
];

const PROFILE_INFO = [
    {
        steamId: '[U:1:81264176]',
        steamCommunityId: '76561198041529904',
        avatar: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/ec/ecb8f3dd89bcd796eaaeb77d5547794053cfb120_full.jpg',
        steamName: 'eepily',
        discordName: 'eepily#2645',
        twitchName: 'eepily',
        status: 1,
        twitchStatus: true
    }
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

const InfoRectangle = styled.div`
    border-radius: 10px;
    background-color: white;
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

const ClassWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
 

    ${props => props.stat && css`
        @media (max-width: 510px){
            width: 33%;
        }  
    `}

    ${props => props.percentage && css`
        padding-top: 6px;
        padding-bottom: 6px;
    `}

    ${props => `border-left:  4px solid ${props.fill}  !important;
    margin: 6px;
    padding-left:6px;`};

    ${props => props.profile && css` 
        padding-top:10px;
        padding-bottom: 10px;

        @media (max-width: 510px){
            flex-direction:column;
        }
    `}


    ${props => props.fill && css` 
        width: 100%;
    `}

    ${props => props.paddingBottom && css` 
        padding-bottom: 40px;
    `}

    ${props => props.column && css`
        flex-direction: column;

        & > * {
            //width:100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding:6px;

          
        }
    `};

    ${props => props.row && css`
        flex-direction: row;
        width: 100%;
    `}
`;

const Percentage = styled(animated.div)`
    min-width:40px;
    text-align: center;
    ${props => props.percentage && css`
    text-align: right;
        :after{
            content:'%';
        }
    `};
    ${props => props.rank && css`
        :before{
            content:'#';
        }
    `};
`;

const TestDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start
    padding-bottom:16px;
`;

const TestOuterDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 150px;

    @media (max-width: 510px){
        width:100%;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: space-between;
        padding-bottom: 30px;

        .classTitle{
            width: 100%;
        }
    }
`;
const OuterDivForReal = styled.div`
    flex-direction: row;
    display: flex;
    justify-content:space-between;
    flex-wrap: wrap;
    justify-content: space-around;

    ${props => props.maxWidth && css`
        max-width: 240px
    `}
`;

const FlexStart = styled.div`
    display: flex;
    justify-content: flex-start;
`;

const ChartContainer = styled.div`
    height:300px;
    padding-top:30px;

    ${props => props.graph && css`
        margin-left:-20px;
        cursor: pointer !important;
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
        text-transform: capitalize;
    }

    .chartOuterLabel{
        ${props => `fill: ${props.fill}  !important;`};
        font-weight; 600;
        font-size: 16px;
    }

    .chartOuterLabelTwo{
        fill: darkgrey;
        font-size: 14px;
        font-weight: 100;
    }
`
const ToolTipContainer = styled.div`
    background-color: #ffffffe3;
    padding:6px;
    min-width:100px;
    outline:2px dotted lightgrey;
    text-align: center;

    span{
        font-size: 18px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-width:60px
        padding: 3px;
    }
    p {
        font-size: 16px;
        font-weight: 600;
        padding-bottom: 10px;
    }
    
    .miniSoldierSpan{
        color:#009EFF;
    }
   
    .miniDemoSpan {
        color: #EB008A;
    }

    .miniSoldierSpan, .miniDemoSpan {
        display: flex;
        flex-direction: column;
        justify-content: center;

        div:nth-child(2){
           font-size: 12px;
            color: grey;
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
        font-size: 32px;
        padding-bottom: 8px;
    }
    span:nth-child(2) {
        padding-left: 20px;
        display:flex;
        text-transform: capitalize;
        font-weight:600;

         ::before{
            content: '';
            background-color: #6DCD40;
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

const FlexTestAgain = styled.div`
    display:flex;
    flex-direction: row;
    @media (max-width: 510px){
        padding: 24px;
    }
  
`;

const LinkTestContainer = styled.a`

    width: 100px;
    text-align: center;
    background-color: lightgrey;
    border-radius: 10px;
    margin: 10px;
    padding: 10px 20px 10px 20px;
    border-radius: 15px;
    transition: background-color 1s;

    &:hover {
        background-color: black;
        color: white;

        h3 {
            color: white;
        }
    }
`;

const status = {
    0: 'offline',
    1: 'online',
    2: 'away'
}

const ProfileContainer = ({userLinks, userData, userIcons}) => {
    return (
        <>
            <ClassWrapper profile row>
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
                <FlexTestAgain>
                    {userIcons.map((icon, i) => ( 
                        <a  key={i} target="_bank" href={icon.url + userData[0].steamCommunityId} >
                            <ClassInstance svg imageUrl={icon.image}/>
                        </a>
                    ))}
                </FlexTestAgain>
            </ClassWrapper>
            <ClassWrapper  row>
                {userLinks.map((link, i) => ( 
                    <LinkTestContainer key={i} target='_blank'  href={link.url + userData[0].steamCommunityId} key={i}>
                        <UserLinks>{link.name}</UserLinks>
                    </LinkTestContainer>
                ))}
            </ClassWrapper>
        </>
    ); 
};


const LifeTimeStatContainer = ({lifetimeStats}) => {
    return (
        <>
            {lifetimeStats.map((statistic, i) => (
                <ClassWrapper column key={i}>
                    <UserContent>{statistic.name}</UserContent>
                    <div>
                        <ClassInstance tinysvg imageUrl={statistic.image}/>
                        <Percentage> <CountUp useEasing={false} duration={3} end={statistic.testData}/></Percentage>
                    </div>
                </ClassWrapper>
            ))}
           
        </>
    ); 
};

const Rectangle = styled.div`
    border-radius: 10px;
    padding:5px;
    padding-left: 5px;
    padding-right: 5px;
    width: ${props => props.width}px;
    height: 5px;
    background-color: #${props => props.color};
    border: 1px dotted grey;
`;

const YetAgainAnotherFlex = styled.div`
    display:flex;
    justify-content: space-between;
    width:100%;
`;


const RADIAN = Math.PI / 180;   


const COLORSs = ['#2BB673', '#d91e48', '#007fad', '#e9a227', '#ff7200', '#EB008A'];

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
                
                <ChartContainer>
                <PieChart className='modify' width={450} height={270} >
                    <Pie 
                        activeIndex={this.state.activeIndex}
                        activeShape={renderActiveShape} 
                        data={this.props.data} 
                        cx={220} 
                        cy={130} 
                        innerRadius={65}
                        outerRadius={90} 
                        fill={'black'}
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

const PercentageContainer = ({allWinStats}) => {

    return (
        <>
            {allWinStats.map((win, Colors, i) => (
                <ClassWrapper percentage column key={i}>
                    <YetAgainAnotherFlex>
                        <Rectangle width={win.winData} color={'0993ff'}/>
                        <Percentage> <CountUp useEasing={false} duration={3} end={win.winData}/>%</Percentage>
                        <UserContent>{win.name}</UserContent>
                    </YetAgainAnotherFlex>
                </ClassWrapper>
            ))}
            <TwoLevelPieChart/>

        </>
    );
};

const ClassContainer = ({classStats}) => {

    return (
        <InternalContainer flex>
            <OuterDivForReal maxWidth>
                <ClassWrapper percentage fill>
                    <UserContent>Class Role</UserContent>
                    <Percentage>Wins</Percentage>
                </ClassWrapper>

                {classStats.map((stat, i) => (
                    <ClassWrapper percentage fill={stat.color} key={i}>
                        <ClassInstance icon imageUrl={stat.image}/>
                        <UserContent>{stat.name}</UserContent>
                        <Percentage> <CountUp useEasing={false} duration={3} start={0} end={stat.value}/> </Percentage>
                    </ClassWrapper>
                ))}
            </OuterDivForReal>
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

function CustomTooltip({ payload, label, active }) {
    if (active) {
      return (
        <ToolTipContainer>
             <p className="intro">{getIntroOfPage(label)}</p>

            <span>
                <ClassInstance icon imageUrl={TEMPUS_POINTS[1].image}/>
                <span className='miniDemoSpan'>
                    <div>#{`${payload[1].value}`}</div>
                    <div>{`${payload[1].payload.DemoPoints} Points`}</div>
                </span>
            </span>

            <span>
                <ClassInstance icon imageUrl={TEMPUS_POINTS[0].image}/>
                <span className='miniSoldierSpan'>
                    <div>#{`${payload[0].value}`}</div>
                    <div>{`${payload[0].payload.SoldierPoints} Points`}</div>
                </span>
            </span>     

     
        </ToolTipContainer>
      );
    }
    return null;
}

const Graph = () => {

    return (
    <ChartContainer graph>
        <ResponsiveContainer>
          <AreaChart data={chartData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
            <XAxis dataKey='Time' tick={{ fontSize: 16 }} />
            <YAxis orientation='left' domain={[0, 'dataMax']} />
            <Tooltip  content={<CustomTooltip />}/>
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <Area type='monotone' dataKey='DemoRank' stroke='#EB008A' fill='none' strokeWidth={3} />
            <Area type='monotone' dataKey='SoldierRank' stroke='#009EFF' fill='none' strokeWidth={3} />
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>
    );
};

const O2 = '03448090202';

const InternalContainer = styled.div`
    width: 100%;

    ${props => props.flex && css`
        display flex;
        flex-direction: row;
    `}
`;

const TempusContainer = ({tempusStats, data}) => {
    return (
        <InternalContainer>
            <OuterDivForReal>
                {tempusStats.map((tempus, i) => (
                        <TestOuterDiv key={i}>
                            <TestDiv className='classTitle'>
                                <ClassInstance icon imageUrl={tempus.image}/>
                                <UserSubHeading>{tempus.name}</UserSubHeading>
                            </TestDiv>

                            <ClassWrapper stat classname='hickety' column>
                                <UserContent>{tempus.shortName} rank</UserContent>
                                <FlexStart>
                                    <ClassInstance tinysvg imageUrl={SVG_ICONS[3].image}/>
                                    <Percentage rank><CountUp useEasing={false} start={69053} duration={3} end={tempus.rank}/></Percentage>
                                </FlexStart>
                            </ClassWrapper>
                        
                            <ClassWrapper stat column>
                                <UserContent>{tempus.shortName} points</UserContent>
                                <FlexStart>
                                    <ClassInstance tinysvg imageUrl={SVG_ICONS[1].image}/>
                                    <Percentage> <CountUp duration={3} end={tempus.points}/></Percentage>
                                </FlexStart>
                            </ClassWrapper>

                            <ClassWrapper  stat column>
                                <UserContent>Fluctuation</UserContent>
                                <FlexStart>
                                    <ClassInstance tinysvg imageUrl={SVG_ICONS[1].image}/>
                                    <Percentage>-3</Percentage>
                                </FlexStart>
                            </ClassWrapper>
                        
                    </TestOuterDiv>
                    
                ))}
                
            </OuterDivForReal>
            <Graph/>
        </InternalContainer>
    );
}


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

export { ProfileContainer, ClassContainer, LifeTimeStatContainer, RectangleContainer, TempusContainer, PercentageContainer, Graph, TEMPUS_POINTS, CLASS_STATS, SVG_ICONS, PROFILE_URLS, PROFILE_INFO, PROFILE_SVGS}