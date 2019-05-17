import React from 'react';
import styled, {css} from 'styled-components';
import {UserHeading, UserSubHeading, UserContent} from '../../misc/fonts';
import {MarginContainer} from '../structure/containers';
import {useSpring, useSprings, animated} from 'react-spring';
import {Trail} from 'react-spring/renderprops';
import { LineChart, Line, CartesianGrid } from 'recharts';
import moment from 'moment';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';


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
    padding-bottom: 10px;

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

const ClassContainer = () => {

    const numberRise = useSpring({ config: {duration: 2500}, from: { val: 0 }, to: { val: 50 } });
    
    return (
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
                <Percentage percentage>{numberRise.val.interpolate(val => Math.floor(val))}</Percentage>
          </ClassWrapper>
        )}
      </Trail>
    );
}

const LifeTimeStatContainer = ({lifetimeStats, data}) => {
    return (
        <>
            {lifetimeStats.map((statistic, i) => (
                <ClassWrapper column key={i}>
                    <UserContent>{statistic.name}</UserContent>
                    <div>
                        <ClassInstance svg imageUrl={statistic.image}/>
                        <Percentage>{statistic.testData}</Percentage>
                    </div>
                </ClassWrapper>
            ))}
        </>
    ); 
};

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
`;

const OuterDivForReal = styled.div`
    flex-direction: row;
    display: flex;
    justify-content:space-between;
`;

const FlexStart = styled.div`
    display: flex;
    justify-content: flex-start;
`;

const ChartContainer = styled.div`
    height:300px;
    padding-top:30px;
    margin-left:-20px;

`

function getIntroOfPage(label) {
    if (label === 'Jan') {
      return `January`;
    } if (label === 'Feb') {
      return `Febuary`;
    } if (label === 'Mar') {
      return `March`;
    } if (label === 'Apr') {
      return `April`;
    } if (label === 'May') {
      return `May`;
    } if (label === 'Jun') {
      return `June`;
    }
  }
  
const ToolTipContainer = styled.div`
    background-color: white;
    padding:6px;
    font-size: 16px;
    min-width:75px;
    outline:2px dotted lightgrey;
    text-align: center;

    span{
        font-size: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    span:nth-child(3) {
        color: #EB008A;
    }
    span:nth-child(2) {
        color:#009EFF;
    }
`;
const SoldierGraph = styled.div`

`;

function CustomTooltip({ payload, label, active }) {
    if (active) {
      return (
        <ToolTipContainer>
             <p className="intro">{getIntroOfPage(label)}</p>
            <span>
                <ClassInstance icon imageUrl={TEMPUS_POINTS[1].image}/>
                {`${payload[1].value}`}
            </span>

            <span>
                <ClassInstance icon imageUrl={TEMPUS_POINTS[0].image}/>
                {`${payload[0].value}`}
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
            <CartesianGrid stroke="#ccc" />
            <Area type='monotone' dataKey='SoldierRank' stroke='#EB008A' fill='none' strokeWidth={3} />
            <Area type='monotone' dataKey='DemoRank' stroke='#009EFF' fill='none' strokeWidth={3} />
            {/* <ReferenceLine y={300} stroke='#aaaaaa' strokeDasharray='3 3' />
            <ReferenceLine y={1200} stroke='#aaaaaa' strokeDasharray='3 3' /> */}
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>
    );
};

const TempusContainer = ({tempusStats, data}) => {
    return (
        <div>
        <OuterDivForReal>
          {tempusStats.map((tempus, i) => (
                <TestOuterDiv>
                    <TestDiv>
                        <ClassInstance icon imageUrl={tempus.image}/>
                        <UserSubHeading>{tempus.name}</UserSubHeading>
                    </TestDiv>

                    <ClassWrapper column>
                        <UserContent>{tempus.shortName} rank</UserContent>
                        <FlexStart>
                            <ClassInstance tinysvg imageUrl={SVG_ICONS[3].image}/>
                            <Percentage rank>{tempus.rank}</Percentage>
                        </FlexStart>
                    </ClassWrapper>

                    <ClassWrapper column>
                        <UserContent>{tempus.shortName} points</UserContent>
                        <FlexStart>
                            <ClassInstance tinysvg imageUrl={SVG_ICONS[1].image}/>
                            <Percentage>{tempus.points}</Percentage>
                        </FlexStart>
                    </ClassWrapper>

                    <ClassWrapper column>
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
           </div>
    );
}

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

export { ClassContainer, LifeTimeStatContainer, RectangleContainer, TempusContainer, Chart, TEMPUS_POINTS, CLASS_STATS, SVG_ICONS}