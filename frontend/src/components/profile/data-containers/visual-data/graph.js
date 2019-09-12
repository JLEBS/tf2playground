import React from 'react';
import styled, {css} from 'styled-components';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid} from 'recharts';
import Colors from '../../../../misc/colors';
import { parse, format } from 'date-fns';

//Class imports
import soldier from '../../../../assets/imgs/icons/classes/soldier.png';
import demo from '../../../../assets/imgs/icons/classes/demo.png';

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
        {console.log('hello tooltip', payload, label, active)}

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

export default Graph;