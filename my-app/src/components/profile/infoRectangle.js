import CountUp from 'react-countup';
import React from 'react';
import styled, {css} from 'styled-components';
import {UserHeading, UserSubHeading, UserContent, UserLinks} from '../../misc/fonts';
import {MarginContainer} from '../structure/containers';
import {animated} from 'react-spring';
import {Trail} from 'react-spring/renderprops';
import moment from 'moment';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Sector, Cell } from 'recharts';

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
        testData: 85
    },
    {
        id: 2,
        name: 'flank scout',
        shortname: 'flank scout',
        image: scout,
        testData: 37
    },
    {
        id: 3,
        name: 'pocket soldier',
        shortname: 'pocket',
        image: pocketSoldier,
        testData: 83
    },
    {
        id: 4,
        name: 'roaming soldier',
        shortname: 'roamer',
        image: soldier,
        testData: 21
    },
    {
        id: 5,
        name: 'demoman',
        shortname: 'demo',
        image: demo,
        testData: 1
    },
    {
        id: 6,
        name: 'medic',
        shortname: 'medic',
        image: medic,
        testData: 100
    }
];

const SVG_ICONS = [
    {
        id: 1,
        name: 'lobbies played',
        description: 'fist raised',
        image: Fist,
        testData: '41'
    },
    {
        id: 2,
        name: 'total wins',
        description: 'trophy',
        image: Trophy,
        testData: '10'
    },
    {
        id: 3,
        name: 'hours played',
        description: 'clock',
        image: Clock,
        testData: '8973'
    },
    {
        id: 4,
        name: 'ETF2L div',
        description: 'medal',
        image: Medal,
        testData: '2'
    },
    {
        id: 5,
        name: 'disconnects',
        description: 'brokenarm',
        image: Injured,
        testData: '3'
    },
    {
        id: 6,
        name: 'sub count',
        description: 'carry',
        image: PeopleCarry,
        testData: '7'
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
    padding-top: 10px;
    flex-wrap: wrap;

    ${props => props.stat && css` 
        @media (max-width: 510px){
            width: 33%;
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
            width:100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-top:6px;
            padding-bottom:6px;

          
        }
    `};

    ${props => props.row && css`
        flex-direction: row;
        width: 100%;
    `}
`;

const Percentage = styled(animated.div)`
    min-width:40px;
    text-align: right;
    ${props => props.percentage && css`
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
`;

const FlexStart = styled.div`
    display: flex;
    justify-content: flex-start;
`;

const ChartContainer = styled.div`
    height:300px;
    padding-top:30px;
    margin-left:-20px;

    .recharts-wrapper{
        cursor: pointer !important;
        width: 100% !important;
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
    }
    p {
        font-size: 16px;
        font-weight: 600;
        padding-bottom: 10px;
    }
    
    span:nth-child(3) {
        color: #EB008A;
    }
    span:nth-child(2) {
        color:#009EFF;
    }
`;

const data = [{name: 'Group A', value: 400}, {name: 'Group B', value: 300},
                  {name: 'Group C', value: 300}, {name: 'Group D', value: 200}];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;                    
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x  = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy  + radius * Math.sin(-midAngle * RADIAN);
 
    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

class SimplePieChart extends React.Component {
	render () {
  	return (
    	<PieChart className='modify' width={400} height={400} onMouseEnter={this.onPieEnter}>
            <Pie
            data={data} 
            cx={300} 
            cy={200} 
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80} 
            fill="#8884d8"
            >
        	{
          	data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
          }
        </Pie>
      </PieChart>
    );
  }
}

const StatusContainer = styled.div`
    display: flex;
    flex-direction: column;
    letter-spacing:1.5px;
    padding-left:30px
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
`;

const FlexTesting = styled.div`
    width: 60%;
    display:flex;
    align-items: center;
`;

const FlexTestAgain = styled.div`
    display:flex;
    flex-direction: row;
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
            <ClassWrapper row>
                <FlexTesting>
                    <Avatar img={userData[0].avatar} target='_blank' href={'https://steamcommunity.com/profiles/' + userData[0].steamCommunityId} classname='avatar'/>
                    <StatusContainer classname='userActivity'>
                        <span>
                            {userData[0].steamName}
                        </span>
                        <span>
                            {
                                status[userData[0].status]
                            }
                        </span>
                    </StatusContainer>
                </FlexTesting>
                <FlexTestAgain>
                    {userIcons.map((icon, i) => ( 
                        <a target="_bank" href={icon.url + userData[0].steamCommunityId} >
                            <ClassInstance svg imageUrl={icon.image}/>
                        </a>
                    ))}
                </FlexTestAgain>
            </ClassWrapper>
            <ClassWrapper row>
                {userLinks.map((link, i) => ( 
                    <LinkTestContainer  target='_blank'  href={link.url + userData[0].steamCommunityId} key={i}>
                        <UserLinks>{link.name}</UserLinks>
                    </LinkTestContainer>
                ))}
            </ClassWrapper>
        </>
    ); 
};

const ClassContainerTest = () => {
    return (
        <>
            <Trail
                items={CLASS_STATS}
                keys={stat => stat.id}
                from={{ marginLeft: -20, opacity: 0}}
                to={{ marginLeft: 0, opacity: 1 }}
            >
            {stat => props => (
            <ClassWrapper style={props}>
                    <ClassInstance icon imageUrl={stat.image}/>
                    <UserContent>{stat.name}</UserContent>
                    <Percentage percentage> <CountUp useEasing={false} duration={3} start={0} end={stat.testData}/> </Percentage>
            </ClassWrapper>
            )}
        </Trail>
       </>
    );
}

const ClassContainer = ({classStats}) => {
    return (
        <>
          {classStats.map((stat, i) => (
            <ClassWrapper fill key={i}>
                    <ClassInstance icon imageUrl={stat.image}/>
                    <UserContent>{stat.name}</UserContent>
                    <Percentage percentage> <CountUp useEasing={false} duration={3} start={0} end={stat.testData}/> </Percentage>
            </ClassWrapper>
            ))}
       </>
    );
}

const LifeTimeStatContainer = ({lifetimeStats, data}) => {
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
            {/* <SimplePieChart/> */}
        </>
    ); 
};

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
                #{`${payload[1].value}`}
            </span>

            <span>
                <ClassInstance icon imageUrl={TEMPUS_POINTS[0].image}/>
                #{`${payload[0].value}`}
            </span>     
        </ToolTipContainer>
      );
    }
    return null;
}

const Chart = () => {
    const chartData = [
        { Time: moment('2019-01-01').format('MMM'), SoldierRank: 708, DemoRank: 1000},
        { Time: moment('2019-02-02').format('MMM'), SoldierRank: 705, DemoRank: 958},
        { Time: moment('2019-03-03').format('MMM'), SoldierRank: 677, DemoRank: 965},
        { Time: moment('2019-04-04').format('MMM'), SoldierRank: 658, DemoRank: 1210},
        { Time: moment('2019-05-05').format('MMM'), SoldierRank: 655, DemoRank: 987},
        { Time: moment('2019-06-06').format('MMM'), SoldierRank: 659, DemoRank: 800},
        // { Time: moment('2019-07-07').format('MMM'), SoldierRank: 650, DemoRank: 700},
        // { Time: moment('2019-08-08').format('MMM'), SoldierRank: 432, DemoRank: 657},
        // { Time: moment('2019-09-09').format('MMM'), SoldierRank: 470, DemoRank: 623},
        // { Time: moment('2019-10-10').format('MMM'), SoldierRank: 553, DemoRank: 588},
        // { Time: moment('2019-11-11').format('MMM'), SoldierRank: 500, DemoRank: 600},
        // { Time: moment('2019-12-12').format('MMM'), SoldierRank: 432, DemoRank: 676},

     ];
    return (
    <ChartContainer>
        <ResponsiveContainer>
          <AreaChart data={chartData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
            <XAxis dataKey='Time' tick={{ fontSize: 16 }} />
            <YAxis orientation='left' domain={[0, 'dataMax']} />
            <Tooltip  content={<CustomTooltip />}/>
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <Area type='monotone' dataKey='SoldierRank' stroke='#EB008A' fill='none' strokeWidth={3} />
            <Area type='monotone' dataKey='DemoRank' stroke='#009EFF' fill='none' strokeWidth={3} />
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>
    );
};

const InternalContainer = styled.div`
    width: 100%;
`;

const TempusContainer = ({tempusStats, data}) => {
    return (
        <InternalContainer>
            <OuterDivForReal>
            {tempusStats.map((tempus, i) => (
                    <TestOuterDiv>
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
            <Chart/>
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

export { ProfileContainer, ClassContainer, LifeTimeStatContainer, RectangleContainer, TempusContainer, Chart, TEMPUS_POINTS, CLASS_STATS, SVG_ICONS, PROFILE_URLS, PROFILE_INFO, PROFILE_SVGS}